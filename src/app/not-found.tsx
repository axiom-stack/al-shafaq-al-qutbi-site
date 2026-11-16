import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {ArrowLink, ButtonLink} from "@/components/ui/Button";
import {serviceRoutes} from "@/lib/site-routes";

const serviceKeys = ["seaFreight", "landFreight", "airFreight", "consolidation", "warehousing", "customsClearance"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const navT = await getTranslations("HomePage.navbar");
  const footerT = await getTranslations("HomePage.footer");

  return (
    <>
      <PublicNavbar />
      <main id="main" className="bg-paper pt-[var(--header-h)]">
        <div className="shell grid min-h-[70svh] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20 lg:py-20">
          <div>
            <p className="t-display text-navy-900" aria-hidden>
              404
            </p>
            <h1 className="t-h2 mt-4 text-navy-900">{t("title")}</h1>
            <p className="t-lead mt-4 max-w-xl text-ink-soft">{t("description")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/" size="lg">
                {t("action")}
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                {navT("links.contact")}
              </ButtonLink>
            </div>
          </div>
          <div>
            <h2 className="t-h3 text-navy-900">{footerT("services.title")}</h2>
            <ul className="mt-4 border-b border-line">
              {serviceKeys.map((key) => (
                <li key={key} className="border-t border-line">
                  <ArrowLink href={serviceRoutes[key]} className="min-h-12 w-full justify-between">
                    {footerT(`services.links.${key}`)}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
