"use client";

import {useLocale, useTranslations} from "next-intl";
import {isRTL, type Locale} from "@/i18n/routing";
import {PublicIcon} from "./PublicIcon";

interface FloatingWhatsAppProps {
  whatsAppHref: string;
}

export function FloatingWhatsApp({whatsAppHref}: FloatingWhatsAppProps) {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);

  return (
    <a
      href={whatsAppHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsAppLabel")}
      className={`fixed bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 hover:bg-[#1da851] sm:bottom-6 ${
        localeIsRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"
      }`}
    >
      <PublicIcon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
