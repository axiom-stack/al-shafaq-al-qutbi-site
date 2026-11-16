import type {Metadata} from "next";

import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import type {IconName} from "@/components/public/PublicIcon";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicMap} from "@/components/public/PublicMap";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {CheckList, FeatureList, Tag} from "@/components/ui/Blocks";
import {ButtonLink} from "@/components/ui/Button";
import {ClosingBand} from "@/components/ui/ClosingBand";
import {PageHero} from "@/components/ui/PageHero";
import {Section} from "@/components/ui/Section";
import {serviceHeroImages} from "@/lib/service-images";
import {contactInquiryHref, siteRoutes} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CoveragePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const panelKeys = ["landCoverage", "partnerNetwork"] as const;
const regionalKeys = ["palestine", "syria", "lebanon", "gcc"] as const;
const globalKeys = ["middleEast", "asia", "europe"] as const;

export default async function CoveragePage() {
  const t = await getTranslations("CoveragePage");
  const homeT = await getTranslations("HomePage");
  const aboutT = await getTranslations("AboutPage.coverage");
  const servicesT = await getTranslations("ServicesPage.hero.coverage");

  const panels = panelKeys.map((key) => ({
    key,
    title: homeT(`regionalCoverage.panels.${key}.title`),
    description: homeT(`regionalCoverage.panels.${key}.description`),
    icon: homeT(`regionalCoverage.panels.${key}.icon`) as IconName,
  }));

  return (
    <>
      <PublicNavbar currentPage="coverage" />
      <main id="main" className="pt-[var(--header-h)]">
        <span id="top" className="sr-only" />
        <PageHero
          title={homeT("regionalCoverage.heading")}
          lead={homeT("regionalCoverage.description")}
          image={serviceHeroImages.landFreight}
          imageAlt={t("imageAlt")}
          imagePosition="60% 60%"
          actions={
            <>
              <ButtonLink href={contactInquiryHref} size="lg">
                {homeT("hero.primaryAction")}
              </ButtonLink>
              <ButtonLink href="/services" variant="onDark" size="lg">
                {homeT("hero.secondaryAction")}
              </ButtonLink>
            </>
          }
        />

        <Section tone="surface">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="t-h2 text-navy-900">{aboutT("heading")}</h2>
              <p className="t-lead mt-6 text-ink-soft">{aboutT("description")}</p>
            </div>
            <FeatureList items={panels} className="border-b border-line lg:self-start" />
          </div>
        </Section>

        <Section tone="navy">
          <div className="grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:pe-12 lg:pe-20">
              <h2 className="t-h3 border-t-2 border-orange-500 pt-5 text-white">{t("regional.heading")}</h2>
              <p className="mt-4 flex items-center gap-3 text-xl font-semibold text-white">
                <PublicIcon name="location" className="h-5 w-5 shrink-0 text-orange-500" />
                {aboutT("mapLabels.hub")}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {regionalKeys.map((key) => (
                  <li key={key}>
                    <Tag onDark>{aboutT(`mapLabels.${key}`)}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/15 pt-12 md:border-s md:border-t-0 md:ps-12 md:pt-0 lg:ps-20">
              <h2 className="t-h3 border-t-2 border-orange-500 pt-5 text-white">{servicesT("title")}</h2>
              <p className="mt-4 text-xl font-semibold text-white">{servicesT("description")}</p>
              <CheckList onDark className="mt-6" items={globalKeys.map((key) => servicesT(`regions.${key}`))} />
            </div>
          </div>
        </Section>

        <Section tone="paper">
          <div className="grid gap-6 sm:grid-cols-3">
            {[serviceHeroImages.landFreight, serviceHeroImages.seaFreight, serviceHeroImages.airFreight].map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image src={src} alt="" fill sizes="(max-width: 640px) 100vw, 400px" className="object-cover" />
              </div>
            ))}
          </div>
        </Section>

        <PublicMap />

        <ClosingBand
          title={homeT("finalCta.heading")}
          lead={homeT("finalCta.description")}
          actions={
            <>
              <ButtonLink href={contactInquiryHref} size="lg">
                {homeT("finalCta.action")}
              </ButtonLink>
              <ButtonLink href={siteRoutes.contact} variant="secondary" size="lg">
                {homeT("finalCta.secondaryAction")}
              </ButtonLink>
            </>
          }
        />
      </main>
      <PublicFooter />
    </>
  );
}
