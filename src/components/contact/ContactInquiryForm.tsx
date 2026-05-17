"use client";

import {useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

import {
  FieldError,
  FieldLabel,
  formInputClassName,
  FormLegend,
  SubmissionNotice,
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
    <div className={localeIsRTL ? "text-right" : "text-left"}>
      <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
        {heading}
      </h2>
      <p className="mt-4 max-w-[540px] text-[0.96rem] leading-7 text-on-surface-variant">
        {description}
      </p>

      <form
        id="inquiry-form"
        className="mt-8 space-y-4 rounded-[14px] border border-[#ebe8f3] bg-white p-6 shadow-[0_14px_30px_rgba(26,47,122,0.10)] sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormLegend
          requiredText={formCopy.legend.required}
          optionalText={formCopy.legend.optional}
          localeIsRTL={localeIsRTL}
        />

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

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <FieldLabel label={fields.name} required />
            <input type="text" {...register("name")} disabled={isSubmitting} className={formInputClassName} />
            <FieldError message={errors.name?.message} />
          </label>
          <label className="block">
            <FieldLabel label={fields.email} required />
            <input type="email" {...register("email")} disabled={isSubmitting} className={formInputClassName} />
            <FieldError message={errors.email?.message} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <FieldLabel label={fields.phone} optionalLabel={formCopy.optionalLabel} />
            <input type="tel" {...register("phone")} disabled={isSubmitting} className={formInputClassName} />
            <FieldError message={errors.phone?.message} />
          </label>
          <label className="block">
            <FieldLabel label={fields.subject} required />
            <select {...register("subject")} disabled={isSubmitting} className={formInputClassName}>
              <option value="">{fields.subjectPlaceholder}</option>
              <option value={fields.subjects.quote}>{fields.subjects.quote}</option>
              <option value={fields.subjects.tracking}>{fields.subjects.tracking}</option>
              <option value={fields.subjects.general}>{fields.subjects.general}</option>
            </select>
            <FieldError message={errors.subject?.message} />
          </label>
        </div>

        <label className="block">
          <FieldLabel label={fields.message} required />
          <textarea
            {...register("message")}
            rows={5}
            disabled={isSubmitting}
            className={`${formInputClassName} resize-y`}
          />
          <FieldError message={errors.message?.message} />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber disabled:cursor-not-allowed disabled:bg-alfs-orange/70 sm:w-auto"
        >
          {isSubmitting ? formCopy.status.sending : fields.submit}
        </button>
      </form>
    </div>
  );
}
