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
  createServiceQuoteSchema,
  type ServiceQuoteFormCopy,
  type ServiceQuoteInputValues,
  type ServiceQuoteValues,
} from "@/lib/forms/contact-submissions";

type ServiceQuoteFormProps = {
  title: string;
  subheading: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    cargoDetails: string;
    submit: string;
  };
  formCopy: ServiceQuoteFormCopy["form"] & {
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

export function ServiceQuoteForm({
  title,
  subheading,
  fields,
  formCopy,
  locale,
  localeIsRTL,
}: ServiceQuoteFormProps) {
  const schema = createServiceQuoteSchema({
    form: formCopy,
    fields: {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      cargoDetails: fields.cargoDetails,
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
  } = useForm<ServiceQuoteInputValues, unknown, ServiceQuoteValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: "service-quote",
      locale,
      name: "",
      email: "",
      phone: "",
      cargoDetails: "",
    },
  });

  async function onSubmit(values: ServiceQuoteValues) {
    setSubmissionState(null);

    const formData = new FormData();
    formData.append("formType", values.formType);
    formData.append("locale", values.locale);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone ?? "");
    formData.append("cargoDetails", values.cargoDetails);

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
        setError(field as keyof ServiceQuoteInputValues, {type: "server", message});
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
      formType: "service-quote",
      locale,
      name: "",
      email: "",
      phone: "",
      cargoDetails: "",
    });
  }

  return (
    <FormCard>
      <h2 className="t-h3 text-navy-900">{title}</h2>
      <p className="mt-2 text-ui leading-relaxed text-ink-soft">{subheading}</p>

      <form id="quote-form" className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
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

        <Field id="quote-name" label={fields.name} required error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            {...fieldProps("quote-name", errors.name?.message)}
            disabled={isSubmitting}
            className={formInputClassName}
          />
        </Field>
        <Field id="quote-email" label={fields.email} required error={errors.email?.message}>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            {...register("email")}
            {...fieldProps("quote-email", errors.email?.message)}
            disabled={isSubmitting}
            className={`${formInputClassName} rtl:text-end`}
          />
        </Field>
        <Field id="quote-phone" label={fields.phone} optionalLabel={formCopy.optionalLabel} error={errors.phone?.message}>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            {...register("phone")}
            {...fieldProps("quote-phone", errors.phone?.message)}
            disabled={isSubmitting}
            className={`${formInputClassName} rtl:text-end`}
          />
        </Field>
        <Field id="quote-cargo" label={fields.cargoDetails} required error={errors.cargoDetails?.message}>
          <textarea
            {...register("cargoDetails")}
            {...fieldProps("quote-cargo", errors.cargoDetails?.message)}
            rows={4}
            disabled={isSubmitting}
            className={formInputClassName}
          />
        </Field>

        <div className="flex flex-col gap-3 pt-1">
          <SubmitButton pending={isSubmitting} pendingLabel={formCopy.status.sending}>
            {fields.submit}
          </SubmitButton>
          <FormLegend requiredText={formCopy.legend.required} />
        </div>
      </div>
      </form>
    </FormCard>
  );
}
