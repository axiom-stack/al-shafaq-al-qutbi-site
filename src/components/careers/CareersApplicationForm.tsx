"use client";

import {useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";

import {
  FieldError,
  FieldLabel,
  formInputClassName,
  FormLegend,
  SubmissionNotice,
} from "@/components/forms/FormPrimitives";
import type {Locale} from "@/i18n/routing";
import {
  careersCvMaxBytes,
  createCareersApplicationSchema,
  type CareersApplicationInputValues,
  type CareersApplicationValues,
  type CareersFormCopy,
} from "@/lib/forms/contact-submissions";

type CareersApplicationFormProps = {
  heading: string;
  description: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    position: string;
    experience: string;
    experiencePlaceholder: string;
    experienceLevels: {
      entry: string;
      oneToThree: string;
      threeToFive: string;
      fivePlus: string;
    };
    linkedin: string;
    linkedinPlaceholder: string;
    message: string;
    cv: string;
    cvHint: string;
    cvChoose: string;
    submit: string;
  };
  formCopy: CareersFormCopy["form"] & {
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

export function CareersApplicationForm({
  heading,
  description,
  fields,
  formCopy,
  locale,
  localeIsRTL,
}: CareersApplicationFormProps) {
  const schema = createCareersApplicationSchema({
    form: formCopy,
    fields: {
      name: fields.name,
      email: fields.email,
      phone: fields.phone,
      message: fields.message,
      position: fields.position,
      experience: fields.experience,
      linkedin: fields.linkedin,
      cv: fields.cv,
    },
  });
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [submissionState, setSubmissionState] = useState<SubmissionState>(null);
  const {
    register,
    control,
    handleSubmit,
    reset,
    resetField,
    clearErrors,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<CareersApplicationInputValues, unknown, CareersApplicationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      formType: "careers",
      locale,
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linkedin: "",
      message: "",
    },
  });

  async function onSubmit(values: CareersApplicationValues) {
    setSubmissionState(null);

    const formData = new FormData();
    formData.append("formType", values.formType);
    formData.append("locale", values.locale);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("position", values.position);
    formData.append("experience", values.experience);
    formData.append("linkedin", values.linkedin ?? "");
    formData.append("message", values.message);
    formData.append("cv", values.cv);

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
        setError(field as keyof CareersApplicationInputValues, {type: "server", message});
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
    setCvFileName(null);
    reset({
      formType: "careers",
      locale,
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linkedin: "",
      message: "",
    });
  }

  return (
    <div className={localeIsRTL ? "text-right" : "text-left"}>
      <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
        {heading}
      </h2>
      <p className="mt-4 max-w-[540px] text-[0.96rem] leading-7 text-on-surface-variant">{description}</p>

      <form
        id="application-form"
        className="mt-8 space-y-4 rounded-[14px] border border-[#ebe8f3] bg-white p-6 shadow-[0_14px_30px_rgba(26,47,122,0.10)] sm:p-8"
        encType="multipart/form-data"
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
            <FieldLabel label={fields.phone} required />
            <input type="tel" {...register("phone")} disabled={isSubmitting} className={formInputClassName} />
            <FieldError message={errors.phone?.message} />
          </label>
          <label className="block">
            <FieldLabel label={fields.position} required />
            <input type="text" {...register("position")} disabled={isSubmitting} className={formInputClassName} />
            <FieldError message={errors.position?.message} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <FieldLabel label={fields.experience} required />
            <select {...register("experience")} disabled={isSubmitting} className={formInputClassName}>
              <option value="">{fields.experiencePlaceholder}</option>
              <option value={fields.experienceLevels.entry}>{fields.experienceLevels.entry}</option>
              <option value={fields.experienceLevels.oneToThree}>{fields.experienceLevels.oneToThree}</option>
              <option value={fields.experienceLevels.threeToFive}>{fields.experienceLevels.threeToFive}</option>
              <option value={fields.experienceLevels.fivePlus}>{fields.experienceLevels.fivePlus}</option>
            </select>
            <FieldError message={errors.experience?.message} />
          </label>
          <label className="block">
            <FieldLabel label={fields.linkedin} optionalLabel={formCopy.optionalLabel} />
            <input
              type="url"
              {...register("linkedin")}
              placeholder={fields.linkedinPlaceholder}
              disabled={isSubmitting}
              className={formInputClassName}
            />
            <FieldError message={errors.linkedin?.message} />
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
        <label className="block">
          <FieldLabel label={fields.cv} required />
          <div className="relative flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-outline-variant bg-[#fbf8ff] px-4 py-6 text-center transition-colors hover:border-alfs-orange/60 focus-within:border-alfs-orange focus-within:ring-2 focus-within:ring-alfs-orange/20">
            <Controller
              name="cv"
              control={control}
              render={({field}) => (
                <input
                  type="file"
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={(event) => {
                    const file = event.target.files?.[0];

                    if (!file) {
                      setCvFileName(null);
                      resetField("cv");
                      return;
                    }

                    if (file.size > careersCvMaxBytes) {
                      setCvFileName(null);
                      event.target.value = "";
                      resetField("cv");
                      setError("cv", {
                        type: "validate",
                        message: formCopy.validation.fileSize,
                      });
                      return;
                    }

                    setCvFileName(file.name);
                    clearErrors("cv");
                    field.onChange(file);
                  }}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  disabled={isSubmitting}
                  className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                />
              )}
            />
            <span className="text-sm font-semibold text-alfs-navy">{fields.cvChoose}</span>
            <span className="text-xs text-on-surface-variant">{fields.cvHint}</span>
            {cvFileName ? (
              <span className="mt-1 max-w-full truncate text-xs font-medium text-alfs-orange">{cvFileName}</span>
            ) : null}
          </div>
          <FieldError message={errors.cv?.message} />
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
