"use client";

import {useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {useForm} from "react-hook-form";

import {
  Field,
  fieldProps,
  FormCard,
  formInputClassName,
  FormLegend,
  SubmissionNotice,
  SubmitButton,
} from "@/components/forms/FormPrimitives";
import type {Locale} from "@/i18n/routing";
import {
  createContactInquirySchema,
  type ContactInquiryInputValues,
  type ContactInquiryValues,
  type ContactFormCopy,
} from "@/lib/forms/contact-submissions";

type ContactInquiryFormProps = {
  heading: string;
  description: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    subjectPlaceholder: string;
    subjects: {
      quote: string;
      tracking: string;
      general: string;
    };
    message: string;
    submit: string;
  };
  formCopy: ContactFormCopy["form"] & {
    legend: {
      required: string;
      optional: string;
    };
    status: {
      sending: string;
    };
    feedback: {
      successTitle: string;
      errorTitle: string;
      errorDescription: string;
    };
  };
  locale: Locale;
  localeIsRTL: boolean;
};

type SubmissionState =
  | {tone: "success"; message: string}
  | {tone: "error"; message: string}
  | null;

export function ContactInquiryForm({
  heading,
  description,
  fields,
  formCopy,
  locale,
  localeIsRTL,
}: ContactInquiryFormProps) {
  const schema = createContactInquirySchema({
    form: formCopy,
    fields: {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
      subject: fields.subject,
    },
  });
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);
  const commonT = useTranslations("Common.forms");
  const isSuccess = submissionState?.tone === "success";
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<ContactInquiryInputValues, unknown, ContactInquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: "contact",
      locale,
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactInquiryValues) {
    setSubmissionState(null);

    const formData = new FormData();
    formData.append("formType", values.formType);
    formData.append("locale", values.locale);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone ?? "");
    formData.append("subject", values.subject);
    formData.append("message", values.message);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const result = (await response.json()) as {
      success: boolean;
      message: string;
      fieldErrors?: Record<string, string>;
    };

    if (!response.ok || !result.success) {
      Object.entries(result.fieldErrors ?? {}).forEach(([field, message]) => {
        setError(field as keyof ContactInquiryInputValues, {type: "server", message});
      });

      setSubmissionState({
        tone: "error",
        message: result.message || formCopy.feedback.errorDescription,
      });
      return;
    }

    setSubmissionState({
      tone: "success",
      message: result.message,
    });
    reset({
      formType: "contact",
      locale,
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div>
      <h2 className="t-h2 text-navy-900">{heading}</h2>
      <p className="t-lead mt-4 max-w-xl text-ink-soft">{description}</p>

      <FormCard className="mt-8">
        <form id="inquiry-form" className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          {submissionState ? (
            <SubmissionNotice
              tone={submissionState.tone}
              title={
                submissionState.tone === "success"
                  ? formCopy.feedback.successTitle
                  : formCopy.feedback.errorTitle
              }
              description={submissionState.message}
            />
          ) : null}

        {isSuccess ? (
          <button type="button" className="btn btn-secondary" onClick={() => setSubmissionState(null)}>
            {commonT("sendAnother")}
          </button>
        ) : null}

        <div className={isSuccess ? "hidden" : "space-y-5"}>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="inquiry-name" label={fields.name} required error={errors.name?.message}>
              <input
                type="text"
                autoComplete="name"
                {...register("name")}
                {...fieldProps("inquiry-name", errors.name?.message)}
                disabled={isSubmitting}
                className={formInputClassName}
              />
            </Field>
            <Field id="inquiry-email" label={fields.email} required error={errors.email?.message}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                {...register("email")}
                {...fieldProps("inquiry-email", errors.email?.message)}
                disabled={isSubmitting}
                className={`${formInputClassName} rtl:text-end`}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="inquiry-phone"
              label={fields.phone}
              optionalLabel={formCopy.optionalLabel}
              error={errors.phone?.message}
            >
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                {...register("phone")}
                {...fieldProps("inquiry-phone", errors.phone?.message)}
                disabled={isSubmitting}
                className={`${formInputClassName} rtl:text-end`}
              />
            </Field>
            <Field id="inquiry-subject" label={fields.subject} required error={errors.subject?.message}>
              <select
                {...register("subject")}
                {...fieldProps("inquiry-subject", errors.subject?.message)}
                disabled={isSubmitting}
                className={formInputClassName}
              >
                <option value="">{fields.subjectPlaceholder}</option>
                <option value={fields.subjects.quote}>{fields.subjects.quote}</option>
                <option value={fields.subjects.tracking}>{fields.subjects.tracking}</option>
                <option value={fields.subjects.general}>{fields.subjects.general}</option>
              </select>
            </Field>
          </div>

          <Field id="inquiry-message" label={fields.message} required error={errors.message?.message}>
            <textarea
              {...register("message")}
              {...fieldProps("inquiry-message", errors.message?.message)}
              rows={5}
              disabled={isSubmitting}
              className={formInputClassName}
            />
          </Field>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
            <SubmitButton pending={isSubmitting} pendingLabel={formCopy.status.sending}>
              {fields.submit}
            </SubmitButton>
            <FormLegend requiredText={formCopy.legend.required} />
          </div>
        </div>
      </form>
      </FormCard>
    </div>
  );
}
