"use client";

import {useState} from "react";
import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";
import {isRTL, type Locale} from "@/i18n/routing";

import {LocaleSwitch} from "./LocaleSwitch";
import {PublicIcon} from "./PublicIcon";
import {PublicLogo} from "./PublicLogo";

const navItems = [
  {key: "home", type: "home"},
  {key: "services", type: "services"},
  {key: "coverage", type: "coverage"},
  {key: "whyAlfs", type: "whyAlfs"},
  {key: "about", type: "about"},
  {key: "contact", type: "contact"},
] as const;

type PublicNavbarProps = {
  currentPage?: "home" | "about";
};

function getNavHref(currentPage: "home" | "about", itemType: (typeof navItems)[number]["type"]) {
  switch (itemType) {
    case "home":
      return currentPage === "home" ? "#top" : "/";
    case "services":
      return currentPage === "home" ? "#services" : "/#services";
    case "coverage":
      return currentPage === "home" ? "#coverage" : "/#coverage";
    case "whyAlfs":
      return currentPage === "home" ? "#whyAlfs" : "/#whyAlfs";
    case "about":
      return "/about";
    case "contact":
      return currentPage === "home" ? "#contact" : "/#contact";
  }
}

export function PublicNavbar({currentPage = "home"}: PublicNavbarProps) {
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e1ec] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-2 py-2 sm:px-4 lg:px-6">
        <Link href="/" className="min-w-0">
          <PublicLogo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={getNavHref(currentPage, item.type)}
              className={`text-[12px] font-medium transition-colors ${
                item.key === currentPage
                  ? "border-b border-alfs-orange pb-0.5 text-alfs-orange"
                  : "text-[#3a3d4e] hover:text-alfs-orange"
              }`}
            >
              {t(`links.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitch />
          <a
            href={currentPage === "home" ? "#track" : "/#track"}
            className="rounded-md border border-alfs-navy px-4 py-2 text-[12px] font-semibold text-alfs-navy transition-colors hover:bg-alfs-navy hover:text-white"
          >
            {t("trackShipment")}
          </a>
          <a
            href={currentPage === "home" ? "#final-cta" : "#final-cta"}
            className="rounded-md bg-alfs-orange px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-alfs-amber"
          >
            {t("getQuote")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitch />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-outline-variant text-alfs-navy"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={t("menu")}
          >
            <PublicIcon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className={`border-t border-outline-variant bg-white px-4 py-4 lg:hidden ${localeIsRTL ? "text-right" : "text-left"}`}>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={getNavHref(currentPage, item.type)}
                className={`text-sm font-medium ${
                  item.key === currentPage ? "text-alfs-orange" : "text-on-surface-variant"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {t(`links.${item.key}`)}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <a
                href={currentPage === "home" ? "#track" : "/#track"}
                className="rounded-md border border-alfs-navy px-4 py-2 text-center text-sm font-semibold text-alfs-navy"
                onClick={() => setMenuOpen(false)}
              >
                {t("trackShipment")}
              </a>
              <a
                href={currentPage === "home" ? "#final-cta" : "#final-cta"}
                className="rounded-md bg-alfs-orange px-4 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                {t("getQuote")}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
