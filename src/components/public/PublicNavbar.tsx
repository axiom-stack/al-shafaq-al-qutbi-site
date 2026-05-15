"use client";

import {useState} from "react";
import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

import {FiMenu, FiX} from "react-icons/fi";

import {usePathname} from "@/i18n/navigation";
import {isRTL, type Locale} from "@/i18n/routing";
import {resolveQuoteHref, siteRoutes} from "@/lib/site-routes";

import {LocaleSwitch} from "./LocaleSwitch";
import {PageTransitionLink} from "./PageTransitionLink";
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
  currentPage?: "home" | "about" | "services" | "contact";
};

function getNavHref(
  itemType: (typeof navItems)[number]["type"],
  pathname: string,
) {
  switch (itemType) {
    case "home":
      return pathname === "/" ? "#top" : "/";
    case "services":
      return pathname === "/services" ? "#top" : "/services";
    case "coverage":
      return pathname === "/" ? "#coverage" : "/#coverage";
    case "whyAlfs":
      return pathname === "/" ? "#whyAlfs" : "/#whyAlfs";
    case "about":
      return pathname === "/about" ? "#top" : "/about";
    case "contact":
      return pathname === "/contact" ? "#top" : siteRoutes.contact;
  }
}

export function PublicNavbar({currentPage = "home"}: PublicNavbarProps) {
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const quoteHref = resolveQuoteHref(pathname, currentPage === "home");

  function renderNavLink(
    href: string,
    label: string,
    className: string,
    onClick?: () => void,
  ) {
    if (href.startsWith("#")) {
      return (
        <a href={href} className={className} onClick={onClick}>
          {label}
        </a>
      );
    }

    return (
      <PageTransitionLink href={href} className={className} onClick={onClick}>
        {label}
      </PageTransitionLink>
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e1ec] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-2 py-2 sm:px-4 lg:px-6">
        <PageTransitionLink href="/" className="min-w-0">
          <PublicLogo />
        </PageTransitionLink>

        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <span
              key={item.key}
              className="contents"
            >
              {renderNavLink(
                getNavHref(item.type, pathname),
                t(`links.${item.key}`),
                `text-[12px] font-medium transition-colors ${
                  item.key === currentPage
                    ? "border-b border-alfs-orange pb-0.5 text-alfs-orange"
                    : "text-[#3a3d4e] hover:text-alfs-orange"
                }`,
              )}
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitch />
          {renderNavLink(
            quoteHref,
            t("getQuote"),
            "rounded-md bg-alfs-orange px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-alfs-amber",
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitch />
          <button
            type="button"
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alfs-orange focus-visible:ring-offset-2 ${
              menuOpen
                ? "bg-alfs-orange text-white shadow-[0_4px_14px_rgba(244,121,32,0.35)]"
                : "bg-alfs-deep-blue/[0.07] text-alfs-navy hover:bg-alfs-deep-blue/[0.11] active:bg-alfs-deep-blue/[0.15]"
            }`}
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={t("menu")}
          >
            {menuOpen ? (
              <FiX className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
            ) : (
              <FiMenu className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className={`border-t border-outline-variant bg-white px-4 py-4 lg:hidden ${localeIsRTL ? "text-right" : "text-left"}`}>
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <span
                key={item.key}
                className="contents"
              >
                {renderNavLink(
                  getNavHref(item.type, pathname),
                  t(`links.${item.key}`),
                  `text-sm font-medium ${
                    item.key === currentPage ? "text-alfs-orange" : "text-on-surface-variant"
                  }`,
                  () => setMenuOpen(false),
                )}
              </span>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              {renderNavLink(
                quoteHref,
                t("getQuote"),
                "rounded-md bg-alfs-orange px-4 py-2 text-center text-sm font-semibold text-white",
                () => setMenuOpen(false),
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
