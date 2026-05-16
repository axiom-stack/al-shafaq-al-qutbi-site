import {useTranslations} from "next-intl";

export function PublicMap() {
  const t = useTranslations("Common.map");

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-alfs-navy">
            {t("title")}
          </h2>
          <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
        </div>
        
        <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border border-outline-variant/30 shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=31.956148147583008,35.860877990722656&z=17&hl=en&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("title")}
            className="grayscale-[0.2] contrast-[1.1]"
          />
        </div>
      </div>
    </section>
  );
}
