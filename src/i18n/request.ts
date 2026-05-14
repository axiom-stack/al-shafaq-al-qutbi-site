import "server-only";

import {getRequestConfig} from "next-intl/server";

import {defaultLocale, isLocale, type Locale} from "./routing";

const messageLoaders: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  ar: () => import("../../messages/ar.json").then((module) => module.default),
};

export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocale = await requestLocale;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    messages: await messageLoaders[locale](),
  };
});
