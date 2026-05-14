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
  const copyrightYear = new Date().getFullYear();
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

  const linkListClass =
    "space-y-2 text-[0.8125rem] leading-snug text-white/75 sm:text-sm sm:leading-normal";

  return (
    <footer id="contact" className="border-t-4 border-alfs-orange bg-alfs-deep-blue text-white">
      <div
        className={`mx-auto max-w-[1280px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 ${
          localeIsRTL ? "text-right" : "text-left"
        }`}
      >
        <div
          className="grid grid-cols-2 gap-x-6 gap-y-8 [grid-template-areas:'brand_brand'_'services_company'_'contact_contact'] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-10 lg:[grid-template-areas:'brand_services_company_contact']"
        >
          <div className="min-w-0 [grid-area:brand] space-y-3.5 lg:space-y-4">
            <div className="inline-flex rounded-md bg-white px-2 py-2">
              <PublicLogo />
            </div>
            <p className="w-full min-w-0 text-sm leading-relaxed text-white/76 sm:leading-7">
              {t("description")}
            </p>
          </div>

          <div className="min-w-0 [grid-area:services]">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 sm:mb-3.5 sm:text-xs sm:tracking-[0.12em]">
              {t("services.title")}
            </h3>
            <ul className={linkListClass}>
              {serviceKeys.map((key) => (
                <li key={key}>
                  <PageTransitionLink
                    href={serviceLinks[key]}
                    className="block py-0.5 transition-colors hover:text-alfs-orange"
                  >
                    {t(`services.links.${key}`)}
                  </PageTransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 [grid-area:company]">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 sm:mb-3.5 sm:text-xs sm:tracking-[0.12em]">
              {t("company.title")}
            </h3>
            <ul className={linkListClass}>
              {companyKeys.map((key) => (
                <li key={key}>
                  <PageTransitionLink
                    href={companyLinks[key]}
                    className="block py-0.5 transition-colors hover:text-alfs-orange"
                  >
                    {t(`company.links.${key}`)}
                  </PageTransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 [grid-area:contact] rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/55 sm:mb-3.5 sm:text-xs sm:tracking-[0.12em]">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3 text-[0.8125rem] leading-snug text-white/76 sm:space-y-3.5 sm:text-sm sm:leading-normal">
              {locationKeys.map((key) => (
                <li key={key} className="flex gap-2.5 sm:gap-3">
                  <PublicIcon
                    name="location"
                    className="mt-0.5 h-4 w-4 shrink-0 text-alfs-orange sm:h-[18px] sm:w-[18px]"
                  />
                  <span className="min-w-0 whitespace-pre-line">{t(`contact.locations.${key}`)}</span>
                </li>
              ))}
              {contactKeys.map((key) => (
                <li key={key} className="flex items-center gap-2.5 sm:gap-3">
                  <PublicIcon
                    name={key === "email" ? "mail" : "phone"}
                    className="h-4 w-4 shrink-0 text-alfs-orange sm:h-[18px] sm:w-[18px]"
                  />
                  <span className="min-w-0 break-words">{t(`contact.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-5 py-4 text-center text-xs text-white/50 sm:px-6 sm:text-sm lg:px-8">
          {t("copyright", {year: copyrightYear})}
        </div>
      </div>
    </footer>
  );
}
