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

export function LocaleClientSync() {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const [, startTransition] = useTransition();

  useEffect(() => {
    const storedLocale = readStoredLocale();

    if (storedLocale && storedLocale !== locale) {
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
