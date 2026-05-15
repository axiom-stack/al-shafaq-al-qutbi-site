import type {Metadata} from "next";
import type {ComponentProps, ReactNode} from "react";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {CoreServiceCard} from "@/components/services/CoreServiceCard";
import {HeroBackdropWithSkeleton} from "@/components/public/HeroBackdropWithSkeleton";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {isRTL, type Locale} from "@/i18n/routing";
import {serviceImages} from "@/lib/service-images";
import {serviceQuoteHref, serviceRoutes, siteAnchors} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ServicesPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

type IconName = ComponentProps<typeof PublicIcon>["name"];

const quickActionKeys = ["quote", "track", "compare", "contact"] as const;
const heroChipKeys = ["sea", "land", "air", "consolidation", "warehousing"] as const;
const coverageRegionKeys = ["middleEast", "asia", "europe"] as const;
const journeyStepKeys = ["plan", "consolidate", "store", "transport", "track"] as const;
const coreServiceKeys = [
  "seaFreight",
  "landFreight",
  "airFreight",
  "consolidation",
  "warehousing",
  "customsClearance",
] as const;

const coreServiceConfig: Record<
  (typeof coreServiceKeys)[number],
  {icon: IconName; image: string; href: string}
> = {
  seaFreight: {icon: "ship", image: serviceImages.seaFreight, href: "/services/sea-freight"},
  landFreight: {icon: "truck", image: serviceImages.landFreight, href: "/services/land-freight"},
  airFreight: {icon: "plane", image: serviceImages.airFreight, href: "/services/air-freight"},
  consolidation: {icon: "box", image: serviceImages.consolidation, href: "/services/cargo-consolidation"},
  warehousing: {icon: "warehouse", image: serviceImages.warehousing, href: "/services/warehousing"},
  customsClearance: {
    icon: "customs",
    image: serviceImages.customsClearance,
    href: "/services/customs-clearance",
  },
};

const journeyIcons: Record<(typeof journeyStepKeys)[number], IconName> = {
  plan: "quote",
  consolidate: "box",
  store: "warehouse",
  transport: "truck",
  track: "pin",
};

const heroChipIcons: Record<(typeof heroChipKeys)[number], IconName> = {
  sea: "ship",
  land: "truck",
  air: "plane",
  consolidation: "box",
  warehousing: "warehouse",
};

