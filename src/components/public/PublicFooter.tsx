import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

import {isRTL, type Locale} from "@/i18n/routing";

import {PageTransitionLink} from "./PageTransitionLink";
import {PublicIcon} from "./PublicIcon";
import {PublicLogo} from "./PublicLogo";

const serviceKeys = ["landFreight", "seaFreight", "airFreight", "warehousing"] as const;
const companyKeys = ["aboutUs", "ourNetwork", "careers", "contactUs"] as const;

export function PublicFooter() {
  const t = useTranslations("HomePage.footer");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);
  const locationKeys = ["amman", "hebron"] as const;
  const contactKeys = ["email", "phone"] as const;

  const serviceLinks: Record<(typeof serviceKeys)[number], string> = {
    landFreight: "/#services",
    seaFreight: "/#services",
    airFreight: "/#services",
    warehousing: "/#services",
  };

  const companyLinks: Record<(typeof companyKeys)[number], string> = {
    aboutUs: "/about",
    ourNetwork: "/#coverage",
    careers: "/#whyAlfs",
    contactUs: "/#contact",
  };

  return (
    <footer id="contact" className="border-t-4 border-alfs-orange bg-alfs-deep-blue text-white">
      <div className={`mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8 ${localeIsRTL ? "text-right" : "text-left"}`}>
        <div className="space-y-4">
          <div className="inline-flex rounded-md bg-white px-2 py-2">
            <PublicLogo />
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/78">{t("description")}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">{t("services.title")}</h3>
          <ul className="space-y-2.5 text-sm text-white/76">
            {serviceKeys.map((key) => (
              <li key={key}>
                <PageTransitionLink
                  href={serviceLinks[key]}
                  className="transition-colors hover:text-alfs-orange"
                >
                  {t(`services.links.${key}`)}
                </PageTransitionLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">{t("company.title")}</h3>
          <ul className="space-y-2.5 text-sm text-white/76">
            {companyKeys.map((key) => (
              <li key={key}>
                <PageTransitionLink
                  href={companyLinks[key]}
                  className="transition-colors hover:text-alfs-orange"
                >
                  {t(`company.links.${key}`)}
                </PageTransitionLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">{t("contact.title")}</h3>
          <ul className="space-y-4 text-sm text-white/76">
            {locationKeys.map((key) => (
              <li key={key} className="flex items-start gap-3">
                <PublicIcon
                  name="location"
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 text-alfs-orange"
                />
                <span className="whitespace-pre-line">{t(`contact.locations.${key}`)}</span>
              </li>
            ))}
            {contactKeys.map((key) => (
              <li key={key} className="flex items-center gap-3">
                <PublicIcon
                  name={key === "email" ? "mail" : "phone"}
                  className="h-[18px] w-[18px] shrink-0 text-alfs-orange"
                />
                <span>{t(`contact.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 py-4 text-sm text-white/55 sm:px-6 lg:px-8">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
