"use client";

import {useLocale} from "next-intl";

import {PageSkeleton} from "@/components/skeletons/PageSkeleton";
import {usePathname} from "@/i18n/navigation";
import {type Locale} from "@/i18n/routing";

export default function Loading() {
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  return <PageSkeleton locale={locale} pathname={pathname ?? "/"} />;
}
