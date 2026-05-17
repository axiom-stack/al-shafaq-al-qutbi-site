"use client";

import {useEffect, useState} from "react";
import type {MouseEvent} from "react";
import {useLocale, useTranslations} from "next-intl";

import {FiMenu, FiX} from "react-icons/fi";

import {usePathname, useRouter} from "@/i18n/navigation";
import {isRTL, type Locale} from "@/i18n/routing";
import {navigateToLocation, setPendingAnchorScroll} from "@/lib/anchor-navigation";
import {useBrowserLocation} from "@/lib/use-browser-location";
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

type NavItemType = (typeof navItems)[number]["type"];

function getNavHref(itemType: NavItemType) {
  switch (itemType) {
    case "home":
      return siteAnchors.top;
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

function getActiveNavItem(pathname: string, hash: string) {
  const normalizedPath = pathname.split("?")[0] || "/";

  if (normalizedPath === "/") {
    return hash === "#coverage" ? "coverage" : "home";
  }

  if (normalizedPath === "/services" || /^\/services\/[^/]+$/.test(normalizedPath)) {
    return "services";
  }

  if (normalizedPath === "/about") {
    return "about";
  }

  if (normalizedPath === "/careers") {
    return "careers";
  }

  if (normalizedPath === "/contact") {
    return "contact";
  }

  return null;
}

const activeLinkClass =
  "border-b border-alfs-orange pb-0.5 text-alfs-orange";
const inactiveLinkClass = "text-[#3a3d4e] hover:text-alfs-orange";

export function PublicNavbar({currentPage = "home"}: PublicNavbarProps) {
  const t = useTranslations("HomePage.navbar");
  const locale = useLocale() as Locale;
  const localeIsRTL = isRTL(locale);
  const router = useRouter();
  const routerPathname = usePathname();
  const {pathname: locationPath, hash} = useBrowserLocation(routerPathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const quoteHref = resolveQuoteHref(locationPath, currentPage === "home");
  const activeItem = getActiveNavItem(locationPath, hash);

  function linkClassName(itemKey: string, baseClassName: string) {
    return `${baseClassName} ${isItemActive(itemKey) ? activeLinkClass : inactiveLinkClass}`;
  }

  function isItemActive(itemKey: string) {
    return itemKey === activeItem;
  }

  function handlePrimaryNavClick(
    itemType: NavItemType,
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (itemType === "coverage") {
      event.preventDefault();

      if ((locationPath.split("?")[0] || "/") === "/") {
        navigateToLocation("/", "coverage");
        return;
      }

      setPendingAnchorScroll("coverage");
      router.push("/", {scroll: false});
      return;
    }

    if (itemType === "home" && (locationPath.split("?")[0] || "/") === "/") {
      event.preventDefault();
      navigateToLocation("/");
    }
  }

  function renderNavLink(
    itemType: NavItemType,
    label: string,
    className: string,
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void,
  ) {
    return (
      <a href={getNavHref(itemType)} className={className} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2e1ec] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-2 py-2 sm:px-4 lg:px-6">
        <PageTransitionLink href="/" className="min-w-0">
          <PublicLogo />
        </PageTransitionLink>

        <nav className="hidden items-center gap-5 lg:flex" suppressHydrationWarning>
          {navItems.map((item) => (
            <span key={item.key} className="contents">
              {renderNavLink(
                item.type,
                t(`links.${item.key}`),
                linkClassName(item.key, "text-[12px] font-medium transition-colors"),
                (event) => handlePrimaryNavClick(item.type, event),
              )}
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitch />
          <AnchorNavLink
            href={quoteHref}
            className="rounded-md bg-alfs-orange px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-alfs-amber"
          >
            {t("getQuote")}
          </AnchorNavLink>
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
          suppressHydrationWarning
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <span key={item.key} className="contents">
                {renderNavLink(
                  item.type,
                  t(`links.${item.key}`),
                  `text-sm font-medium ${
                    isItemActive(item.key) ? "text-alfs-orange" : "text-on-surface-variant"
                  }`,
                  (event) => {
                    setMenuOpen(false);
                    handlePrimaryNavClick(item.type, event);
                  },
                )}
              </span>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <AnchorNavLink
                href={quoteHref}
                className="rounded-md bg-alfs-orange px-4 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMenuOpen(false)}
              >
                {t("getQuote")}
              </AnchorNavLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
