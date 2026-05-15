"use client";

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
  localeIsRTL: boolean;
};

export function ServiceQuoteForm({
  title,
  subheading,
  fields,
  localeIsRTL,
}: ServiceQuoteFormProps) {
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
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.phone}</span>
          <input
            type="tel"
            name="phone"
            className="w-full rounded-md border border-outline-variant bg-[#fbf8ff] px-4 py-2.5 text-sm text-on-surface outline-none transition-colors focus:border-alfs-orange focus:ring-2 focus:ring-alfs-orange/20"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-alfs-navy">{fields.cargoDetails}</span>
          <textarea
            name="cargoDetails"
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
