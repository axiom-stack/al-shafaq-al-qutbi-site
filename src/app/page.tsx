import type {Metadata} from "next";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {HeroBackdropWithSkeleton} from "@/components/public/HeroBackdropWithSkeleton";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {isRTL, type Locale} from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const quickActionKeys = ["track", "quote", "services", "contact"] as const;
const serviceKeys = [
  "seaFreight",
  "landFreight",
  "airFreight",
  "customsClearance",
  "warehousing",
  "consolidation",
] as const;
const heroChipKeys = ["seaFreight", "landFreight", "airFreight", "customs"] as const;
const supportStepKeys = ["consultation", "plan", "execution"] as const;
const proofKeys = ["flexibleSupplyChain", "clearTracking"] as const;
const regionalPanelKeys = ["landCoverage", "partnerNetwork"] as const;

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("HomePage");
  const services = serviceKeys.map((key) => ({
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
    icon: t(`services.${key}.icon`),
  }));
  const quickActions = quickActionKeys.map((key) => ({
    title: t(`quickAccess.${key}.title`),
    description: t(`quickAccess.${key}.description`),
    icon: t(`quickAccess.${key}.icon`),
    href: t(`quickAccess.${key}.href`),
  }));
  const heroChips = heroChipKeys.map((key) => t(`hero.chips.${key}`));
  const supportSteps = supportStepKeys.map((key, index) => ({
    title: t(`hero.support.${key}.title`),
    description: t(`hero.support.${key}.description`),
    index: index + 1,
  }));
  const proofs = proofKeys.map((key) => ({
    title: t(`about.proofs.${key}.title`),
    description: t(`about.proofs.${key}.description`),
    icon: t(`about.proofs.${key}.icon`),
  }));
  const regionalPanels = regionalPanelKeys.map((key) => ({
    title: t(`regionalCoverage.panels.${key}.title`),
    description: t(`regionalCoverage.panels.${key}.description`),
    icon: t(`regionalCoverage.panels.${key}.icon`),
    accent: t(`regionalCoverage.panels.${key}.accent`),
  }));
  const sideHeadingAccentClass = localeIsRTL ? "ml-auto mr-0" : "mr-auto ml-0";
  const aboutFeatureGlowClass = localeIsRTL ? "-left-4 -top-4" : "-right-4 -top-4";
  return (
    <>
      <PublicNavbar currentPage="home" />
      <main id="top" className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 pb-24 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-0">
          <HeroBackdropWithSkeleton
            src="/images/homepage/hero-image.png"
            alt={t("hero.imageAlt")}
          />

          <div className="relative mx-auto grid w-full max-w-[1360px] gap-10 lg:grid-cols-12 lg:items-center">
            <div className={`lg:col-span-8 lg:py-10 ${localeIsRTL ? "text-right" : "text-left"}`}>
              <h1 className="max-w-[760px] text-[2.7rem] leading-[1.1] font-bold tracking-[-0.045em] text-white sm:text-[3.75rem] lg:text-[4.25rem]">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 max-w-[670px] text-[1.08rem] leading-8 text-white/84 sm:text-[1.14rem]">
                {t("hero.description")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  id="quote"
                  href="#final-cta"
                  className="rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryAction")}
                </a>
                <a
                  href="#services"
                  className="rounded-md border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  {t("hero.secondaryAction")}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {heroChips.map((chip, index) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/22 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm"
                  >
                    <PublicIcon
                      name={
                        index === 0
                          ? "ship"
                          : index === 1
                            ? "truck"
                            : index === 2
                              ? "plane"
                              : "customs"
                      }
                      className="h-3.5 w-3.5"
                    />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`hidden lg:col-span-4 lg:flex ${
                localeIsRTL ? "lg:justify-start" : "lg:justify-end"
              }`}
            >
              <div className="w-full max-w-[344px] rounded-2xl border border-white/18 bg-white/10 p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
                <div
                  className={`mb-5 flex items-center gap-2 text-alfs-orange ${
                    localeIsRTL ? "justify-start text-right" : "justify-start text-left"
                  }`}
                >
                  <PublicIcon name="support" className="h-5 w-5" />
                  <h2 className="text-lg font-bold">{t("hero.support.title")}</h2>
                </div>
                <ul className="space-y-4">
                  {supportSteps.map((step) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-alfs-orange/18 text-[11px] font-bold text-alfs-orange">
                        {step.index}
                      </span>
                      <div className={localeIsRTL ? "text-right" : "text-left"}>
                        <p className="text-sm font-semibold text-white">{step.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-white/76">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section
          id="track"
          className="relative z-10 -mt-9 mb-12 px-4 sm:px-6 lg:px-8"
        >
          <div className="mx-auto grid w-full max-w-[1360px] gap-2.5 md:grid-cols-2 lg:grid-cols-12">
            {quickActions.map((action) => (
              <a
                key={action.title}
                href={action.href}
                className="rounded-xl border border-[#e1deec] bg-[#fbf8ff] px-5 py-6 text-center shadow-[0_8px_24px_rgba(26,47,122,0.12)] transition-transform hover:-translate-y-1 md:col-span-1 lg:col-span-3"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-alfs-navy/8 text-alfs-navy">
                  <PublicIcon
                    name={action.icon as Parameters<typeof PublicIcon>[0]["name"]}
                    className="h-5 w-5"
                  />
                </span>
                <h2 className="mt-4 text-[0.92rem] font-semibold text-alfs-navy">
                  {action.title}
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                  {action.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section id="whyAlfs" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div id="about" className={`max-w-[560px] ${localeIsRTL ? "text-right" : "text-left"}`}>
              <h2 className="relative text-[2.05rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("about.heading")}
                <span
                  className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
                />
              </h2>
              <p className="mt-6 text-[0.98rem] leading-8 text-on-surface-variant">
                {t("about.description")}
              </p>

              <ul className="mt-7 space-y-3">
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-alfs-orange text-white">
                    <PublicIcon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium text-on-surface">
                    {t("about.bullets.expertise")}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-alfs-orange text-white">
                    <PublicIcon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium text-on-surface">
                    {t("about.bullets.documentation")}
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl bg-alfs-deep-blue p-7 text-white shadow-[0_8px_24px_rgba(26,47,122,0.12)] md:col-span-2">
                <div className={`absolute h-28 w-28 rounded-full bg-alfs-royal-blue/55 blur-2xl ${aboutFeatureGlowClass}`} />
                <div className={`relative ${localeIsRTL ? "text-right" : "text-left"}`}>
                  <PublicIcon name="globe" className="h-8 w-8 text-alfs-orange" />
                  <h3 className="mt-4 text-[1.25rem] font-bold">{t("about.feature.title")}</h3>
                  <p className="mt-2 max-w-[410px] text-sm leading-6 text-white/78">
                    {t("about.feature.description")}
                  </p>
                </div>
              </article>

              {proofs.map((proof) => (
                <article
                  key={proof.title}
                  className={`rounded-2xl border border-outline-variant/40 bg-white p-6 shadow-sm ${localeIsRTL ? "text-right" : "text-left"}`}
                >
                  <PublicIcon
                    name={proof.icon as Parameters<typeof PublicIcon>[0]["name"]}
                    className="h-7 w-7 text-alfs-navy"
                  />
                  <h3 className="mt-4 text-[0.94rem] font-semibold text-alfs-navy">
                    {proof.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                    {proof.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="bg-[#f2eff8] px-4 py-[4.5rem] sm:px-6 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center">
              <h2 className="inline-block text-[2.2rem] font-bold tracking-[-0.04em] text-alfs-navy">
                {t("servicesSection.heading")}
                <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("servicesSection.description")}
              </p>
            </div>

            <div className="mt-11 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.title}
                  className={`overflow-hidden rounded-2xl border border-outline-variant/20 bg-white shadow-[0_4px_16px_rgba(26,47,122,0.08)] transition-shadow hover:shadow-[0_8px_24px_rgba(26,47,122,0.15)] ${localeIsRTL ? "text-right" : "text-left"}`}
                >
                  <div className="h-1.5 w-full bg-light-grey" />
                  <div className="p-7">
                    <PublicIcon
                      name={service.icon as Parameters<typeof PublicIcon>[0]["name"]}
                      className="h-8 w-8 text-alfs-navy"
                    />
                    <h3 className="mt-5 text-[1.3rem] font-bold text-alfs-navy">
                      {service.title}
                    </h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-on-surface-variant">
                      {service.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-alfs-orange">
                      {t("servicesSection.learnMore")}
                      <span aria-hidden="true">{localeIsRTL ? "←" : "→"}</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="coverage"
          className="relative overflow-hidden bg-alfs-deep-blue px-4 pt-12 pb-12 text-white sm:px-6 sm:pt-14 sm:pb-16 lg:px-8 lg:py-20"
        >
          <div className="absolute inset-0 opacity-42">
            <Image
              src="/images/homepage/regional-core.png"
              alt={t("regionalCoverage.imageAlt")}
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className={`absolute inset-0 ${
                localeIsRTL
                  ? "bg-[linear-gradient(180deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.72)_45%,rgba(13,31,92,0.9)_100%)] lg:bg-[linear-gradient(270deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.56)_42%,rgba(13,31,92,0.88)_100%)]"
                  : "bg-[linear-gradient(180deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.72)_45%,rgba(13,31,92,0.9)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.56)_42%,rgba(13,31,92,0.88)_100%)]"
              }`}
            />
          </div>

          <div className="relative mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className={`lg:col-span-5 ${localeIsRTL ? "text-right" : "text-left"}`}>
              <h2 className="text-[1.7rem] leading-[1.12] font-bold tracking-[-0.04em] sm:text-[2.15rem] sm:leading-[1.1]">
                {t("regionalCoverage.heading")}
                <span
                  className={`mt-3 block h-[3px] w-11 rounded-full bg-alfs-orange sm:mt-4 sm:w-[52px] ${sideHeadingAccentClass}`}
                />
              </h2>
              <p className="mt-4 max-w-[430px] text-sm leading-6 text-white/78 sm:mt-5 sm:text-[0.98rem] sm:leading-7">
                {t("regionalCoverage.description")}
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:gap-3 lg:mt-8 lg:gap-4">
                {regionalPanels.map((panel) => (
                  <article
                    key={panel.title}
                    className={`flex gap-3 rounded-xl border border-white/12 bg-white/10 p-3 shadow-sm backdrop-blur-sm sm:gap-3.5 sm:p-4 lg:gap-4 lg:rounded-2xl lg:p-4 ${
                      panel.accent === "orange"
                        ? "border-s-[3px] border-s-alfs-orange sm:border-s-4"
                        : "border-s-[3px] border-s-alfs-royal-blue sm:border-s-4"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 sm:h-11 sm:w-11 ${
                        panel.accent === "orange" ? "text-alfs-orange" : "text-alfs-royal-blue"
                      }`}
                    >
                      <PublicIcon
                        name={panel.icon as Parameters<typeof PublicIcon>[0]["name"]}
                        className="h-[18px] w-[18px]"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-start">
                      <h3 className="text-[0.8125rem] font-semibold leading-snug text-white sm:text-sm">
                        {panel.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-[1.45] text-white/72 sm:text-xs sm:leading-5">
                        {panel.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div
              aria-hidden
              className="relative hidden lg:col-span-7 lg:block lg:min-h-[380px]"
            />
          </div>
        </section>

        <section
          id="final-cta"
          className="bg-alfs-orange px-4 py-14 text-center text-white sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-[760px]">
            <h2 className="text-[2.25rem] leading-[1.2] font-bold tracking-[-0.04em]">
              {t("finalCta.heading")}
            </h2>
            <p className="mt-4 text-[0.96rem] leading-7 text-white/90">
              {t("finalCta.description")}
            </p>
            <a
              href="#top"
              className="mt-7 inline-flex rounded-md bg-white px-7 py-3 text-sm font-semibold text-alfs-orange shadow-lg transition-colors hover:bg-[#f5f5f5]"
            >
              {t("finalCta.action")}
            </a>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
