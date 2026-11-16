import Image from "next/image";
import type {ReactNode} from "react";

import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {PublicIcon, type IconName} from "@/components/public/PublicIcon";

import {ArrowIcon} from "./Button";

/** Icon in a quiet square well. Navy on light, orange-300 on navy. */
export function IconWell({name, onDark = false, className = ""}: {name: IconName; onDark?: boolean; className?: string}) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
        onDark ? "bg-white/10 text-orange-300" : "bg-navy-100 text-navy-800"
      } ${className}`}
    >
      <PublicIcon name={name} className="h-5 w-5" />
    </span>
  );
}

type FeatureItem = {key?: string; title: string; description?: string; icon?: IconName};

/**
 * Ruled list: rows separated by hairlines instead of boxed cards.
 * `columns` lays the rows out on a shared grid at larger widths.
 */
export function FeatureList({
  items,
  columns = 1,
  onDark = false,
  className = "",
}: {
  items: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  onDark?: boolean;
  className?: string;
}) {
  const grid =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : columns === 2
          ? "sm:grid-cols-2"
          : "";

  return (
    <ul className={`grid gap-x-10 ${grid} ${className}`}>
      {items.map((item) => (
        <li
          key={item.key ?? item.title}
          className={`flex gap-4 border-t py-6 ${onDark ? "border-white/15" : "border-line"}`}
        >
          {item.icon ? <IconWell name={item.icon} onDark={onDark} /> : null}
          <div className="min-w-0">
            <h3 className={`text-item font-semibold leading-snug ${onDark ? "text-white" : "text-navy-900"}`}>
              {item.title}
            </h3>
            {item.description ? (
              <p className={`mt-1.5 text-base leading-relaxed ${onDark ? "text-on-dark-soft" : "text-ink-soft"}`}>
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Numbered sequence for real ordered processes. */
export function Steps({
  steps,
  columns = 3,
  onDark = false,
  className = "",
}: {
  steps: {key?: string; title: string; description: string}[];
  columns?: 1 | 2 | 3 | 4 | 5;
  onDark?: boolean;
  className?: string;
}) {
  const grid =
    columns === 5
      ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : columns === 3
          ? "md:grid-cols-3"
          : columns === 2
            ? "sm:grid-cols-2"
            : "";

  return (
    <ol className={`grid gap-x-8 gap-y-5 sm:gap-y-8 ${grid} ${className}`}>
      {steps.map((step, index) => (
        <li
          key={step.key ?? step.title}
          className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 border-t pt-5 sm:block ${
            onDark ? "border-white/20" : "border-line-strong"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-navy-900">
            {index + 1}
          </span>
          <div>
            <h3 className={`text-item font-semibold leading-snug sm:mt-4 ${onDark ? "text-white" : "text-navy-900"}`}>
              {step.title}
            </h3>
            <p className={`mt-1.5 text-base leading-relaxed ${onDark ? "text-on-dark-soft" : "text-ink-soft"}`}>
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Bordered grid of cells (icon above title). The second list pattern, used
 * where items are peers to compare rather than a sequence to read.
 */
export function FeatureGrid({
  items,
  columns = 3,
  onDark = false,
  className = "",
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  onDark?: boolean;
  className?: string;
}) {
  const grid = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-card border ${
        onDark ? "border-white/15 bg-white/15" : "border-line bg-line"
      } ${grid} ${className}`}
    >
      {items.map((item) => (
        <li key={item.key ?? item.title} className={`flex gap-4 p-5 sm:block sm:p-7 ${onDark ? "bg-navy-900" : "bg-surface"}`}>
          {item.icon ? <IconWell name={item.icon} onDark={onDark} /> : null}
          <div className="min-w-0">
            <h3 className={`text-item font-semibold leading-snug sm:mt-5 ${onDark ? "text-white" : "text-navy-900"}`}>
              {item.title}
            </h3>
            {item.description ? (
              <p className={`mt-1.5 text-base leading-relaxed ${onDark ? "text-on-dark-soft" : "text-ink-soft"}`}>
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Bulleted statements with a small orange tick. */
export function CheckList({items, onDark = false, className = ""}: {items: string[]; onDark?: boolean; className?: string}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              onDark ? "bg-orange-500 text-navy-900" : "bg-navy-900 text-white"
            }`}
          >
            <PublicIcon name="check" className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className={`text-base leading-relaxed ${onDark ? "text-on-dark-soft" : "text-ink"}`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Linked service tile with a photograph. On small screens it collapses to a
 * compact row (thumbnail, title, arrow) so six services stay scannable.
 */
export function ServiceTile({
  href,
  title,
  description,
  image,
  imageAlt,
  icon,
  cta,
}: {
  href: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: IconName;
  cta: string;
}) {
  return (
    <PageTransitionLink
      href={href}
      className="group flex items-start gap-4 rounded-card border border-line bg-surface p-3 transition-[border-color,box-shadow] duration-200 hover:border-navy-800 hover:shadow-card sm:flex-col sm:items-stretch sm:gap-0 sm:p-0"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-navy-900 sm:aspect-[16/10] sm:h-auto sm:w-full sm:rounded-b-none sm:rounded-t-[calc(var(--radius-card)-1px)]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 96px, (max-width: 1024px) 50vw, 400px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col sm:p-6">
        <div className="flex items-center gap-2.5">
          <PublicIcon name={icon} className="hidden h-5 w-5 shrink-0 text-navy-800 sm:block" />
          <h3 className="text-item font-bold leading-snug text-navy-900 sm:text-xl">{title}</h3>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:mt-2.5 sm:text-base">
          {description}
        </p>
        <span className="mt-auto hidden items-center gap-2 pt-4 text-ui font-semibold text-navy-800 sm:inline-flex">
          {cta}
          <ArrowIcon className="flip-rtl h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
      <ArrowIcon className="flip-rtl mt-1 h-5 w-5 text-ink-faint sm:hidden" />
    </PageTransitionLink>
  );
}

/** Small neutral tag (cargo types, modes). Not interactive. */
export function Tag({children, onDark = false}: {children: ReactNode; onDark?: boolean}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-sm font-medium ${
        onDark ? "border-white/25 bg-white/8 text-white" : "border-line bg-surface text-ink"
      }`}
    >
      {children}
    </span>
  );
}
