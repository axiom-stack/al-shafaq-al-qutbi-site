"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import logoImage from "../../../public/images/ALFS_LOGO.jpeg";

export function PublicLogo() {
  const t = useTranslations("HomePage.brand");

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Image
        src={logoImage}
        alt={t("name")}
        width={180}
        height={54}
        sizes="(max-width: 640px) 124px, 180px"
        loading="eager"
        priority
        className="h-8 w-auto max-w-[124px] object-contain sm:h-9 sm:max-w-[140px] lg:max-w-[180px]"
      />
      <div className="hidden min-w-0 lg:block">
        <p className="truncate text-sm font-semibold leading-none text-alfs-navy sm:text-[0.95rem]">
          {t("name")}
        </p>
        <p className="truncate pt-1 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-alfs-orange sm:text-[0.6rem]">
          {t("tagline")}
        </p>
      </div>
    </div>
  );
}