export default async function ServicesPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("ServicesPage");

  const sideHeadingAccentClass = localeIsRTL ? "ml-auto mr-0" : "mr-auto ml-0";
  const heroOverlayClass = localeIsRTL
    ? "bg-[linear-gradient(270deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.75)_55%,rgba(13,31,92,0.2)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.75)_55%,rgba(13,31,92,0.2)_100%)]";

  const quickActions = quickActionKeys.map((key) => ({
    title: t(`quickActions.${key}.title`),
    description: t(`quickActions.${key}.description`),
    icon: t(`quickActions.${key}.icon`) as IconName,
    href: t(`quickActions.${key}.href`),
  }));

  const heroChips = heroChipKeys.map((key) => ({
    label: t(`hero.chips.${key}`),
    icon: heroChipIcons[key],
  }));

  const coverageRegions = coverageRegionKeys.map((key) => t(`hero.coverage.regions.${key}`));

  const journeySteps = journeyStepKeys.map((key, index) => ({
    key,
    title: t(`overview.journey.steps.${key}.title`),
    description: t(`overview.journey.steps.${key}.description`),
    icon: journeyIcons[key],
    active: index === 0 || index === journeyStepKeys.length - 1,
  }));

  return (
    <>
      <PublicNavbar currentPage="services" />
      <main id="top" className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-alfs-deep-blue sm:min-h-[600px] lg:min-h-[720px]">
          <HeroBackdropWithSkeleton
            src="/images/homepage/hero-image.png"
            alt={t("hero.imageAlt")}
          />
          <HeroOverlay heroOverlayClass={heroOverlayClass} />

          <div className="relative z-20 mx-auto flex w-full max-w-[1280px] flex-col items-stretch justify-between gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-16">
            <div className={`w-full min-w-0 lg:w-3/5 ${localeIsRTL ? "text-right" : "text-left"}`}>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-alfs-orange">
                {t("hero.kicker")}
              </p>
              <h1 className="mt-2 w-full max-w-[760px] text-[2.2rem] leading-[1.08] font-bold tracking-[-0.04em] text-off-white sm:text-[3rem] lg:text-[4rem]">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 w-full max-w-[670px] text-[0.98rem] leading-7 text-off-white/90 sm:text-[1.05rem]">
                {t("hero.description")}
              </p>
              <div className={`mt-7 flex flex-row flex-wrap gap-2 ${localeIsRTL ? "justify-end" : ""}`}>
                {heroChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                  >
                    <PublicIcon name={chip.icon} className="h-4 w-4 shrink-0" />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`hidden w-full lg:block lg:w-1/3 ${
                localeIsRTL ? "lg:justify-self-start" : "lg:justify-self-end"
              }`}
            >
              <CoveragePanel
                title={t("hero.coverage.title")}
                description={t("hero.coverage.description")}
                regions={coverageRegions}
                localeIsRTL={localeIsRTL}
              />
            </div>
          </div>
        </section>

        <section className="relative z-30 mx-auto -mt-12 mb-16 max-w-[1280px] px-4 sm:px-6 lg:mb-24 lg:px-8">
          <QuickActionsGrid quickActions={quickActions} />
        </section>

        <section className="border-t border-outline-variant/30 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <OverviewSection
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
            heading={t("overview.heading")}
            description={t("overview.description")}
            cta={t("overview.cta")}
            journeyTitle={t("overview.journey.title")}
            journeySteps={journeySteps}
          />
        </section>

        <section
          id="core-services"
          className="bg-surface-container-lowest px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <CoreServicesSection
            localeIsRTL={localeIsRTL}
            heading={t("coreServices.heading")}
            description={t("coreServices.description")}
            exploreLabel={t("coreServices.explore")}
            exploreCustomsLabel={t("coreServices.exploreCustoms")}
            t={t}
          />
        </section>

        <SeaFreightSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
        <LandFreightSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
        <AirFreightSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
        <ConsolidationSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
        <WarehousingSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
        <CustomsSection
          localeIsRTL={localeIsRTL}
          sideHeadingAccentClass={sideHeadingAccentClass}
          t={t}
        />
      </main>
      <PublicFooter />
    </>
  );
}

function HeroOverlay({heroOverlayClass}: {heroOverlayClass: string}) {
  return <div className={`absolute inset-0 z-10 ${heroOverlayClass}`} />;
}

