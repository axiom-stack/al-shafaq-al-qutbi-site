"use client";

import {useState} from "react";

import {zodResolver} from "@hookform/resolvers/zod";
import {useTranslations} from "next-intl";
import {Controller, useForm} from "react-hook-form";

import {
  Field,
  fieldProps,
  FormCard,
  formInputClassName,
  FormLegend,
  SubmissionNotice,
  SubmitButton,
} from "@/components/forms/FormPrimitives";
import {PublicIcon} from "@/components/public/PublicIcon";
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
  const commonT = useTranslations("Common.forms");
  const isSuccess = submissionState?.tone === "success";
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
    <div>
      <h2 className="t-h2 text-navy-900">{heading}</h2>
      <p className="t-lead mt-4 max-w-xl text-ink-soft">{description}</p>

      <FormCard className="mt-8">
        <form
          id="application-form"
          className="space-y-5"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
            <Field id="career-name" label={fields.name} required error={errors.name?.message}>
              <input
                type="text"
                autoComplete="name"
                {...register("name")}
                {...fieldProps("career-name", errors.name?.message)}
                disabled={isSubmitting}
                className={formInputClassName}
              />
            </Field>
            <Field id="career-email" label={fields.email} required error={errors.email?.message}>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                dir="ltr"
                {...register("email")}
                {...fieldProps("career-email", errors.email?.message)}
                disabled={isSubmitting}
                className={`${formInputClassName} rtl:text-end`}
              />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="career-phone" label={fields.phone} required error={errors.phone?.message}>
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                {...register("phone")}
                {...fieldProps("career-phone", errors.phone?.message)}
                disabled={isSubmitting}
                className={`${formInputClassName} rtl:text-end`}
              />
            </Field>
            <Field id="career-position" label={fields.position} required error={errors.position?.message}>
              <input
                type="text"
                autoComplete="organization-title"
                {...register("position")}
                {...fieldProps("career-position", errors.position?.message)}
                disabled={isSubmitting}
                className={formInputClassName}
              />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="career-experience" label={fields.experience} required error={errors.experience?.message}>
              <select
                {...register("experience")}
                {...fieldProps("career-experience", errors.experience?.message)}
                disabled={isSubmitting}
                className={formInputClassName}
              >
                <option value="">{fields.experiencePlaceholder}</option>
                <option value={fields.experienceLevels.entry}>{fields.experienceLevels.entry}</option>
                <option value={fields.experienceLevels.oneToThree}>{fields.experienceLevels.oneToThree}</option>
                <option value={fields.experienceLevels.threeToFive}>{fields.experienceLevels.threeToFive}</option>
                <option value={fields.experienceLevels.fivePlus}>{fields.experienceLevels.fivePlus}</option>
              </select>
            </Field>
            <Field
              id="career-linkedin"
              label={fields.linkedin}
              optionalLabel={formCopy.optionalLabel}
              error={errors.linkedin?.message}
            >
              <input
                type="url"
                inputMode="url"
                autoComplete="url"
                dir="ltr"
                {...register("linkedin")}
                {...fieldProps("career-linkedin", errors.linkedin?.message)}
                placeholder={fields.linkedinPlaceholder}
                disabled={isSubmitting}
                className={`${formInputClassName} rtl:text-end`}
              />
            </Field>
          </div>
          <Field id="career-message" label={fields.message} required error={errors.message?.message}>
            <textarea
              {...register("message")}
              {...fieldProps("career-message", errors.message?.message)}
              rows={5}
              disabled={isSubmitting}
              className={formInputClassName}
            />
          </Field>
          <Field id="career-cv" label={fields.cv} required error={errors.cv?.message}>
            <div
              className={`relative flex min-h-[7.5rem] flex-col items-center justify-center gap-1.5 rounded-control border border-dashed px-4 py-6 text-center transition-colors focus-within:border-navy-700 focus-within:ring-[3px] focus-within:ring-navy-700/20 hover:border-navy-800 hover:bg-navy-50 ${
                errors.cv ? "border-danger bg-danger-bg/40" : cvFileName ? "border-navy-800 bg-navy-50" : "border-line-strong bg-paper"
              }`}
            >
              <Controller
                name="cv"
                control={control}
                render={({field}) => (
                  <input
                    type="file"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    {...fieldProps("career-cv", errors.cv?.message, "career-cv-hint")}
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
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                )}
              />
              <PublicIcon name={cvFileName ? "file" : "upload"} className="h-6 w-6 text-navy-800" />
              {cvFileName ? (
                <span className="max-w-full truncate font-semibold text-navy-900" dir="auto">
                  {cvFileName}
                </span>
              ) : (
                <span className="font-semibold text-navy-900">{fields.cvChoose}</span>
              )}
              <span id="career-cv-hint" className="text-sm text-ink-faint">
                {fields.cvHint}
              </span>
            </div>
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
