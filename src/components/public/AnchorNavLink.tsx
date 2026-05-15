"use client";

import type {ComponentProps, MouseEvent} from "react";

import {usePathname} from "@/i18n/navigation";

import {
  getAnchorId,
  getAnchorPathname,
  navigateToAnchor,
  normalizeAnchorHref,
} from "@/lib/anchor-navigation";

import {normalizeSkeletonPath} from "../skeletons/resolveSkeleton";
import {PageTransitionLink} from "./PageTransitionLink";

type AnchorNavLinkProps = Omit<ComponentProps<typeof PageTransitionLink>, "href"> & {
  href: string;
};

function isAnchorHref(href: string) {
  return href.startsWith("#") || (href.includes("#") && !href.startsWith("http"));
}

export function AnchorNavLink({href, onClick, ...props}: AnchorNavLinkProps) {
  const pathname = normalizeSkeletonPath(usePathname());
  const normalizedHref = normalizeAnchorHref(href, pathname);

  if (!isAnchorHref(href)) {
    return <PageTransitionLink href={href} onClick={onClick} {...props} />;
  }

  const targetPathname = normalizeSkeletonPath(getAnchorPathname(normalizedHref));
  const isSamePage = targetPathname === pathname;

  function handleSamePageClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    navigateToAnchor(normalizedHref);
  }

  if (isSamePage) {
    return (
      <a href={normalizedHref} onClick={handleSamePageClick} {...props}>
        {props.children}
      </a>
    );
  }

  return (
    <PageTransitionLink
      href={normalizedHref}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        const id = getAnchorId(normalizedHref);

        if (!id) {
          return;
        }

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({behavior: "smooth", block: "start"});
          });
        });
      }}
      {...props}
    />
  );
}
