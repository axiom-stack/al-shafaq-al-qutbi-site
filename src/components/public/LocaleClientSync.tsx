"use client";

import {useEffect, useTransition} from "react";
import {useRouter} from "next/navigation";
import {useLocale} from "next-intl";

import {
  applyLocaleToDocument,
  persistLocale,
  readStoredLocale,
} from "@/i18n/localePersistence";
import {type Locale} from "@/i18n/routing";

import {usePageTransition} from "./PageTransitionProvider";

export function LocaleClientSync() {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [, startTransition] = useTransition();
  const {beginTransition} = usePageTransition();

  useEffect(() => {
    const storedLocale = readStoredLocale();

    if (storedLocale && storedLocale !== locale) {
      beginTransition({pathname: window.location.pathname, locale: storedLocale});
      persistLocale(storedLocale);
      startTransition(() => {
        router.refresh();
      });
      return;
    }

    persistLocale(locale);
    applyLocaleToDocument(locale);
  }, [locale, router]);

  return null;
}
