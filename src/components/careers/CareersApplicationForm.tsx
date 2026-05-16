"use client";

import {useState, type FormEvent} from "react";

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
    successTitle: string;
    successDescription: string;
  };
  localeIsRTL: boolean;
};

const inputClassName =
  "w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20";

export function CareersApplicationForm({
  heading,
  description,
  fields,
  localeIsRTL,
}: CareersApplicationFormProps) {
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={`rounded-[14px] border border-[#ebe8f3] bg-white p-8 shadow-[0_14px_30px_rgba(26,47,122,0.10)] sm:p-10 ${
          localeIsRTL ? "text-right" : "text-left"
        }`}
      >
        <h2 className="text-[1.65rem] font-bold tracking-[-0.03em] text-alfs-navy">{fields.successTitle}</h2>
        <p className="mt-3 max-w-[520px] text-[0.96rem] leading-7 text-on-surface-variant">
          {fields.successDescription}
        </p>
      </div>
    );
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
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.name}</span>
            <input type="text" name="name" required className={inputClassName} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.email}</span>
            <input type="email" name="email" required className={inputClassName} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.phone}</span>
            <input type="tel" name="phone" required className={inputClassName} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.position}</span>
            <input type="text" name="position" required className={inputClassName} />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.experience}</span>
            <select name="experience" required defaultValue="" className={inputClassName}>
              <option value="" disabled>
                {fields.experiencePlaceholder}
              </option>
              <option value="entry">{fields.experienceLevels.entry}</option>
              <option value="1-3">{fields.experienceLevels.oneToThree}</option>
              <option value="3-5">{fields.experienceLevels.threeToFive}</option>
              <option value="5+">{fields.experienceLevels.fivePlus}</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.linkedin}</span>
            <input
              type="url"
              name="linkedin"
              placeholder={fields.linkedinPlaceholder}
              className={inputClassName}
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.message}</span>
          <textarea name="message" rows={5} required className={`${inputClassName} resize-y`} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.cv}</span>
          <div
            className="relative flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-outline-variant bg-[#fbf8ff] px-4 py-6 text-center transition-colors hover:border-alfs-orange/60 focus-within:border-alfs-orange focus-within:ring-2 focus-within:ring-alfs-orange/20"
          >
            <input
              type="file"
              name="cv"
              required
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setCvFileName(file?.name ?? null);
              }}
            />
            <span className="text-sm font-semibold text-alfs-navy">{fields.cvChoose}</span>
            <span className="text-xs text-on-surface-variant">{fields.cvHint}</span>
            {cvFileName ? (
              <span className="mt-1 max-w-full truncate text-xs font-medium text-alfs-orange">{cvFileName}</span>
            ) : null}
          </div>
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber sm:w-auto"
        >
          {fields.submit}
        </button>
      </form>
    </div>
  );
}
