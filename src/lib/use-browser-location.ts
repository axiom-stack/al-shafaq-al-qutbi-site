"use client";

import {useCallback, useEffect, useState} from "react";

import {normalizeBrowserHash} from "@/lib/anchor-navigation";

export type BrowserLocation = {
  pathname: string;
  hash: string;
};

function readBrowserLocation(): BrowserLocation {
  const pathname = window.location.pathname;
  const hash = normalizeBrowserHash(window.location.hash);

  if (hash !== window.location.hash) {
    window.history.replaceState(null, "", `${pathname}${hash}`);
  }

  return {pathname, hash};
}

export function useBrowserLocation(serverPathname: string) {
  const [hasMounted, setHasMounted] = useState(false);
  const [browserLocation, setBrowserLocation] = useState<BrowserLocation>(() => ({
    pathname: serverPathname,
    hash: "",
  }));

  const syncBrowserLocation = useCallback(() => {
    setBrowserLocation(readBrowserLocation());
  }, []);

  useEffect(() => {
    setHasMounted(true);
    syncBrowserLocation();

    window.addEventListener("popstate", syncBrowserLocation);
    window.addEventListener("hashchange", syncBrowserLocation);
    window.addEventListener("locationchange", syncBrowserLocation);

    return () => {
      window.removeEventListener("popstate", syncBrowserLocation);
      window.removeEventListener("hashchange", syncBrowserLocation);
      window.removeEventListener("locationchange", syncBrowserLocation);
    };
  }, [syncBrowserLocation]);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    syncBrowserLocation();
  }, [hasMounted, serverPathname, syncBrowserLocation]);

  if (!hasMounted) {
    return {pathname: serverPathname, hash: ""};
  }

  return browserLocation;
}
