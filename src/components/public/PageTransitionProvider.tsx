"use client";

import type {ReactNode} from "react";
import {createContext, useContext, useEffect, useRef, useState} from "react";
import {useLocale} from "next-intl";

import {usePathname} from "@/i18n/navigation";
import {type Locale} from "@/i18n/routing";

import {PageSkeleton} from "../skeletons/PageSkeleton";
import {normalizeSkeletonPath} from "../skeletons/resolveSkeleton";

type PendingTransition = {
  locale: Locale;
  pathname: string;
  visible: boolean;
};

type PageTransitionContextValue = {
  beginTransition: (transition: {pathname: string; locale: Locale}) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

export function PageTransitionProvider({children}: {children: ReactNode}) {
  const pathname = normalizeSkeletonPath(usePathname());
  const locale = useLocale() as Locale;
  const [pendingTransition, setPendingTransition] = useState<PendingTransition | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  function clearPendingTimer() {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
  }

  function removeOverlay() {
    clearPendingTimer();
    setPendingTransition((current) =>
      current && current.visible ? {...current, visible: false} : current,
    );
    clearTimerRef.current = window.setTimeout(() => {
      setPendingTransition(null);
      clearTimerRef.current = null;
    }, 220);
  }

  function beginTransition(transition: {pathname: string; locale: Locale}) {
    clearPendingTimer();
    setPendingTransition({
      pathname: normalizeSkeletonPath(transition.pathname),
      locale: transition.locale,
      visible: true,
    });
  }

  useEffect(() => {
    if (!pendingTransition?.visible) {
      return;
    }

    if (pendingTransition.pathname === pathname && pendingTransition.locale === locale) {
      removeOverlay();
    }
  }, [locale, pathname, pendingTransition]);

  useEffect(() => {
    return () => {
      clearPendingTimer();
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{beginTransition}}>
      {children}
      {pendingTransition ? (
        <div
          className={`fixed inset-0 z-[80] overflow-y-auto bg-surface transition-opacity duration-200 ${
            pendingTransition.visible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <PageSkeleton locale={pendingTransition.locale} pathname={pendingTransition.pathname} />
        </div>
      ) : null}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }

  return context;
}
