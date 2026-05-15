import type {Metadata} from "next";

import {getTranslations} from "next-intl/server";

import {getServiceConfig, type ServiceSlug} from "@/lib/service-pages";

export async function generateServiceMetadata(slug: ServiceSlug): Promise<Metadata> {
  const config = getServiceConfig(slug);
  const t = await getTranslations(config.translationNamespace);

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}
