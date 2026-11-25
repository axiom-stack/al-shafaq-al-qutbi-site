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
  careers: "/careers",
  coverage: "/coverage",
} as const;

export const contactInquiryHref = `${siteRoutes.contact}#inquiry-form`;

export const siteAnchors = {
  top: "/",
  contact: "/contact",
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
    return `${siteRoutes.contact}#inquiry-form`;
  }

  return contactInquiryHref;
}

function normalizeContactPath(pathname: string | null) {
  if (!pathname) return "";
  const [withoutHash] = pathname.split("#");
  const [withoutQuery] = withoutHash.split("?");
  return withoutQuery || "";
}

export function parsePhoneNumbers(phoneLabel: string) {
  return phoneLabel.split("/").map((part) => {
    const label = part.trim();
    return {
      label,
      tel: label.replace(/[^\d+]/g, ""),
    };
  });
}

/** "00962791010199" -> "+962 79 101 0199": same number, readable grouping. */
export function formatPhoneLabel(label: string) {
  const digits = label.replace(/[^\d]/g, "").replace(/^00/, "");
  const match = /^(962)(7\d)(\d{3})(\d{4})$/.exec(digits);

  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : label;
}

export function whatsAppHref(phoneLabel: string) {
  // Always use the specified primary WhatsApp number
  const whatsappNumber = "962791010199";
  return `https://wa.me/${whatsappNumber}`;
}
