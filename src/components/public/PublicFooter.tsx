import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

import type {Locale} from "@/i18n/routing";

import {PublicIcon} from "./PublicIcon";
import {PublicLogo} from "./PublicLogo";

const serviceKeys = ["landFreight", "seaFreight", "airFreight", "warehousing"] as const;
const companyKeys = ["aboutUs", "ourNetwork", "careers", "contactUs"] as const;

export function PublicFooter() {
  const t = useTranslations("HomePage.footer");
  const locale = useLocale() as Locale;
  const homePath = `/${locale}`;

  const serviceLinks: Record<(typeof serviceKeys)[number], string> = {
    landFreight: `${homePath}#services`,
    seaFreight: `${homePath}#services`,
    airFreight: `${homePath}#services`,
    warehousing: `${homePath}#services`,
  };

  const companyLinks: Record<(typeof companyKeys)[number], string> = {
    aboutUs: `/${locale}/about`,
    ourNetwork: `${homePath}#coverage`,
    careers: `${homePath}#whyAlfs`,
    contactUs: `${homePath}#contact`,
  };

  return (
    <footer id="contact" className="border-t-4 border-alfs-orange bg-alfs-deep-blue text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
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
                <a href={serviceLinks[key]} className="transition-colors hover:text-alfs-orange">
                  {t(`services.links.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">{t("company.title")}</h3>
          <ul className="space-y-2.5 text-sm text-white/76">
            {companyKeys.map((key) => (
              <li key={key}>
                <a href={companyLinks[key]} className="transition-colors hover:text-alfs-orange">
                  {t(`company.links.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold">{t("contact.title")}</h3>
          <ul className="space-y-4 text-sm text-white/76">
            <li className="flex items-start gap-3">
              <PublicIcon name="location" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-alfs-orange" />
              <span className="whitespace-pre-line">{t("contact.address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <PublicIcon name="mail" className="h-[18px] w-[18px] shrink-0 text-alfs-orange" />
              <span>{t("contact.email")}</span>
            </li>
            <li className="flex items-center gap-3">
              <PublicIcon name="phone" className="h-[18px] w-[18px] shrink-0 text-alfs-orange" />
              <span>{t("contact.phone")}</span>
            </li>
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