function CoveragePanel({
  title,
  description,
  regions,
  localeIsRTL,
}: {
  title: string;
  description: string;
  regions: string[];
  localeIsRTL: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md">
      <h3 className={`text-[1.4rem] font-bold text-white ${localeIsRTL ? "text-right" : "text-left"}`}>
        {title}
      </h3>
      <p className={`mt-3 text-sm text-white/80 ${localeIsRTL ? "text-right" : "text-left"}`}>
        {description}
      </p>
      <ul className={`mt-5 space-y-2 ${localeIsRTL ? "text-right" : "text-left"}`}>
        {regions.map((region) => (
          <li
            key={region}
            className={`flex items-center gap-2 text-sm font-semibold text-white ${
              localeIsRTL ? "flex-row-reverse justify-end" : ""
            }`}
          >
            <PublicIcon name="check" className="h-5 w-5 text-alfs-orange" />
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickActionsGrid({
  quickActions,
}: {
  quickActions: {title: string; description: string; icon: IconName; href: string}[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {quickActions.map((action) => (
        <a
          key={action.title}
          href={action.href}
          className="group flex flex-col items-center rounded-xl border border-outline-variant bg-surface px-6 py-8 text-center shadow-[0_8px_30px_rgba(26,47,122,0.12)] transition-transform duration-300 hover:-translate-y-1"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10 text-alfs-navy transition-colors duration-300 group-hover:bg-alfs-orange group-hover:text-white">
            <PublicIcon name={action.icon} className="h-7 w-7" />
          </span>
          <h2 className="mt-4 text-[1.05rem] font-bold text-alfs-navy">{action.title}</h2>
          <p className="mt-1 text-sm text-on-surface-variant">{action.description}</p>
        </a>
      ))}
    </div>
  );
}

function OverviewSection({
  localeIsRTL,
  sideHeadingAccentClass,
  heading,
  description,
  cta,
  journeyTitle,
  journeySteps,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  heading: string;
  description: string;
  cta: string;
  journeyTitle: string;
  journeySteps: {
    key: string;
    title: string;
    description: string;
    icon: IconName;
    active: boolean;
  }[];
}) {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <div className={localeIsRTL ? "text-right" : "text-left"}>
        <h2 className="text-[1.85rem] leading-[1.15] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.35rem]">
          {heading}
        </h2>
        <span className={`mt-4 block h-[3px] w-[50px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`} />
        <p className="mt-6 text-[1rem] leading-8 text-on-surface-variant">{description}</p>
        <PageTransitionLink
          href="/about"
          className={`mt-8 inline-flex items-center gap-2 rounded-md border-2 border-alfs-navy px-6 py-2.5 text-sm font-semibold text-alfs-navy transition-colors hover:bg-alfs-navy hover:text-white ${
            localeIsRTL ? "flex-row-reverse" : ""
          }`}
        >
          {cta}
          <span aria-hidden>{localeIsRTL ? "←" : "→"}</span>
        </PageTransitionLink>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-alfs-deep-blue p-6 shadow-lg sm:p-8">
        <div
          className={`pointer-events-none absolute h-64 w-64 rounded-full bg-alfs-orange/10 blur-3xl ${
            localeIsRTL ? "-left-20 -top-20" : "-right-20 -top-20"
          }`}
        />
        <h3 className={`relative text-[1.4rem] font-bold text-white sm:text-[1.65rem] ${localeIsRTL ? "text-right" : "text-left"}`}>
          {journeyTitle}
        </h3>
        <ol
          className={`relative mt-8 space-y-6 ${
            localeIsRTL ? "mr-4 border-r-2 border-alfs-orange/30 pr-6" : "ml-4 border-l-2 border-alfs-orange/30 pl-6"
          }`}
        >
          {journeySteps.map((step) => (
            <li key={step.key} className="relative">
              <span
                className={`absolute top-1 h-4 w-4 rounded-full border-4 border-alfs-deep-blue ${
                  localeIsRTL ? "-right-[35px]" : "-left-[35px]"
                } ${step.active ? "bg-alfs-orange shadow-[0_0_10px_rgba(244,121,32,0.5)]" : "bg-surface-tint"}`}
              />
              <h4
                className={`flex items-center gap-2 text-[1rem] font-semibold text-white ${
                  localeIsRTL ? "flex-row-reverse justify-end" : ""
                }`}
              >
                <PublicIcon
                  name={step.icon}
                  className={`h-5 w-5 ${step.active ? "text-alfs-orange" : "text-surface-tint"}`}
                />
                {step.title}
              </h4>
              <p className={`mt-1 text-sm text-off-white/80 ${localeIsRTL ? "text-right" : "text-left"}`}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function CoreServicesSection({
  localeIsRTL,
  heading,
  description,
  exploreLabel,
  exploreCustomsLabel,
  t,
}: {
  localeIsRTL: boolean;
  heading: string;
  description: string;
  exploreLabel: string;
  exploreCustomsLabel: string;
  t: Awaited<ReturnType<typeof getTranslations<"ServicesPage">>>;
}) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="text-center">
        <h2 className="text-[1.85rem] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.35rem]">
          {heading}
        </h2>
        <span className="mx-auto mt-4 block h-[3px] w-[50px] rounded-full bg-alfs-orange" />
        <p className="mx-auto mt-5 w-full max-w-[760px] text-[1rem] leading-7 text-on-surface-variant">{description}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
        {coreServiceKeys.map((key) => {
          const config = coreServiceConfig[key];
          const card = t.raw(`coreServices.cards.${key}`) as {
            title: string;
            description: string;
            imageAlt: string;
            badges?: string[];
          };

          return (
            <CoreServiceCard
              key={key}
              imageSrc={config.image}
              imageAlt={card.imageAlt}
              badges={card.badges}
              title={card.title}
              icon={config.icon}
              description={card.description}
              exploreLabel={key === "customsClearance" ? exploreCustomsLabel : exploreLabel}
              href={config.href}
              localeIsRTL={localeIsRTL}
            />
          );
        })}
      </div>
    </div>
  );
}

type SectionT = Awaited<ReturnType<typeof getTranslations<"ServicesPage">>>;

function ServiceImage({
  src,
  alt,
  dark = false,
  className = "h-[380px] sm:h-[500px]",
}: {
  src: string;
  alt: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <ServiceImageBlock src={src} alt={alt} dark={dark} className={className} />
  );
}

function ServiceImageBlock({
  src,
  alt,
  dark,
  className,
}: {
  src: string;
  alt: string;
  dark: boolean;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-lg ${className} ${
        dark ? "border border-white/10 shadow-2xl" : ""
      }`}
    >
      <Image src={src} alt={alt} fill className="bg-[#1a2f7a] object-contain" sizes="(max-width: 1024px) 100vw, 50vw" />
      {dark ? (
        <DarkImageOverlay />
      ) : (
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10" />
      )}
    </div>
  );
}

function DarkImageOverlay() {
  return <div className="absolute inset-0 bg-alfs-deep-blue/20 mix-blend-overlay" />;
}

function SectionHeader({
  kicker,
  heading,
  description,
  icon,
  localeIsRTL,
  sideHeadingAccentClass,
  dark = false,
}: {
  kicker: string;
  heading: string;
  description: string;
  icon: IconName;
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  dark?: boolean;
}) {
  return (
    <>
      <div className={`mb-4 flex items-center gap-3 ${localeIsRTL ? "flex-row-reverse justify-end" : ""}`}>
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            dark ? "border border-white/20 bg-white/10 text-alfs-orange" : "bg-primary-container/10 text-alfs-navy"
          }`}
        >
          <PublicIcon name={icon} className="h-6 w-6" />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-alfs-orange">{kicker}</span>
      </div>
      <h2
        className={`text-[1.85rem] font-bold tracking-[-0.04em] sm:text-[2.35rem] ${
          dark ? "text-white" : "text-alfs-navy"
        }`}
      >
        {heading}
      </h2>
      <span className={`mt-4 block h-[3px] w-[50px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`} />
      <p className={`mt-6 text-[1rem] leading-8 ${dark ? "text-off-white/90" : "text-on-surface-variant"}`}>
        {description}
      </p>
    </>
  );
}

function ServiceSectionShell({
  id,
  bgClassName,
  dark = false,
  localeIsRTL,
  imageFirst,
  image,
  content,
}: {
  id: string;
  bgClassName: string;
  dark?: boolean;
  localeIsRTL: boolean;
  imageFirst: boolean;
  image: ReactNode;
  content: ReactNode;
}) {
  const imageOrder = imageFirst
    ? localeIsRTL
      ? "order-1 lg:order-2"
      : "order-1"
    : localeIsRTL
      ? "order-1"
      : "order-1 lg:order-2";
  const contentOrder = imageFirst
    ? localeIsRTL
      ? "order-2 lg:order-1"
      : "order-2"
    : localeIsRTL
      ? "order-2"
      : "order-2 lg:order-1";

  return (
    <section
      id={id}
      className={`border-t border-outline-variant/30 px-4 py-16 sm:px-6 lg:min-h-[800px] lg:px-8 lg:py-24 ${bgClassName} ${
        dark ? "text-white" : ""
      } lg:flex lg:items-center`}
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className={imageOrder}>{image}</div>
        <div className={`${contentOrder} ${localeIsRTL ? "text-right" : "text-left"}`}>{content}</div>
      </div>
    </section>
  );
}


function FeatureBox({
  icon,
  title,
  description,
  localeIsRTL,
  dark = false,
}: {
  icon: IconName;
  title: string;
  description: string;
  localeIsRTL: boolean;
  dark?: boolean;
}) {
  return (
    <article
      className={`flex gap-4 rounded-lg p-4 ${
        dark
          ? "border border-white/10 bg-white/5 backdrop-blur-sm"
          : "border border-outline-variant bg-surface shadow-sm"
      } ${localeIsRTL ? "flex-row-reverse text-right" : ""}`}
    >
      <PublicIcon name={icon} className="mt-1 h-5 w-5 shrink-0 text-alfs-orange" />
      <div>
        <h4 className={`text-sm font-semibold ${dark ? "text-white" : "text-alfs-navy"}`}>{title}</h4>
        <p className={`mt-1 text-sm ${dark ? "text-off-white/80" : "text-on-surface-variant"}`}>{description}</p>
      </div>
    </article>
  );
}

function SeaFreightSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  return (
    <ServiceSectionShell
      id="sea-freight"
      bgClassName="bg-[#fbf8ff]"
      localeIsRTL={localeIsRTL}
      imageFirst={!localeIsRTL}
      image={<ServiceImage src={serviceImages.seaFreight} alt={t("seaFreight.imageAlt")} />}
      content={
        <>
          <SectionHeader
            kicker={t("seaFreight.kicker")}
            heading={t("seaFreight.heading")}
            description={t("seaFreight.description")}
            icon="ship"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FeatureBox
              icon="box"
              title={t("seaFreight.fcl.title")}
              description={t("seaFreight.fcl.description")}
              localeIsRTL={localeIsRTL}
            />
            <FeatureBox
              icon="layers"
              title={t("seaFreight.lcl.title")}
              description={t("seaFreight.lcl.description")}
              localeIsRTL={localeIsRTL}
            />
          </div>
          <div className={`mt-8 flex flex-wrap gap-4 ${localeIsRTL ? "justify-end" : ""}`}>
            <PageTransitionLink
              href={serviceQuoteHref(serviceRoutes.seaFreight)}
              className="rounded-md bg-alfs-orange px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-alfs-amber"
            >
              {t("seaFreight.primaryCta")}
            </PageTransitionLink>
            <PageTransitionLink
              href={siteAnchors.coverage}
              className="rounded-md border-2 border-alfs-navy px-6 py-2.5 text-sm font-semibold text-alfs-navy transition-colors hover:bg-alfs-navy hover:text-white"
            >
              {t("seaFreight.secondaryCta")}
            </PageTransitionLink>
          </div>
        </>
      }
    />
  );
}

function LandFreightSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  return (
    <ServiceSectionShell
      id="land-freight"
      bgClassName="bg-surface-container-lowest"
      localeIsRTL={localeIsRTL}
      imageFirst={localeIsRTL}
      image={<ServiceImage src={serviceImages.landFreight} alt={t("landFreight.imageAlt")} />}
      content={
        <>
          <SectionHeader
            kicker={t("landFreight.kicker")}
            heading={t("landFreight.heading")}
            description={t("landFreight.description")}
            icon="truck"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
          <ul className="mt-8 space-y-4">
            {(
              [
                ["ftl", "ftlText"],
                ["equipment", "equipmentText"],
                ["coverage", "coverageText"],
              ] as const
            ).map(([labelKey, textKey]) => (
              <li
                key={labelKey}
                className={`flex items-start gap-2 ${localeIsRTL ? "flex-row-reverse text-right" : ""}`}
              >
                <PublicIcon name="check" className="mt-1 h-5 w-5 shrink-0 text-alfs-orange" />
                <LandBullet labelKey={labelKey} textKey={textKey} t={t} />
              </li>
            ))}
          </ul>
          <PageTransitionLink
            href={serviceQuoteHref(serviceRoutes.landFreight)}
            className={`mt-8 inline-flex rounded-md bg-alfs-orange px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-alfs-amber ${
              localeIsRTL ? "float-left" : ""
            }`}
          >
            {t("landFreight.cta")}
          </PageTransitionLink>
        </>
      }
    />
  );
}

function LandBullet({
  labelKey,
  textKey,
  t,
}: {
  labelKey: "ftl" | "equipment" | "coverage";
  textKey: "ftlText" | "equipmentText" | "coverageText";
  t: SectionT;
}) {
  return (
    <div>
      <strong className="font-semibold text-alfs-navy">{t(`landFreight.bullets.${labelKey}`)}</strong>{" "}
      <span className="text-sm text-on-surface-variant">{t(`landFreight.bullets.${textKey}`)}</span>
    </div>
  );
}

function AirFreightSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  return (
    <ServiceSectionShell
      id="air-freight"
      bgClassName="bg-alfs-deep-blue"
      dark
      localeIsRTL={localeIsRTL}
      imageFirst={!localeIsRTL}
      image={<ServiceImage src={serviceImages.airFreight} alt={t("airFreight.imageAlt")} dark />}
      content={
        <>
          <SectionHeader
            kicker={t("airFreight.kicker")}
            heading={t("airFreight.heading")}
            description={t("airFreight.description")}
            icon="plane"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
            dark
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FeatureBox
              icon="spark"
              title={t("airFreight.urgent.title")}
              description={t("airFreight.urgent.description")}
              localeIsRTL={localeIsRTL}
              dark
            />
            <FeatureBox
              icon="spark"
              title={t("airFreight.delicate.title")}
              description={t("airFreight.delicate.description")}
              localeIsRTL={localeIsRTL}
              dark
            />
          </div>
          <div className={`mt-8 flex flex-wrap gap-4 ${localeIsRTL ? "justify-end" : ""}`}>
            <PageTransitionLink
              href={serviceQuoteHref(serviceRoutes.airFreight)}
              className="rounded-md bg-alfs-orange px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-alfs-amber"
            >
              {t("airFreight.primaryCta")}
            </PageTransitionLink>
            <PageTransitionLink
              href={siteAnchors.coverage}
              className="rounded-md border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-alfs-navy"
            >
              {t("airFreight.secondaryCta")}
            </PageTransitionLink>
          </div>
        </>
      }
    />
  );
}

function ConsolidationSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  return (
    <ServiceSectionShell
      id="cargo-consolidation"
      bgClassName="bg-surface-container-lowest"
      localeIsRTL={localeIsRTL}
      imageFirst={localeIsRTL}
      image={
        <ServiceImage
          src={serviceImages.consolidation}
          alt={t("consolidation.imageAlt")}
          className="h-[380px] sm:h-[450px]"
        />
      }
      content={
        <>
          <SectionHeader
            kicker={t("consolidation.kicker")}
            heading={t("consolidation.heading")}
            description={t("consolidation.description")}
            icon="box"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
          <div className={`mt-8 space-y-6 ${localeIsRTL ? "text-right" : "text-left"}`}>
            <BenefitRow
              icon="flex"
              title={t("consolidation.cost.title")}
              description={t("consolidation.cost.description")}
              localeIsRTL={localeIsRTL}
            />
            <BenefitRow
              icon="globe"
              title={t("consolidation.network.title")}
              description={t("consolidation.network.description")}
              localeIsRTL={localeIsRTL}
            />
          </div>
        </>
      }
    />
  );
}

function BenefitRow({
  icon,
  title,
  description,
  localeIsRTL,
}: {
  icon: IconName;
  title: string;
  description: string;
  localeIsRTL: boolean;
}) {
  return (
    <div className={`flex gap-4 ${localeIsRTL ? "flex-row-reverse" : ""}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-alfs-orange/10 text-alfs-orange">
        <PublicIcon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <h4 className="font-semibold text-alfs-navy">{title}</h4>
        <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
      </div>
    </div>
  );
}

function WarehousingSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  const featureKeys = ["monitoring", "inventory", "crossDock"] as const;
  const icons: Record<(typeof featureKeys)[number], IconName> = {
    monitoring: "shield",
    inventory: "quote",
    crossDock: "route",
  };

  return (
    <ServiceSectionShell
      id="warehousing"
      bgClassName="bg-[#fbf8ff]"
      localeIsRTL={localeIsRTL}
      imageFirst={!localeIsRTL}
      image={
        <ServiceImage
          src={serviceImages.warehousing}
          alt={t("warehousing.imageAlt")}
          className="h-[380px] sm:h-[450px]"
        />
      }
      content={
        <>
          <SectionHeader
            kicker={t("warehousing.kicker")}
            heading={t("warehousing.heading")}
            description={t("warehousing.description")}
            icon="warehouse"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
          <ul className="mt-8 space-y-4">
            {featureKeys.map((key) => (
              <li
                key={key}
                className={`flex items-center gap-2 ${localeIsRTL ? "flex-row-reverse justify-end" : ""}`}
              >
                <PublicIcon name={icons[key]} className="h-5 w-5 text-alfs-orange" />
                <span className="text-on-surface-variant">{t(`warehousing.features.${key}`)}</span>
              </li>
            ))}
          </ul>
          <PageTransitionLink
            href={serviceQuoteHref(serviceRoutes.warehousing)}
            className={`mt-8 inline-flex rounded-md border-2 border-alfs-navy px-6 py-2.5 text-sm font-semibold text-alfs-navy transition-colors hover:bg-alfs-navy hover:text-white ${
              localeIsRTL ? "float-left" : ""
            }`}
          >
            {t("warehousing.cta")}
          </PageTransitionLink>
        </>
      }
    />
  );
}

function CustomsSection({
  localeIsRTL,
  sideHeadingAccentClass,
  t,
}: {
  localeIsRTL: boolean;
  sideHeadingAccentClass: string;
  t: SectionT;
}) {
  const featureKeys = ["documentation", "compliance", "faster", "smooth"] as const;

  return (
    <ServiceSectionShell
      id="customs-clearance"
      bgClassName="bg-surface-container-lowest"
      localeIsRTL={localeIsRTL}
      imageFirst={localeIsRTL}
      image={<ServiceImage src={serviceImages.customsClearance} alt={t("customsClearance.imageAlt")} />}
      content={
        <>
          <SectionHeader
            kicker={t("customsClearance.kicker")}
            heading={t("customsClearance.heading")}
            description={t("customsClearance.description")}
            icon="customs"
            localeIsRTL={localeIsRTL}
            sideHeadingAccentClass={sideHeadingAccentClass}
          />
          <ul className="mt-8 space-y-4">
            {featureKeys.map((key) => (
              <li
                key={key}
                className={`flex items-center gap-2 ${localeIsRTL ? "flex-row-reverse justify-end" : ""}`}
              >
                <PublicIcon name="check" className="h-5 w-5 text-alfs-orange" />
                <span className="text-on-surface-variant">{t(`customsClearance.features.${key}`)}</span>
              </li>
            ))}
          </ul>
        </>
      }
    />
  );
}
