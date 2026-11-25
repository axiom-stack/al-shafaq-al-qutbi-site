"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";

import logoImage from "../../../public/images/ALFS_LOGO.png";

export function PublicLogo() {
  const t = useTranslations("HomePage.brand");

  return (
    <Image
      src={logoImage}
      alt={t("name")}
      width={160}
      height={48}
      sizes="160px"
      loading="eager"
      priority
      className="h-9 w-auto object-contain sm:h-10 lg:h-11"
    />
  );
}
