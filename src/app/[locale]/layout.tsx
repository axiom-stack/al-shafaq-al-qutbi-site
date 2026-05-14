import type {ReactNode} from "react";

import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";

import {isLocale, locales} from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return children;
}
