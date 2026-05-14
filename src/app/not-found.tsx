import type {Metadata} from "next";

import {getLocale, getTranslations} from "next-intl/server";

import {Link as IntlLink} from "@/i18n/navigation";
import {isRTL, type Locale} from "@/i18n/routing";

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
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("NotFound");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,61,168,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(244,121,32,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(13,31,92,0.08),transparent_40%)]" />
      <div className="relative w-full max-w-3xl">
        <div className="brand-card overflow-hidden">
          <div className="bg-alfs-deep-blue px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <p className="brand-kicker text-white/80">{t("kicker")}</p>
            <div className="mt-4 text-[4rem] font-bold leading-none tracking-[-0.08em] text-alfs-orange sm:text-[5.5rem]">
              404
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
              {t("title")}
            </h1>
            <p
              className={`mx-auto mt-4 max-w-xl text-base leading-7 text-white/82 sm:text-lg ${
                localeIsRTL ? "text-right" : "text-center"
              }`}
            >
              {t("description")}
            </p>
            <IntlLink href="/" className="brand-button mt-8">
              {t("action")}
            </IntlLink>
          </div>
          <div className="h-1 bg-alfs-orange" />
        </div>
      </div>
    </main>
  );
}
