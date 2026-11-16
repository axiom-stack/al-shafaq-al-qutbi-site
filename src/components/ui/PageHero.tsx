import type {ReactNode} from "react";

import {HeroImage} from "./HeroImage";

type PageHeroProps = {
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imageZoom?: number;
  imageOrigin?: string;
  size?: "lg" | "md";
  actions?: ReactNode;
  below?: ReactNode;
  breadcrumb?: ReactNode;
};

/**
 * Photographic page header. The photograph is shown at full strength; a
 * directional navy scrim sits only behind the text column so copy stays
 * readable (white on navy-900 at >= 80% is above 7:1).
 */
export function PageHero({
  title,
  lead,
  image,
  imageAlt,
  imagePosition,
  imageZoom,
  imageOrigin,
  size = "md",
  actions,
  below,
  breadcrumb,
}: PageHeroProps) {
  const minHeight =
    size === "lg"
      ? "lg:min-h-[min(46rem,calc(100svh-var(--header-h)))]"
      : "lg:min-h-[32rem]";

  return (
    <section className={`on-dark relative isolate overflow-hidden bg-navy-900 lg:flex ${minHeight}`}>
      {/* Phones and tablets: the photograph is its own block above the text, shown clear.
          Desktop: it fills the section behind a scrim that covers only the text column. */}
      <div className={`relative overflow-hidden lg:absolute lg:inset-0 lg:-z-10 lg:h-auto ${size === "lg" ? "h-64 sm:h-96" : "h-52 sm:h-80"}`}>
        <HeroImage
          src={image}
          alt={imageAlt}
          position={imagePosition}
          zoom={imageZoom}
          origin={imageOrigin}
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-900 to-transparent lg:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-900 from-15% via-navy-900/80 via-45% to-navy-900/0 to-75% lg:block rtl:bg-gradient-to-l" />
        <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-navy-900/70 to-transparent lg:block" />
      </div>

      <div className="shell flex flex-col pb-12 pt-6 sm:pb-16 sm:pt-8 lg:justify-center lg:py-20">
        <div className="max-w-[44rem]">
          {breadcrumb ? <div className="mb-4 lg:mb-5">{breadcrumb}</div> : null}
          <h1 className={`${size === "lg" ? "t-display" : "t-h1"} text-white`}>{title}</h1>
          {lead ? <p className="t-lead mt-5 max-w-[36rem] text-on-dark-soft">{lead}</p> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
          {below ? <div className="mt-8">{below}</div> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Text-only page header on navy. Used where the page's job is a form or a
 * direct action, so the content starts inside the first screen.
 */
export function PageHeader({title, lead, actions}: {title: string; lead?: string; actions?: ReactNode}) {
  return (
    <section className="on-dark bg-navy-900 text-on-dark-soft">
      <div className="shell py-12 sm:py-14 lg:py-16">
        <div className="max-w-[44rem]">
          <h1 className="t-h1 text-white">{title}</h1>
          {lead ? <p className="t-lead mt-5 text-on-dark-soft">{lead}</p> : null}
          {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
