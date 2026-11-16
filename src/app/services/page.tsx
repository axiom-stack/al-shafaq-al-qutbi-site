import type {Metadata} from "next";
import type {ReactNode} from "react";

import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon, type IconName} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {FeatureList, IconWell, Steps} from "@/components/ui/Blocks";
import {ArrowLink, ButtonLink} from "@/components/ui/Button";
import {ClosingBand} from "@/components/ui/ClosingBand";
import {PageHero} from "@/components/ui/PageHero";
import {Section} from "@/components/ui/Section";
import {serviceHeroImages} from "@/lib/service-images";
import {contactInquiryHref, serviceQuoteHref, serviceRoutes, siteRoutes} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ServicesPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const journeyStepKeys = ["plan", "consolidate", "store", "transport", "track"] as const;

/** Strip the trailing colon that the old inline "Label: text" layout needed. */
function asTitle(label: string) {
  return label.replace(/\s*[:：]\s*$/, "");
}

export default async function ServicesPage() {
  const t = await getTranslations("ServicesPage");

  const journeySteps = journeyStepKeys.map((key) => ({
    key,
    title: t(`overview.journey.steps.${key}.title`),
    description: t(`overview.journey.steps.${key}.description`),
  }));

  const services: {
    id: string;
    icon: IconName;
    image: string;
    route: string;
    title: string;
    navLabel: string;
    description: string;
    detail: ReactNode;
  }[] = [
    {
      id: "sea-freight",
      icon: "ship",
      image: serviceHeroImages.seaFreight,
      route: serviceRoutes.seaFreight,
      title: t("seaFreight.heading"),
      navLabel: t("hero.chips.sea"),
      description: t("seaFreight.description"),
      detail: (
        <FeatureList
          items={[
            {title: t("seaFreight.fcl.title"), description: t("seaFreight.fcl.description")},
            {title: t("seaFreight.lcl.title"), description: t("seaFreight.lcl.description")},
          ]}
        />
      ),
    },
    {
      id: "land-freight",
      icon: "truck",
      image: serviceHeroImages.landFreight,
      route: serviceRoutes.landFreight,
      title: t("landFreight.heading"),
      navLabel: t("hero.chips.land"),
      description: t("landFreight.description"),
      detail: (
        <FeatureList
          items={(
            [
              ["ftl", "ftlText"],
              ["equipment", "equipmentText"],
              ["coverage", "coverageText"],
            ] as const
          ).map(([label, text]) => ({
            title: asTitle(t(`landFreight.bullets.${label}`)),
            description: t(`landFreight.bullets.${text}`),
          }))}
        />
      ),
    },
    {
      id: "air-freight",
      icon: "plane",
      image: serviceHeroImages.airFreight,
      route: serviceRoutes.airFreight,
      title: t("airFreight.heading"),
      navLabel: t("hero.chips.air"),
      description: t("airFreight.description"),
      detail: (
        <FeatureList
          items={[
            {title: t("airFreight.urgent.title"), description: t("airFreight.urgent.description")},
            {title: t("airFreight.delicate.title"), description: t("airFreight.delicate.description")},
          ]}
        />
      ),
    },
    {
      id: "cargo-consolidation",
      icon: "box",
      image: serviceHeroImages.consolidation,
      route: serviceRoutes.consolidation,
      title: t("consolidation.heading"),
      navLabel: t("hero.chips.consolidation"),
      description: t("consolidation.description"),
      detail: (
        <FeatureList
          items={[
            {title: t("consolidation.cost.title"), description: t("consolidation.cost.description")},
            {title: t("consolidation.network.title"), description: t("consolidation.network.description")},
          ]}
        />
      ),
    },
    {
      id: "warehousing",
      icon: "warehouse",
      image: serviceHeroImages.warehousing,
      route: serviceRoutes.warehousing,
      title: t("warehousing.heading"),
      navLabel: t("hero.chips.warehousing"),
      description: t("warehousing.description"),
      detail: (
        <FeatureList
          items={(["monitoring", "inventory", "crossDock"] as const).map((key) => ({
            title: t(`warehousing.features.${key}`),
          }))}
        />
      ),
    },
    {
      id: "customs-clearance",
      icon: "customs",
      image: serviceHeroImages.customsClearance,
      route: serviceRoutes.customsClearance,
      title: t("coreServices.cards.customsClearance.title"),
      navLabel: t("hero.chips.customs"),
      description: t("customsClearance.description"),
      detail: (
        <FeatureList
          items={(["documentation", "compliance", "faster", "smooth"] as const).map((key) => ({
            title: t(`customsClearance.features.${key}`),
          }))}
        />
      ),
    },
  ];

  return (
    <>
      <PublicNavbar currentPage="services" />
      <main id="main" className="pt-[var(--header-h)]">
        <span id="top" className="sr-only" />
        <PageHero
          title={t("hero.heading")}
          lead={t("hero.description")}
          image="/images/about/about-hero-clean.jpg"
          imageAlt={t("hero.imageAlt")}
          imagePosition="70% 50%"
          actions={
            <ButtonLink href={contactInquiryHref} size="lg">
              {t("actions.quote")}
            </ButtonLink>
          }
        />

        <nav
          id="core-services"
          aria-label={t("index.label")}
          className="sticky top-[var(--header-h)] z-30 border-b border-line bg-surface/95 backdrop-blur"
        >
          <div className="shell relative">
            <ul className="-mx-2 flex gap-1 overflow-x-auto py-2.5 pe-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {services.map((service) => (
                <li key={service.id} className="shrink-0">
                  <a
                    href={`#${service.id}`}
                    className="flex min-h-11 items-center gap-2.5 rounded-lg px-3.5 text-base font-semibold text-ink transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    <PublicIcon name={service.icon} className="h-5 w-5 text-navy-800" />
                    {service.navLabel}
                  </a>
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 end-[var(--gutter)] w-12 bg-gradient-to-l from-surface to-transparent lg:hidden rtl:bg-gradient-to-r"
            />
          </div>
        </nav>

        <Section tone="surface">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <h2 className="t-h2 text-navy-900">{t("overview.heading")}</h2>
            <div>
              <p className="t-lead text-ink-soft">{t("overview.description")}</p>
              <div className="mt-6">
                <ArrowLink href="/about">{t("overview.cta")}</ArrowLink>
              </div>
            </div>
          </div>
          <h3 className="t-h3 mt-14 text-navy-900 lg:mt-20">{t("overview.journey.title")}</h3>
          <Steps steps={journeySteps} columns={5} className="mt-8" />
        </Section>

        <div className="bg-paper">
          <div className="shell">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="grid items-start gap-8 border-t border-line py-10 first:border-t-0 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-24"
                style={{scrollMarginTop: "calc(var(--header-h) + 4.5rem)"}}
              >
                <div
                  className={`relative aspect-[16/8] overflow-hidden rounded-media bg-navy-900 sm:aspect-[16/9] lg:aspect-[16/11] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <IconWell name={service.icon} />
                    <h2 className="t-h2 text-navy-900">{service.title}</h2>
                  </div>
                  <p className="t-lead mt-5 text-ink-soft">{service.description}</p>
                  <div className="mt-6 hidden border-b border-line md:block">{service.detail}</div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:mt-8">
                    <ButtonLink href={serviceQuoteHref(service.route)} variant="navy">
                      {t("actions.quote")}
                    </ButtonLink>
                    <ArrowLink href={service.route}>{t("actions.details")}</ArrowLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <ClosingBand
          title={t("closing.heading")}
          lead={t("closing.description")}
          actions={
            <>
              <ButtonLink href={contactInquiryHref} size="lg">
                {t("closing.action")}
              </ButtonLink>
              <ButtonLink href={siteRoutes.contact} variant="secondary" size="lg">
                {t("closing.secondary")}
              </ButtonLink>
            </>
          }
        />
      </main>
      <PublicFooter />
    </>
  );
}
