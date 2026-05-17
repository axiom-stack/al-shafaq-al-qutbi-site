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
    <div className="mx-auto max-w-[720px] text-start">
      <h2 className="text-center text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[580px] text-center text-[0.96rem] leading-7 text-on-surface-variant">
        {subheading}
      </p>

      <form
        id="quote-form"
        className="mt-10 space-y-4 rounded-[14px] border border-[#ebe8f3] bg-white p-6 shadow-[0_14px_30px_rgba(26,47,122,0.10)] sm:p-8"
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
        <label className="block">
          <FieldLabel label={fields.phone} optionalLabel={formCopy.optionalLabel} />
          <input type="tel" {...register("phone")} disabled={isSubmitting} className={formInputClassName} />
          <FieldError message={errors.phone?.message} />
        </label>
        <label className="block">
          <FieldLabel label={fields.cargoDetails} required />
          <textarea
            {...register("cargoDetails")}
            rows={5}
            disabled={isSubmitting}
            className={`${formInputClassName} resize-y`}
          />
          <FieldError message={errors.cargoDetails?.message} />
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
