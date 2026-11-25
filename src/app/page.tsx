import type {Metadata} from "next";

import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {HomePageAnchorScroll} from "@/components/public/HomePageAnchorScroll";
import {PublicFooter} from "@/components/public/PublicFooter";
import type {IconName} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {CheckList, FeatureList, ServiceTile} from "@/components/ui/Blocks";
import {ArrowLink, ButtonLink} from "@/components/ui/Button";
import {ClosingBand} from "@/components/ui/ClosingBand";
import {PageHero} from "@/components/ui/PageHero";
import {Section, SectionHeader} from "@/components/ui/Section";
import {serviceHeroImages} from "@/lib/service-images";
import {contactInquiryHref, serviceRoutes, siteRoutes} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

/** Same order and names as the services page and the footer. */
const serviceKeys = [
  "seaFreight",
  "landFreight",
  "airFreight",
  "consolidation",
  "warehousing",
  "customsClearance",
] as const;

const serviceMeta: Record<(typeof serviceKeys)[number], {href: string; image: string; icon: IconName}> = {
  seaFreight: {href: serviceRoutes.seaFreight, image: serviceHeroImages.seaFreight, icon: "ship"},
  landFreight: {href: serviceRoutes.landFreight, image: serviceHeroImages.landFreight, icon: "truck"},
  airFreight: {href: serviceRoutes.airFreight, image: serviceHeroImages.airFreight, icon: "plane"},
  customsClearance: {
    href: serviceRoutes.customsClearance,
    image: serviceHeroImages.customsClearance,
    icon: "customs",
  },
  warehousing: {href: serviceRoutes.warehousing, image: serviceHeroImages.warehousing, icon: "warehouse"},
  consolidation: {href: serviceRoutes.consolidation, image: serviceHeroImages.consolidation, icon: "box"},
};

const proofKeys = ["flexibleSupplyChain", "clearTracking"] as const;
const regionalPanelKeys = ["landCoverage", "partnerNetwork"] as const;

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const aboutT = await getTranslations("AboutPage");
  const coverageT = await getTranslations("CoveragePage");

  const services = serviceKeys.map((key) => ({
    key,
    title: t(`footer.services.links.${key}`),
    description: t(`services.${key}.description`),
    ...serviceMeta[key],
  }));

  const proofs = [
    {key: "feature", title: t("about.feature.title"), description: t("about.feature.description"), icon: "globe" as IconName},
    ...proofKeys.map((key) => ({
      key,
      title: t(`about.proofs.${key}.title`),
      description: t(`about.proofs.${key}.description`),
      icon: t(`about.proofs.${key}.icon`) as IconName,
    })),
  ];

  const regionalPanels = regionalPanelKeys.map((key) => ({
    key,
    title: t(`regionalCoverage.panels.${key}.title`),
    description: t(`regionalCoverage.panels.${key}.description`),
    icon: t(`regionalCoverage.panels.${key}.icon`) as IconName,
  }));

  return (
    <>
      <PublicNavbar currentPage="home" />
      <HomePageAnchorScroll />
      <main id="main" className="pt-[var(--header-h)]">
        <span id="top" className="sr-only" />
        <PageHero
          size="lg"
          title={t("hero.heading")}
          lead={t("hero.description")}
          image="/images/homepage/hero-clean.jpg"
          imageAlt={t("hero.imageAlt")}
          imagePosition="50% 60%"
          actions={
            <>
              <ButtonLink id="quote" href={contactInquiryHref} size="lg">
                {t("hero.primaryAction")}
              </ButtonLink>
              <ButtonLink href="/services" variant="onDark" size="lg">
                {t("hero.secondaryAction")}
              </ButtonLink>
            </>
          }
        />

        <Section id="services" tone="paper">
          <SectionHeader
            title={t("servicesSection.heading")}
            lead={t("servicesSection.description")}
            action={<ArrowLink href="/services">{t("servicesSection.viewAll")}</ArrowLink>}
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceTile
                key={service.key}
                href={service.href}
                title={service.title}
                description={service.description}
                image={service.image}
                imageAlt=""
                icon={service.icon}
                cta={t("servicesSection.learnMore")}
              />
            ))}
          </div>
        </Section>

        <Section id="whyAlfs" tone="surface">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div id="about">
              <h2 className="t-h2 text-navy-900">{t("about.heading")}</h2>
              <p className="t-lead mt-6 text-ink-soft">{t("about.description")}</p>
              <CheckList
                className="mt-8"
                items={[t("about.bullets.expertise"), t("about.bullets.documentation")]}
              />
              <div className="mt-10">
                <ArrowLink href="/about">{aboutT("hero.kicker")}</ArrowLink>
              </div>
            </div>
            <FeatureList items={proofs} className="border-b border-line lg:self-start" />
          </div>
        </Section>

        <Section id="coverage" tone="navy">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2 className="t-h2 text-white">{t("regionalCoverage.heading")}</h2>
              <p className="t-lead mt-6 text-on-dark-soft">{t("regionalCoverage.description")}</p>
              <FeatureList items={regionalPanels} onDark className="mt-8 border-b border-white/15" />
              <div className="mt-8">
                <ButtonLink href={siteRoutes.coverage} variant="onDark">
                  {coverageT("link")}
                </ButtonLink>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-media bg-navy-950 ring-1 ring-white/10">
              <Image
                src={serviceHeroImages.landFreight}
                alt={coverageT("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        <ClosingBand
          title={t("finalCta.heading")}
          lead={t("finalCta.description")}
          actions={
            <>
              <ButtonLink href={contactInquiryHref} size="lg">
                {t("finalCta.action")}
              </ButtonLink>
              <ButtonLink href={siteRoutes.contact} variant="secondary" size="lg">
                {t("finalCta.secondaryAction")}
              </ButtonLink>
            </>
          }
        />
      </main>
      <PublicFooter />
    </>
  );
}
