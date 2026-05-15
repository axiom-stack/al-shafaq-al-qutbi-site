import type {Metadata} from "next";
import type {ComponentProps} from "react";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {isRTL, type Locale} from "@/i18n/routing";
import {serviceImages} from "@/lib/service-images";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AirFreightPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

type IconName = ComponentProps<typeof PublicIcon>["name"];

const handleKeys = [
  "express",
  "commercial",
  "timeSensitive",
  "importExport",
  "airportToDoor",
  "documentation",
] as const;

const benefitKeys = [
  "fasterDelivery",
  "globalNetwork",
  "secureHandling",
  "customsCoordination",
  "flexibleOptions",
  "businessSupport",
] as const;

const processStepKeys = ["quote", "assessment", "coordination", "delivery"] as const;

const handleIcons: Record<(typeof handleKeys)[number], IconName> = {
  express: "speed",
  commercial: "box",
  timeSensitive: "spark",
  importExport: "globe",
  airportToDoor: "route",
  documentation: "quote",
};

const benefitIcons: Record<(typeof benefitKeys)[number], IconName> = {
  fasterDelivery: "speed",
  globalNetwork: "globe",
  secureHandling: "shield",
  customsCoordination: "customs",
  flexibleOptions: "flex",
  businessSupport: "support",
};

const processIcons: Record<(typeof processStepKeys)[number], IconName> = {
  quote: "quote",
  assessment: "search",
  coordination: "plane",
  delivery: "check",
};

