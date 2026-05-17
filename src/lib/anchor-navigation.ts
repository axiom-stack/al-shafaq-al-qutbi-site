/**
 * Resolve fragment-only hrefs against a pathname so `#whyAlfs` becomes `/#whyAlfs`
 * (not `/#whyAlfs` stacked on an existing hash). Fragment links on other routes
 * become `/contact#inquiry-form`, etc.
 */
export function normalizeAnchorHref(href: string, pathname = "/") {
  const resolvedHref = href.startsWith("#")
    ? `${pathname.split("#")[0]?.split("?")[0] || "/"}${href}`
    : href;
  const [pathPart, hashPart] = resolvedHref.split("#");

  if (!hashPart) {
    return pathPart || "/";
  }

  return `${pathPart || "/"}#${hashPart}`;
}

export function getAnchorId(href: string) {
  const normalized = normalizeAnchorHref(href);
  const [, hashPart] = normalized.split("#");

  if (!hashPart) {
    return "";
  }

  return hashPart;
}

export function getAnchorPathname(href: string) {
  const normalized = normalizeAnchorHref(href);
  const [path] = normalized.split("#");

  return path || "/";
}

function normalizeHashFragment(hash: string) {
  if (!hash) {
    return "";
  }

  const fragment = hash.startsWith("#") ? hash.slice(1) : hash;
  const [cleanFragment] = fragment.split("#");

  return cleanFragment ? `#${cleanFragment}` : "";
}

export function navigateToLocation(pathname: string, hash = "") {
  const cleanPathname = pathname || "/";
  const cleanHash = normalizeHashFragment(hash);
  const nextUrl = `${cleanPathname}${cleanHash}`;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
    window.dispatchEvent(new Event("locationchange"));
  }

  if (cleanHash) {
    document.getElementById(cleanHash.slice(1))?.scrollIntoView({behavior: "smooth", block: "start"});
    return;
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}

/** Same-page anchor navigation without stacking hashes (e.g. /#whyAlfs#whyAlfs). */
export function navigateToAnchor(href: string) {
  const normalized = normalizeAnchorHref(href);
  const pathname = getAnchorPathname(normalized);
  const id = getAnchorId(normalized);
  const nextUrl = id ? `${pathname}#${id}` : pathname;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
    window.dispatchEvent(new Event("locationchange"));
  }

  if (id) {
    document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"});
    return;
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}
