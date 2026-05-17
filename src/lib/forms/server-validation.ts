import {ZodError} from "zod";

import type {Locale} from "@/i18n/routing";

import type {SubmissionType} from "./contact-submissions";

export type FormRouteSuccess = {
  success: true;
  message: string;
};

export type FormRouteError = {
  success: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

export function toFieldErrors(error: ZodError): Record<string, string> {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;

  return Object.fromEntries(
    Object.entries(flattened)
      .map(([key, messages]) => [key, messages?.[0]])
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

export function buildSubmissionSubject(formType: SubmissionType, locale: Locale) {
  const subjectMap: Record<SubmissionType, Record<Locale, string>> = {
    contact: {
      en: "Website Contact Inquiry",
      ar: "استفسار تواصل من الموقع",
    },
    "service-quote": {
      en: "Website Service Quote Request",
      ar: "طلب عرض سعر من الموقع",
    },
    careers: {
      en: "Website Careers Application",
      ar: "طلب توظيف من الموقع",
    },
  };

  return subjectMap[formType][locale];
}
