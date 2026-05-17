import arMessages from "../../../messages/ar.json";
import enMessages from "../../../messages/en.json";

import {defaultLocale, isLocale, type Locale} from "@/i18n/routing";

import type {
  CareersFormCopy,
  ContactFormCopy,
  ServiceQuoteFormCopy,
} from "./contact-submissions";

type RootMessages = typeof enMessages;

function getRootMessages(locale: Locale): RootMessages {
  return locale === "ar" ? arMessages : enMessages;
}

export function resolveLocale(value: FormDataEntryValue | null): Locale {
  if (typeof value === "string" && isLocale(value)) {
    return value;
  }

  return defaultLocale;
}

export function getCommonFormCopy(locale: Locale) {
  return getRootMessages(locale).Common.forms;
}

export function getContactFormCopy(locale: Locale): ContactFormCopy {
  const messages = getRootMessages(locale);

  return {
    form: messages.Common.forms,
    fields: {
      name: messages.ContactPage.form.fields.name,
      email: messages.ContactPage.form.fields.email,
      phone: messages.ContactPage.form.fields.phone,
      message: messages.ContactPage.form.fields.message,
      subject: messages.ContactPage.form.fields.subject,
    },
  };
}

export function getServiceQuoteFormCopy(locale: Locale): ServiceQuoteFormCopy {
  const messages = getRootMessages(locale);

  return {
    form: messages.Common.forms,
    fields: {
      name: messages.Common.forms.labels.name,
      email: messages.Common.forms.labels.email,
      phone: messages.Common.forms.labels.phone,
      cargoDetails: messages.Common.forms.labels.cargoDetails,
    },
  };
}

export function getCareersFormCopy(locale: Locale): CareersFormCopy {
  const messages = getRootMessages(locale);

  return {
    form: messages.Common.forms,
    fields: {
      name: messages.CareersPage.form.fields.name,
      email: messages.CareersPage.form.fields.email,
      phone: messages.CareersPage.form.fields.phone,
      message: messages.CareersPage.form.fields.message,
      position: messages.CareersPage.form.fields.position,
      experience: messages.CareersPage.form.fields.experience,
      linkedin: messages.CareersPage.form.fields.linkedin,
      cv: messages.CareersPage.form.fields.cv,
    },
  };
}
