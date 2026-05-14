"use client";

import {useLocale, useTranslations} from "next-intl";

import {Link, usePathname} from "@/i18n/navigation";
import {locales, type Locale} from "@/i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
};

export function LocaleSwitch() {
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div
      className="inline-flex items-center rounded-full border border-outline-variant bg-white p-1 shadow-sm"
      aria-label={t("languageSwitch")}
      role="group"
    >
      {locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={pathname}
            locale={nextLocale}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition-colors ${
              isActive
                ? "bg-alfs-orange text-white"
                : "text-on-surface-variant hover:text-alfs-navy"
            }`}
            aria-pressed={isActive}
          >
            <span className="sr-only">{t("switchTo", {locale: nextLocale})}</span>
            <span aria-hidden="true">{labels[nextLocale]}</span>
          </Link>
        );
      })}
    </div>
  );
}
