"use client";

import {useEffect, useState} from "react";
import type {MouseEvent} from "react";
import {useTranslations} from "next-intl";

import {FiMenu, FiX} from "react-icons/fi";

import {usePathname, useRouter} from "@/i18n/navigation";
import {navigateToLocation} from "@/lib/anchor-navigation";
import {useBrowserLocation} from "@/lib/use-browser-location";
import {
  parsePhoneNumbers,
  resolveQuoteHref,
  serviceRoutes,
  siteAnchors,
  siteRoutes,
  whatsAppHref,
} from "@/lib/site-routes";

import {AnchorNavLink} from "./AnchorNavLink";
import {LocaleSwitch} from "./LocaleSwitch";
import {PageTransitionLink} from "./PageTransitionLink";
import {PublicIcon, type IconName} from "./PublicIcon";
import {PublicLogo} from "./PublicLogo";

const navItems = [
  {key: "home", type: "home"},
  {key: "services", type: "services"},
  {key: "coverage", type: "coverage"},
  {key: "about", type: "about"},
  {key: "careers", type: "careers"},
  {key: "contact", type: "contact"},
] as const;

const menuServices: {key: keyof typeof serviceRoutes; icon: IconName}[] = [
  {key: "seaFreight", icon: "ship"},
  {key: "landFreight", icon: "truck"},
  {key: "airFreight", icon: "plane"},
  {key: "consolidation", icon: "box"},
  {key: "warehousing", icon: "warehouse"},
  {key: "customsClearance", icon: "customs"},
];

type PublicNavbarProps = {
  currentPage?: "home" | "about" | "services" | "careers" | "contact" | "coverage";
};

type NavItemType = (typeof navItems)[number]["type"];

function getNavHref(itemType: NavItemType) {
  switch (itemType) {
    case "home":
      return siteAnchors.top;
    case "services":
      return "/services";
    case "coverage":
      return siteRoutes.coverage;
    case "about":
      return "/about";
    case "careers":
      return siteRoutes.careers;
    case "contact":
      return siteRoutes.contact;
  }
}

function getActiveNavItem(pathname: string) {
  const normalizedPath = pathname.split("?")[0] || "/";

  if (normalizedPath === "/") {
    return "home";
  }

  if (normalizedPath === "/services" || /^\/services\/[^/]+$/.test(normalizedPath)) {
    return "services";
  }

  if (normalizedPath === "/about") {
    return "about";
  }

  if (normalizedPath === "/coverage") {
    return "coverage";
  }

  if (normalizedPath === "/careers") {
    return "careers";
  }

  if (normalizedPath === "/contact") {
    return "contact";
  }

  return null;
}