export default async function AirFreightPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("AirFreightPage");

  const sideHeadingAccentClass = localeIsRTL ? "ml-auto mr-0" : "mr-auto ml-0";
  const ctaGlowSideClass = localeIsRTL
    ? "left-0 bg-[linear-gradient(90deg,rgba(26,47,122,0.70)_0%,rgba(26,47,122,0)_100%)]"
    : "right-0 bg-[linear-gradient(270deg,rgba(26,47,122,0.70)_0%,rgba(26,47,122,0)_100%)]";

  const handleItems = handleKeys.map((key) => ({
    key,
    title: t(`handle.items.${key}.title`),
    description: t(`handle.items.${key}.description`),
    icon: handleIcons[key],
  }));

  const benefitItems = benefitKeys.map((key) => ({
    key,
    title: t(`benefits.items.${key}.title`),
    description: t(`benefits.items.${key}.description`),
    icon: benefitIcons[key],
  }));

  const processSteps = processStepKeys.map((key, index) => ({
    key,
    step: index + 1,
    title: t(`process.steps.${key}.title`),
    description: t(`process.steps.${key}.description`),
    icon: processIcons[key],
  }));

  return (
    <>
      <PublicNavbar currentPage="services" />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <DotPattern />
          <HeroGlow localeIsRTL={localeIsRTL} />

          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className={`lg:col-span-7 ${localeIsRTL ? "text-right" : "text-left"}`}>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-alfs-orange">
                {t("hero.kicker")}
              </p>
              <h1 className="mt-3 max-w-[640px] text-[2.35rem] leading-[1.05] font-bold tracking-[-0.05em] text-white sm:text-[3.2rem] lg:text-[3.75rem]">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 max-w-[580px] text-[0.98rem] leading-7 text-white/88 sm:text-[1.02rem]">
                {t("hero.subtitle")}
              </p>

              <div
                className={`mt-8 flex flex-col gap-3 sm:flex-row ${localeIsRTL ? "sm:justify-end" : ""}`}
              >
                <a
                  href="/#final-cta"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryCta")}
                </a>
                <a
                  href="/#contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t("hero.secondaryCta")}
                </a>
              </div>
            </div>

            <div
              className={`lg:col-span-5 ${
                localeIsRTL ? "lg:justify-self-start" : "lg:justify-self-end"
              }`}
            >
              <div className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/15 bg-[#1a2f7a] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                <HeroImageFrame>
                  <Image
                    src={serviceImages.airFreight}
                    alt={t("hero.imageAlt")}
                    fill
                    priority
                    className="object-contain object-center p-4 sm:p-6"
                    sizes="(max-width: 1024px) 90vw, 480px"
                  />
                </HeroImageFrame>
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <PublicIcon name="plane" className="h-3.5 w-3.5 text-alfs-orange" />
                    {t("hero.badgeExpress")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <PublicIcon name="globe" className="h-3.5 w-3.5 text-alfs-orange" />
                    {t("hero.badgeGlobal")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.4fr] lg:items-start">
            <div className={`max-w-[640px] ${localeIsRTL ? "text-right" : "text-left"}`}>
              <h2 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("overview.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <p className="mt-6 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("overview.description")}
              </p>
            </div>
            <OverviewBackLink localeIsRTL={localeIsRTL} label={t("overview.backToServices")} />
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("handle.heading")}
              </h2>
              <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mx-auto mt-5 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("handle.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {handleItems.map((item) => (
                <article
                  key={item.key}
                  className={`rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 shadow-[0_12px_28px_rgba(26,47,122,0.10)] ${
                    localeIsRTL ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full bg-alfs-orange/10 text-alfs-orange ${
                      localeIsRTL ? "mr-auto" : ""
                    }`}
                  >
                    <PublicIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-alfs-navy">{item.title}</h3>
                  <p className="mt-2 text-[0.84rem] leading-6 text-on-surface-variant">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className={`max-w-[560px] ${localeIsRTL ? "text-right" : "text-left"}`}>
              <h2 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("benefits.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <p className="mt-6 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("benefits.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {benefitItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex gap-4 rounded-[12px] border border-[#ebe8f3] bg-[#fbf8ff] px-5 py-5 ${
                    localeIsRTL ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-alfs-orange/10 text-alfs-orange">
                    <PublicIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-[0.98rem] font-semibold text-alfs-navy">{item.title}</h3>
                    <p className="mt-1.5 text-[0.84rem] leading-6 text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <DotPattern />
          <div className="relative mx-auto max-w-[1280px]">
            <ProcessSectionHeader heading={t("process.heading")} />

            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <li
                  key={step.key}
                  className={`relative rounded-[12px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm ${
                    localeIsRTL ? "text-right" : "text-left"
                  }`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-alfs-orange text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <div
                    className={`mt-4 flex items-center gap-2 ${
                      localeIsRTL ? "flex-row-reverse justify-end" : ""
                    }`}
                  >
                    <PublicIcon name={step.icon} className="h-5 w-5 text-alfs-orange" />
                    <h3 className="text-[1rem] font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-[0.84rem] leading-6 text-off-white/80">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="final-cta"
          className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20"
        >
          <DotPattern />
          <div className={`absolute inset-y-0 w-1/2 ${ctaGlowSideClass}`} />
          <div className="relative mx-auto max-w-[760px]">
            <h2 className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-white sm:text-[2.5rem]">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-5 max-w-[580px] text-[0.98rem] leading-7 text-white/84">
              {t("cta.description")}
            </p>
            <a
              href="/#final-cta"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
            >
              {t("cta.primaryAction")}
            </a>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}

function DotPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
  );
}

function HeroGlow({localeIsRTL}: {localeIsRTL: boolean}) {
  return (
    <div
      className={`pointer-events-none absolute top-0 h-72 w-72 rounded-full bg-alfs-orange/15 blur-3xl ${
        localeIsRTL ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4"
      }`}
    />
  );
}

function HeroImageFrame({children}: {children: React.ReactNode}) {
  return <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">{children}</div>;
}

function OverviewBackLink({localeIsRTL, label}: {localeIsRTL: boolean; label: string}) {
  return (
    <div className={`${localeIsRTL ? "text-right lg:text-left" : "text-left lg:text-right"}`}>
      <PageTransitionLink
        href="/services"
        className={`inline-flex items-center gap-2 text-sm font-semibold text-alfs-navy transition-colors hover:text-alfs-orange ${
          localeIsRTL ? "flex-row-reverse" : ""
        }`}
      >
        <span aria-hidden>{localeIsRTL ? "→" : "←"}</span>
        {label}
      </PageTransitionLink>
    </div>
  );
}

function ProcessSectionHeader({heading}: {heading: string}) {
  return (
    <div className="mx-auto max-w-[680px] text-center">
      <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-white sm:text-[2.45rem]">
        {heading}
      </h2>
      <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
    </div>
  );
}
