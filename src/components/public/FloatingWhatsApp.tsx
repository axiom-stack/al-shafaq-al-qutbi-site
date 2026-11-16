"use client";

import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import {PublicIcon} from "./PublicIcon";

interface FloatingWhatsAppProps {
  whatsAppHref: string;
}

/**
 * Floating WhatsApp shortcut. It stays out of the way of the hero actions by
 * appearing only after the first screen has been scrolled, steps aside near
 * the end of the page (the footer has its own WhatsApp link), and is hidden
 * while a form field is focused (see `.floating-shortcut` in globals.css).
 */
export function FloatingWhatsApp({whatsAppHref}: FloatingWhatsAppProps) {
  const t = useTranslations("Common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY > window.innerHeight * 0.6;
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 320;

      setVisible(scrolled && !nearEnd);
    };

    update();
    window.addEventListener("scroll", update, {passive: true});
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <aside aria-label={t("whatsAppLabel")}>
      <a
        href={whatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsAppLabel")}
        tabIndex={visible ? undefined : -1}
        className={`floating-shortcut fixed end-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-float transition-[transform,opacity] duration-200 hover:scale-105 focus-visible:scale-105 sm:end-6 sm:bottom-6 sm:h-14 sm:w-14 ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <PublicIcon name="whatsapp" className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </aside>
  );
}
