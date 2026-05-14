import "server-only";

import {cookies} from "next/headers";
import {getRequestConfig} from "next-intl/server";

import {defaultLocale, isLocale, localeCookieName, type Locale} from "./routing";

const messageLoaders: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  ar: () => import("../../messages/ar.json").then((module) => module.default),
};

export default getRequestConfig(async ({locale, requestLocale}) => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const requestedLocale = await requestLocale;
  const resolvedLocale = [locale, cookieLocale, requestedLocale].find(isLocale) ?? defaultLocale;

  return {
    locale: resolvedLocale,
    messages: await messageLoaders[resolvedLocale](),
  };
});
