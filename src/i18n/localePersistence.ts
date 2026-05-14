import {
  getDirection,
  isLocale,
  localeCookieName,
  localeStorageKey,
  type Locale,
} from "./routing";

const oneYearInSeconds = 60 * 60 * 24 * 365;

export function applyLocaleToDocument(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.dir = getDirection(locale);
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(localeStorageKey, locale);
  document.cookie = `${localeCookieName}=${locale}; path=/; max-age=${oneYearInSeconds}; samesite=lax`;
  applyLocaleToDocument(locale);
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey);
  return isLocale(storedLocale) ? storedLocale : null;
}
