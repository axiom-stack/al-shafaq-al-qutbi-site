import {defineRouting} from "next-intl/routing";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";
export const localeCookieName = "ALFS_LOCALE";
export const localeStorageKey = "alfs-locale";

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined | null): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === "rtl";
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "never",
  localeCookie: {
    name: localeCookieName,
    path: "/",
    sameSite: "lax",
  },
  localeDetection: false,
});
