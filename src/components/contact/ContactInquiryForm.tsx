"use client";

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
  localeIsRTL: boolean;
};

export function ContactInquiryForm({
  heading,
  description,
  fields,
  localeIsRTL,
}: ContactInquiryFormProps) {
  return (
    <ContactInquiryFormBody
      heading={heading}
      description={description}
      fields={fields}
      localeIsRTL={localeIsRTL}
    />
  );
}

function ContactInquiryFormBody({
  heading,
  description,
  fields,
  localeIsRTL,
}: ContactInquiryFormProps) {
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
        action="#"
        method="get"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.name}</span>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.email}</span>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.phone}</span>
            <input
              type="tel"
              name="phone"
              className="w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.subject}</span>
            <select
              name="subject"
              required
              defaultValue=""
              className="w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
            >
              <option value="" disabled>
                {fields.subjectPlaceholder}
              </option>
              <option value="quote">{fields.subjects.quote}</option>
              <option value="tracking">{fields.subjects.tracking}</option>
              <option value="general">{fields.subjects.general}</option>
            </select>
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.message}</span>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full resize-y rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
          />
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
