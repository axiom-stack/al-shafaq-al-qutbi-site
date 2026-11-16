import type {ReactNode} from "react";

import {AnchorNavLink} from "@/components/public/AnchorNavLink";

type Variant = "primary" | "navy" | "secondary" | "onDark";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  navy: "btn-navy",
  secondary: "btn-secondary",
  onDark: "btn-on-dark",
};

const sizeClass: Record<Size, string> = {sm: "btn-sm", md: "", lg: "btn-lg"};

export function buttonClassName(variant: Variant = "primary", size: Size = "md", className = "") {
  return ["btn", variantClass[variant], sizeClass[size], className].filter(Boolean).join(" ");
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  id?: string;
  external?: boolean;
  onClick?: () => void;
};

function isPlainAnchor(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/** A link that looks like a button. Internal routes keep the page-transition behaviour. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  id,
  external = false,
  onClick,
}: ButtonLinkProps) {
  const classes = buttonClassName(variant, size, className);

  if (isPlainAnchor(href)) {
    return (
      <a
        id={id}
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <AnchorNavLink id={id} href={href} className={classes} onClick={onClick}>
      {children}
    </AnchorNavLink>
  );
}

/** Arrow that points along the reading direction. */
export function ArrowIcon({className = "h-4 w-4"}: {className?: string}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnchorNavLink href={href} className={`link-arrow ${className}`}>
      <span>{children}</span>
      <ArrowIcon />
    </AnchorNavLink>
  );
}
