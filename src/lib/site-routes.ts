/** Canonical public routes — keep service URLs in one place. */
export const serviceRoutes = {
  seaFreight: "/services/sea-freight",
  landFreight: "/services/land-freight",
  airFreight: "/services/air-freight",
  consolidation: "/services/cargo-consolidation",
  warehousing: "/services/warehousing",
  customsClearance: "/services/customs-clearance",
} as const;

export type ServiceRouteKey = keyof typeof serviceRoutes;

export const siteRoutes = {
  contact: "/contact",
} as const;

export const contactInquiryHref = `${siteRoutes.contact}#inquiry-form`;

export const siteAnchors = {
  contact: "/contact",
  coverage: "/#coverage",
  whyAlfs: "/#whyAlfs",
  track: "/#track",
  quoteForm: "#quote-form",
} as const;

export function serviceQuoteHref(route: string) {
  return `${route}#quote-form`;
}

/** Navbar / CTA quote target based on current path. */
export function resolveQuoteHref(pathname: string | null, onHomePage: boolean) {
  if (pathname && /^\/services\/[^/]+$/.test(pathname)) {
    return `${pathname}#quote-form`;
  }

  if (normalizeContactPath(pathname) === siteRoutes.contact) {
    return "#inquiry-form";
  }

  return contactInquiryHref;
}

function normalizeContactPath(pathname: string | null) {
  if (!pathname) return "";
  const [withoutHash] = pathname.split("#");
  const [withoutQuery] = withoutHash.split("?");
  return withoutQuery || "";
}

export function primaryPhoneTel(phoneLabel: string) {
  const primary = phoneLabel.split("/")[0]?.trim() ?? phoneLabel;
  return primary.replace(/[^\d+]/g, "");
}

export function whatsAppHref(phoneLabel: string) {
  const digits = primaryPhoneTel(phoneLabel).replace(/^00/, "");
  return `https://wa.me/${digits}`;
}
