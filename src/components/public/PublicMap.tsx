import {useTranslations} from "next-intl";

import {PublicIcon} from "./PublicIcon";

const OFFICE_COORDS = "31.956148147583008,35.860877990722656";

/** Office address and hours beside the map. Contact numbers are not repeated here. */
export function PublicMap({tone = "surface"}: {tone?: "surface" | "paper"}) {
  const t = useTranslations("Common");
  const footerT = useTranslations("HomePage.footer.contact");
  const contactT = useTranslations("ContactPage");

  return (
    <section className={`${tone === "surface" ? "bg-surface" : "bg-paper"} section-y`} aria-labelledby="location-title">
      <div className="shell grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
        <div>
          <h2 id="location-title" className="t-h2 text-navy-900">
            {t("map.title")}
          </h2>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            <li className="flex gap-4 py-5">
              <PublicIcon name="location" className="mt-1 h-5 w-5 shrink-0 text-navy-800" />
              <div>
                <h3 className="text-item font-semibold text-navy-900">{contactT("offices.locations.amman.title")}</h3>
                <p className="mt-1 whitespace-pre-line text-base leading-relaxed text-ink-soft">
                  {footerT("locations.amman")}
                </p>
              </div>
            </li>
            <li className="flex gap-4 py-5">
              <PublicIcon name="clock" className="mt-1 h-5 w-5 shrink-0 text-navy-800" />
              <div>
                <h3 className="text-item font-semibold text-navy-900">{contactT("hours.title")}</h3>
                <p className="mt-1 whitespace-pre-line text-base leading-relaxed text-ink-soft">
                  {contactT("hours.value")}
                </p>
              </div>
            </li>
          </ul>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE_COORDS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-8 w-full sm:w-auto"
          >
            <PublicIcon name="route" className="h-4 w-4" />
            {t("contact.directions")}
          </a>
        </div>

        <div className="relative min-h-[18rem] overflow-hidden rounded-media border border-line bg-sunken lg:min-h-[24rem]">
          <iframe
            src={`https://maps.google.com/maps?q=${OFFICE_COORDS}&z=16&hl=en&output=embed`}
            title={t("map.title")}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