export function PublicNavbar({currentPage = "home"}: PublicNavbarProps) {
  const t = useTranslations("HomePage.navbar");
  const footerT = useTranslations("HomePage.footer");
  const commonT = useTranslations("Common");
  const router = useRouter();
  const routerPathname = usePathname();
  const {pathname: locationPath} = useBrowserLocation(routerPathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The sheet covers the page: lock scrolling behind it and close on Escape or on desktop widths.
  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [routerPathname]);

  const quoteHref = resolveQuoteHref(locationPath, currentPage === "home");
  const activeItem = getActiveNavItem(locationPath);
  const phoneNumbers = parsePhoneNumbers(footerT("contact.phone"));
  const email = footerT("contact.email");

  function handlePrimaryNavClick(itemType: NavItemType, event: MouseEvent<HTMLAnchorElement>) {
    if (itemType === "home" && (locationPath.split("?")[0] || "/") === "/") {
      event.preventDefault();
      navigateToLocation("/");
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-surface transition-shadow duration-200 ${
        scrolled || menuOpen ? "shadow-header" : "shadow-[0_1px_0_var(--color-line)]"
      }`}
    >
      <a
        href="#main"
        className="sr-only-focusable btn btn-navy btn-sm absolute start-4 top-3 z-10"
      >
        {commonT("skipToContent")}
      </a>

      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
        <PageTransitionLink href="/" className="flex shrink-0 items-center rounded-md" aria-label={footerT("homeLabel")}>
          <PublicLogo />
        </PageTransitionLink>

        <nav
          aria-label={t("primaryLabel")}
          className="hidden h-full items-stretch gap-1 lg:flex xl:gap-2"
          suppressHydrationWarning
        >
          {navItems.map((item) => {
            const active = item.key === activeItem;

            return (
              <AnchorNavLink
                key={item.key}
                href={getNavHref(item.type)}
                aria-current={active ? "page" : undefined}
                onClick={(event) => handlePrimaryNavClick(item.type, event)}
                className={`relative flex h-10 items-center self-center rounded-md px-3 text-ui font-medium transition-colors xl:px-3.5 ${
                  active ? "text-navy-900" : "text-ink-soft hover:bg-navy-50 hover:text-navy-900"
                }`}
              >
                {t(`links.${item.key}`)}
                <span
                  aria-hidden
                  className={`absolute inset-x-3 -bottom-4 h-0.5 rounded-full bg-orange-500 transition-opacity xl:inset-x-3.5 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </AnchorNavLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitch />
          <AnchorNavLink href={quoteHref} className="btn btn-primary btn-sm">
            {t("getQuote")}
          </AnchorNavLink>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LocaleSwitch />
          <AnchorNavLink href={quoteHref} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {t("getQuote")}
          </AnchorNavLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-navy-900 transition-colors hover:bg-navy-50"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          >
            {menuOpen ? (
              <FiX className="h-6 w-6" strokeWidth={2} aria-hidden />
            ) : (
              <FiMenu className="h-6 w-6" strokeWidth={2} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="sheet-in fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto overscroll-contain border-t border-line bg-surface lg:hidden"
          suppressHydrationWarning
        >
          <div className="shell flex min-h-full flex-col pb-8 pt-2">
            <nav aria-label={t("primaryLabel")}>
              <ul>
                {navItems.map((item) => {
                  const active = item.key === activeItem;

                  return (
                    <li key={item.key} className="border-b border-line">
                      <AnchorNavLink
                        href={getNavHref(item.type)}
                        aria-current={active ? "page" : undefined}
                        onClick={(event) => {
                          setMenuOpen(false);
                          handlePrimaryNavClick(item.type, event);
                        }}
                        className={`flex min-h-14 items-center justify-between gap-3 py-3 text-xl font-semibold ${
                          active ? "text-navy-900" : "text-ink"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden
                            className={`h-2 w-2 rounded-full ${active ? "bg-orange-500" : "bg-transparent"}`}
                          />
                          {t(`links.${item.key}`)}
                        </span>
                      </AnchorNavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-6">
              <p className="t-label text-ink-faint">{footerT("services.title")}</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-4">
                {menuServices.map((service) => (
                  <li key={service.key}>
                    <PageTransitionLink
                      href={serviceRoutes[service.key]}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center gap-2.5 py-2 text-ui font-medium leading-snug text-ink"
                    >
                      <PublicIcon name={service.icon} className="h-[1.125rem] w-[1.125rem] shrink-0 text-navy-800" />
                      {footerT(`services.links.${service.key}`)}
                    </PageTransitionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <AnchorNavLink
                href={quoteHref}
                className="btn btn-primary btn-lg w-full"
                onClick={() => setMenuOpen(false)}
              >
                {t("getQuote")}
              </AnchorNavLink>
              <div className="mt-3 grid grid-cols-3 gap-2 [&_.btn]:gap-1.5">
                <a href={`tel:${phoneNumbers[0].tel}`} className="btn btn-secondary px-2 text-sm">
                  <PublicIcon name="phone" className="h-4 w-4 shrink-0" />
                  {commonT("contact.call")}
                </a>
                <a
                  href={whatsAppHref(footerT("contact.phone"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary px-2 text-sm"
                >
                  <PublicIcon name="whatsapp" className="h-4 w-4 shrink-0" />
                  {commonT("contact.whatsapp")}
                </a>
                <a href={`mailto:${email}`} className="btn btn-secondary px-2 text-sm">
                  <PublicIcon name="mail" className="h-4 w-4 shrink-0" />
                  {commonT("contact.email")}
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
