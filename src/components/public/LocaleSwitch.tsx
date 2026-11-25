"use client";

import {startTransition, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";

import {persistLocale} from "@/i18n/localePersistence";
import {locales, type Locale} from "@/i18n/routing";

import {usePageTransition} from "./PageTransitionProvider";
import {PublicIcon} from "./PublicIcon";

/** Each language is named in its own script, so the label never needs translating. */
const endonyms: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function LocaleSwitch({className = ""}: {className?: string}) {
  const router = useRouter();
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const [activeLocale, setActiveLocale] = useState(locale);
  const {beginTransition} = usePageTransition();

  useEffect(() => {
    setActiveLocale(locale);
  }, [locale]);

  const nextLocale = locales.find((value) => value !== activeLocale) ?? activeLocale;

  function handleLocaleChange() {
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
    <button
      type="button"
      onClick={handleLocaleChange}
      lang={nextLocale}
      aria-label={`${t("languageSwitch")}: ${endonyms[nextLocale]}`}
      className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-ui font-semibold text-navy-800 transition-colors hover:bg-navy-50 ${className}`}
    >
      <PublicIcon name="globe" className="h-[1.125rem] w-[1.125rem] text-ink-faint" />
      <span className={nextLocale === "ar" ? "font-arabic" : "font-sans"}>{endonyms[nextLocale]}</span>
    </button>
  );
}
