import Image from "next/image";
import type {ComponentProps} from "react";

import {PublicIcon} from "@/components/public/PublicIcon";

type IconName = ComponentProps<typeof PublicIcon>["name"];

type CoreServiceCardProps = {
  imageSrc: string;
  imageAlt: string;
  badges?: string[];
  title: string;
  icon: IconName;
  description: string;
  exploreLabel: string;
  href: string;
  localeIsRTL: boolean;
};

export function CoreServiceCard({
  imageSrc,
  imageAlt,
  badges,
  title,
  icon,
  description,
  exploreLabel,
  href,
  localeIsRTL,
}: CoreServiceCardProps) {
  return (
    <a
      href={href}
      className="group relative block h-full min-h-[260px] cursor-pointer overflow-hidden rounded-xl border border-outline-variant shadow-lg"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="bg-[#1a2f7a] object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-alfs-deep-blue via-alfs-deep-blue/60 to-transparent" />
      <CardContent
        badges={badges}
        title={title}
        icon={icon}
        description={description}
        exploreLabel={exploreLabel}
        localeIsRTL={localeIsRTL}
      />
    </a>
  );
}

function CardContent({
  badges,
  title,
  icon,
  description,
  exploreLabel,
  localeIsRTL,
}: Pick<
  CoreServiceCardProps,
  "badges" | "title" | "icon" | "description" | "exploreLabel" | "localeIsRTL"
>) {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full p-5 sm:p-6 ${localeIsRTL ? "text-right" : "text-left"}`}
    >
      {badges && badges.length > 0 ? (
        <div className={`mb-2 flex flex-wrap gap-2 ${localeIsRTL ? "justify-end" : ""}`}>
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded bg-alfs-orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:text-xs"
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}
      <h3 className="text-[1.35rem] font-bold leading-snug text-white sm:text-[1.55rem]">
        <span
          className={`inline-flex max-w-full items-center gap-2 ${
            localeIsRTL ? "flex-row-reverse" : ""
          }`}
        >
          <PublicIcon name={icon} className="h-6 w-6 shrink-0" />
          <span className="min-w-0 whitespace-normal">{title}</span>
        </span>
      </h3>
      <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-24">
        <p className="mt-2 text-sm leading-5 text-off-white/90">{description}</p>
      </div>
      <div
        className={`mt-4 flex items-center text-sm font-semibold text-alfs-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          localeIsRTL ? "flex-row-reverse justify-end" : ""
        }`}
      >
        <span className="whitespace-nowrap">{exploreLabel}</span>
        <span aria-hidden className={localeIsRTL ? "mr-1" : "ml-1"}>
          {localeIsRTL ? "←" : "→"}
        </span>
      </div>
    </div>
  );
}
