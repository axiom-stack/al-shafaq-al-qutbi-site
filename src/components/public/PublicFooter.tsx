import {useTranslations} from "next-intl";
import Image from "next/image";

import {formatPhoneLabel, parsePhoneNumbers, serviceRoutes, siteRoutes, whatsAppHref} from "@/lib/site-routes";

import {PageTransitionLink} from "./PageTransitionLink";
import {PublicIcon} from "./PublicIcon";

const serviceKeys = [
  "seaFreight",
  "landFreight",
  "airFreight",
  "consolidation",
  "warehousing",
  "customsClearance",
] as const;
const companyKeys = ["aboutUs", "ourNetwork", "careers", "contactUs"] as const;

const companyLinks: Record<(typeof companyKeys)[number], string> = {
  aboutUs: "/about",
  ourNetwork: siteRoutes.coverage,
  careers: siteRoutes.careers,
  contactUs: "/contact",
};

const headingClass = "t-label text-on-dark-faint";
const linkClass =
  "inline-flex min-h-10 items-center text-base text-on-dark-soft transition-colors hover:text-white";

export function PublicFooter() {
  const t = useTranslations("HomePage.footer");
  const brandT = useTranslations("HomePage.brand");
  const commonT = useTranslations("Common");
  const navT = useTranslations("HomePage.navbar");
  const copyrightYear = new Date().getFullYear();

  const email = t("contact.email");
  const phone = t("contact.phone");
  const phoneNumbers = parsePhoneNumbers(phone);

  return (
    <footer id="contact" className="on-dark border-t border-white/12 bg-navy-900 text-on-dark-soft">
      <div className="shell py-12 lg:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1.35fr] lg:gap-x-8">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/images/ALFS_LOGO_WHITE.png"
              alt={brandT("name")}
              width={1024}
              height={307}
              sizes="200px"
              className="h-auto w-[11.5rem]"
            />
            <p className="t-body mt-6 max-w-sm text-on-dark-soft">{t("description")}</p>
          </div>

          <nav aria-label={t("services.title")}>
            <h2 className={headingClass}>{t("services.title")}</h2>
            <ul className="mt-4">
              {serviceKeys.map((key) => (
                <li key={key}>
                  <PageTransitionLink href={serviceRoutes[key]} className={linkClass}>
                    {t(`services.links.${key}`)}
                  </PageTransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("company.title")}>
            <h2 className={headingClass}>{t("company.title")}</h2>
            <ul className="mt-4">
              {companyKeys.map((key) => (
                <li key={key}>
                  <PageTransitionLink href={companyLinks[key]} className={linkClass}>
                    {key === "ourNetwork" ? navT("links.coverage") : t(`company.links.${key}`)}
                  </PageTransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 lg:col-span-1">
            <h2 className={headingClass}>{t("contact.title")}</h2>
            <ul className="mt-4 space-y-4 text-base">
              <li className="flex gap-3">
                <PublicIcon name="location" className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-orange-500" />
                <span className="whitespace-pre-line leading-relaxed">{t("contact.locations.amman")}</span>
              </li>
              <li className="flex gap-3">
                <PublicIcon name="phone" className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-orange-500" />
                <span className="flex flex-col">
                  {phoneNumbers.map((num) => (
                    <a key={num.tel} href={`tel:${num.tel}`} dir="ltr" className="transition-colors hover:text-white rtl:text-end">
                      {formatPhoneLabel(num.label)}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <PublicIcon name="mail" className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-orange-500" />
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-white">
                  {email}
                </a>
              </li>
              <li className="flex gap-3">
                <PublicIcon name="whatsapp" className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-orange-500" />
                <a
                  href={whatsAppHref(phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {commonT("contact.whatsapp")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="shell py-5 text-sm text-on-dark-faint">{t("copyright", {year: copyrightYear})}</div>
      </div>
    </footer>
  );
}
