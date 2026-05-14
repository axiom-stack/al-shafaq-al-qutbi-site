"use client";

import {startTransition, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";

import {persistLocale} from "@/i18n/localePersistence";
import {locales, type Locale} from "@/i18n/routing";

import {usePageTransition} from "./PageTransitionProvider";

const labels: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
};

export function LocaleSwitch() {
  const router = useRouter();
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const [activeLocale, setActiveLocale] = useState(locale);
  const {beginTransition} = usePageTransition();

  useEffect(() => {
    setActiveLocale(locale);
  }, [locale]);

  function handleLocaleChange(nextLocale: Locale) {
    if (nextLocale === activeLocale) {
      return;
    }

    setActiveLocale(nextLocale);
    beginTransition({pathname: window.location.pathname, locale: nextLocale});
    persistLocale(nextLocale);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-outline-variant bg-white p-1 shadow-sm"
      aria-label={t("languageSwitch")}
      role="group"
    >
      {locales.map((nextLocale) => {
        const isActive = nextLocale === activeLocale;

        return (
          <button
            key={nextLocale}
            type="button"
            className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition-colors ${
              isActive
                ? "bg-alfs-orange text-white"
                : "text-on-surface-variant hover:text-alfs-navy"
            }`}
            aria-pressed={isActive}
            onClick={() => handleLocaleChange(nextLocale)}
          >
            <span className="sr-only">{t("switchTo", {locale: nextLocale})}</span>
            <span aria-hidden="true">{labels[nextLocale]}</span>
          </button>
        );
      })}
    </div>
  );
}
