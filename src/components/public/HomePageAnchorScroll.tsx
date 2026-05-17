"use client";

import {useLayoutEffect} from "react";

import {usePathname} from "@/i18n/navigation";
import {
  applyHomeAnchorUrl,
  consumePendingAnchorScroll,
  normalizeBrowserHash,
  scrollToAnchorId,
  shouldSkipHomeHashScroll,
} from "@/lib/anchor-navigation";

export function HomePageAnchorScroll() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname !== "/") {
      return;
    }

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollFromHash = (scrollTopIfEmpty = false) => {
      if (shouldSkipHomeHashScroll()) {
        return;
      }

      const hash = normalizeBrowserHash(window.location.hash);

      if (hash) {
        scrollToAnchorId(hash.slice(1));
        return;
      }

      if (scrollTopIfEmpty) {
        window.scrollTo({top: 0, behavior: "smooth"});
      }
    };

    const pendingId = consumePendingAnchorScroll();

    if (pendingId) {
      applyHomeAnchorUrl(pendingId);
      scrollToAnchorId(pendingId);
    } else {
      scrollFromHash();
    }

    const handleLocationChange = () => scrollFromHash(true);
    const handleHashChange = () => scrollFromHash(true);

    window.addEventListener("locationchange", handleLocationChange);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("locationchange", handleLocationChange);
      window.removeEventListener("hashchange", handleHashChange);

      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, [pathname]);

  return null;
}
