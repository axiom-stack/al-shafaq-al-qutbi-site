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

export function normalizeBrowserHash(hash: string) {
  if (!hash) {
    return "";
  }

  const fragment = hash.startsWith("#") ? hash.slice(1) : hash;
  const [cleanFragment] = fragment.split("#");

  return cleanFragment ? `#${cleanFragment}` : "";
}

function normalizeHashFragment(hash: string) {
  return normalizeBrowserHash(hash);
}

/** Set before cross-page anchor navigation; consumed on home mount for smooth scroll. */
export const PENDING_ANCHOR_SCROLL_KEY = "alfs-pending-anchor-scroll";

export function setPendingAnchorScroll(id: string) {
  sessionStorage.setItem(PENDING_ANCHOR_SCROLL_KEY, id);
}

export function consumePendingAnchorScroll() {
  const id = sessionStorage.getItem(PENDING_ANCHOR_SCROLL_KEY);

  if (id) {
    sessionStorage.removeItem(PENDING_ANCHOR_SCROLL_KEY);
  }

  return id;
}

let scrollGeneration = 0;
let scrollRetryFrame = 0;
let skipNextHomeHashScroll = false;

function getAnchorScrollTop(element: HTMLElement) {
  const scrollMargin = parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
  return element.getBoundingClientRect().top + window.scrollY - scrollMargin;
}

export function scrollToAnchorId(id: string, attempt = 0) {
  const generation = attempt === 0 ? ++scrollGeneration : scrollGeneration;

  if (attempt === 0) {
    cancelAnimationFrame(scrollRetryFrame);
  }

  if (generation !== scrollGeneration) {
    return;
  }

  const targetElement = document.getElementById(id);

  if (!targetElement) {
    if (attempt < 24) {
      scrollRetryFrame = window.requestAnimationFrame(() => scrollToAnchorId(id, attempt + 1));
    }

    return;
  }

  window.scrollTo({top: window.scrollY, behavior: "instant"});

  const top = Math.max(0, getAnchorScrollTop(targetElement));
  window.scrollTo({top, behavior: "smooth"});
}

function syncNavbarLocation() {
  window.dispatchEvent(new Event("locationchange"));
}

/** Single entry for same-page home anchor clicks — one URL write, one scroll. */
export function navigateToHomeAnchor(id: string) {
  const hash = `#${id}`;
  const nextUrl = `/${hash}`;

  skipNextHomeHashScroll = true;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
  }

  scrollToAnchorId(id);
  syncNavbarLocation();

  queueMicrotask(() => {
    skipNextHomeHashScroll = false;
  });
}

export function shouldSkipHomeHashScroll() {
  return skipNextHomeHashScroll;
}

export function applyHomeAnchorUrl(id: string) {
  const hash = `#${id}`;
  const nextUrl = `/${hash}`;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.replaceState(null, "", nextUrl);
    syncNavbarLocation();
  }
}

export function navigateToLocation(pathname: string, hash = "") {
  const cleanPathname = pathname || "/";
  const cleanHash = normalizeHashFragment(hash);
  const anchorId = cleanHash ? cleanHash.slice(1) : "";
  const samePathname = window.location.pathname === cleanPathname;

  if (!samePathname) {
    window.location.assign(`${cleanPathname}${cleanHash}`);
    return;
  }

  if (anchorId) {
    navigateToHomeAnchor(anchorId);
    return;
  }

  const nextUrl = cleanPathname;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
    syncNavbarLocation();
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}

/** Same-page anchor navigation without stacking hashes (e.g. /#whyAlfs#whyAlfs). */
export function navigateToAnchor(href: string) {
  const normalized = normalizeAnchorHref(href);
  const pathname = getAnchorPathname(normalized);
  const id = getAnchorId(normalized);

  if (pathname === "/" && id) {
    navigateToHomeAnchor(id);
    return;
  }

  const nextUrl = id ? `${pathname}#${id}` : pathname;

  if (`${window.location.pathname}${window.location.hash}` !== nextUrl) {
    window.history.pushState(null, "", nextUrl);
    syncNavbarLocation();
  }

  if (id) {
    scrollToAnchorId(id);
    return;
  }

  window.scrollTo({top: 0, behavior: "smooth"});
}
