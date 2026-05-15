/**
 * Resolve fragment-only hrefs against a pathname so `#whyAlfs` becomes `/#whyAlfs`
 * (not `/#whyAlfs` stacked on an existing hash). Fragment links on other routes
 * become `/contact#inquiry-form`, etc.
 */
export function normalizeAnchorHref(href: string, pathname = "/") {
  if (!href.startsWith("#")) {
    return href;
  }

  const base = pathname.split("#")[0]?.split("?")[0] || "/";

  return `${base}${href}`;
}

export function getAnchorId(href: string) {
  const normalized = normalizeAnchorHref(href);
  const hashIndex = normalized.indexOf("#");

  if (hashIndex === -1) {
    return "";
  }

  return normalized.slice(hashIndex + 1);
}

export function getAnchorPathname(href: string) {
  const normalized = normalizeAnchorHref(href);
  const hashIndex = normalized.indexOf("#");
  const path = hashIndex === -1 ? normalized : normalized.slice(0, hashIndex);

  return path || "/";
}

/** Same-page anchor navigation without stacking hashes (e.g. /#whyAlfs#whyAlfs). */
export function navigateToAnchor(href: string) {
  const normalized = normalizeAnchorHref(href);
  const pathname = getAnchorPathname(normalized);
  const id = getAnchorId(normalized);
  const nextUrl = id ? `${pathname}#${id}` : pathname;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
  }

  if (id) {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"});
    return;
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}
