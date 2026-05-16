"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import logoImage from "../../../public/images/ALFS_LOGO.png";

export function PublicLogo() {
  const t = useTranslations("HomePage.brand");

  return (
    <div className="flex min-w-0 items-center">
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
    </div>
  );
}
