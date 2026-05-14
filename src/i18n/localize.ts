import {defaultLocale, type Locale} from "./routing";

export type LocalizedValue<T> = Partial<Record<Locale, T>> & {
  default?: T;
};

export function resolveLocalizedValue<T>(
  value: T | LocalizedValue<T> | null | undefined,
  locale: Locale,
): T | undefined {
  if (value == null) {
    return undefined;
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return value as T;
  }

  const localizedValue = value as LocalizedValue<T>;

  return localizedValue[locale] ?? localizedValue[defaultLocale] ?? localizedValue.default;
}
