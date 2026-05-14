"use client";

import type {ComponentProps, MouseEvent} from "react";

import {useLocale} from "next-intl";

import {Link, usePathname} from "@/i18n/navigation";
import {type Locale} from "@/i18n/routing";

import {normalizeSkeletonPath} from "../skeletons/resolveSkeleton";
import {usePageTransition} from "./PageTransitionProvider";

type PageTransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "locale"> & {
  href: string;
  locale?: Locale;
};

function resolveHrefPathname(href: string, currentPathname: string) {
  if (href.startsWith("#")) {
    return currentPathname;
  }

  const [withoutHash] = href.split("#");
  const [withoutQuery] = withoutHash.split("?");

  return normalizeSkeletonPath(withoutQuery || currentPathname);
}

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;
}

export function PageTransitionLink({
  href,
  locale,
  onClick,
  target,
  ...props
}: PageTransitionLinkProps) {
  const pathname = normalizeSkeletonPath(usePathname());
  const activeLocale = useLocale() as Locale;
  const {beginTransition} = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || isModifiedEvent(event) || target === "_blank") {
      return;
    }

    const nextPathname = resolveHrefPathname(href, pathname);
    const nextLocale = locale ?? activeLocale;
    const routeChanged = nextPathname !== pathname;
    const localeChanged = nextLocale !== activeLocale;

    if (routeChanged || localeChanged) {
      beginTransition({pathname: nextPathname, locale: nextLocale});
    }
  }

  return <Link href={href} locale={locale} onClick={handleClick} target={target} {...props} />;
}
