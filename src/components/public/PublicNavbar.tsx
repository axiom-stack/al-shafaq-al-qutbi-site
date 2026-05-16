"use client";

import {useEffect, useState} from "react";
import {useLocale} from "next-intl";
import {useTranslations} from "next-intl";

import {FiMenu, FiX} from "react-icons/fi";

import {usePathname} from "@/i18n/navigation";
import {isRTL, type Locale} from "@/i18n/routing";
import {resolveQuoteHref, siteAnchors, siteRoutes} from "@/lib/site-routes";

import {AnchorNavLink} from "./AnchorNavLink";
import {LocaleSwitch} from "./LocaleSwitch";
import {PageTransitionLink} from "./PageTransitionLink";
import {PublicLogo} from "./PublicLogo";

const navItems = [
  {key: "home", type: "home"},
  {key: "services", type: "services"},
  {key: "coverage", type: "coverage"},
  {key: "about", type: "about"},
  {key: "careers", type: "careers"},
  {key: "contact", type: "contact"},
] as const;

type PublicNavbarProps = {
  currentPage?: "home" | "about" | "services" | "careers" | "contact";
};

function getNavHref(itemType: (typeof navItems)[number]["type"]) {
  switch (itemType) {
    case "home":
      return "/";
    case "services":
      return "/services";
    case "coverage":
      return siteAnchors.coverage;
    case "about":
      return "/about";
    case "careers":
      return siteRoutes.careers;
    case "contact":
      return siteRoutes.contact;
  }
}

export function PublicNavbar({currentPage = "home"}: PublicNavbarProps) {
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    // Only run intersection observer on home page to track sections
    if (currentPage !== "home") {
      setActiveSection(null);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sectionIds = ["top", "services", "coverage", "contact"];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentPage, pathname]);

  const quoteHref = resolveQuoteHref(pathname, currentPage === "home");

  const isItemActive = (itemKey: string) => {
    if (currentPage === "home") {
      if (activeSection) {
        const effectiveActiveSection = activeSection === "top" ? "home" : activeSection;
        return itemKey === effectiveActiveSection;
      }
      return itemKey === "home";
    }
    return itemKey === currentPage;
  };

  function renderNavLink(
    href: string,
    label: string,
    className: string,
    onClick?: () => void,
  ) {
    return (
      <AnchorNavLink href={href} className={className} onClick={onClick}>
        {label}
      </AnchorNavLink>
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
            <span key={item.key} className="contents">
              {renderNavLink(
                getNavHref(item.type),
                t(`links.${item.key}`),
                `text-[12px] font-medium transition-colors ${
                  isItemActive(item.key)
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
        <div
          className={`border-t border-outline-variant bg-white px-4 py-4 lg:hidden ${
            localeIsRTL ? "text-right" : "text-left"
          }`}
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <span key={item.key} className="contents">
                {renderNavLink(
                  getNavHref(item.type),
                  t(`links.${item.key}`),
                  `text-sm font-medium ${
                    isItemActive(item.key) ? "text-alfs-orange" : "text-on-surface-variant"
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
