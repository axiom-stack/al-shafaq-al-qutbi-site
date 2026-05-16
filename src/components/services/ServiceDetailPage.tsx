import type {ComponentProps} from "react";

import {getLocale, getTranslations} from "next-intl/server";

import {HeroBackdropWithSkeleton} from "@/components/public/HeroBackdropWithSkeleton";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {ServiceQuoteForm} from "@/components/services/ServiceQuoteForm";
import {isRTL, type Locale} from "@/i18n/routing";
import {getServiceConfig, type ServiceSlug} from "@/lib/service-pages";

type IconName = ComponentProps<typeof PublicIcon>["name"];

type ServiceDetailPageProps = {
  slug: ServiceSlug;
};

export async function ServiceDetailPage({slug}: ServiceDetailPageProps) {
  const config = getServiceConfig(slug);
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations(config.translationNamespace);

  const sideHeadingAccentClass = "me-auto ms-0";
  const heroOverlayClass = localeIsRTL
    ? "bg-[linear-gradient(270deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.75)_55%,rgba(13,31,92,0.2)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(13,31,92,0.95)_0%,rgba(13,31,92,0.75)_55%,rgba(13,31,92,0.2)_100%)]";
  const ctaGlowSideClass = localeIsRTL
    ? "start-0 bg-[linear-gradient(90deg,rgba(26,47,122,0.70)_0%,rgba(26,47,122,0)_100%)]"
    : "end-0 bg-[linear-gradient(270deg,rgba(26,47,122,0.70)_0%,rgba(26,47,122,0)_100%)]";

  const whenToChooseItems = config.whenToChooseKeys.map((key) => ({
    key,
    title: t(`whenToChoose.items.${key}.title`),
    description: t(`whenToChoose.items.${key}.description`),
    icon: config.whenToChooseIcons[key],
  }));

  const capabilityItems = config.capabilityKeys.map((key) => ({
    key,
    title: t(`capabilities.items.${key}.title`),
    description: t(`capabilities.items.${key}.description`),
    icon: config.capabilityIcons[key],
  }));

  const useCaseItems = config.useCaseKeys.map((key) => t(`useCases.items.${key}`));

  const processSteps = config.processKeys.map((key, index) => ({
    key,
    step: index + 1,
    title: t(`process.steps.${key}.title`),
    description: t(`process.steps.${key}.description`),
    icon: config.processIcons[key],
  }));

  const whyAlfsItems = config.whyAlfsKeys.map((key) => t(`whyAlfs.items.${key}`));

  const relatedItems = config.relatedKeys.map((key) => ({
    key,
    title: t(`related.items.${key}.title`),
    href: `/services/${config.relatedRoutes[key]}`,
    icon: config.relatedIcons[key],
  }));

  const quoteFields = {
    name: t("quoteForm.fields.name"),
    email: t("quoteForm.fields.email"),
    phone: t("quoteForm.fields.phone"),
    cargoDetails: t("quoteForm.fields.cargoDetails"),
    submit: t("quoteForm.fields.submit"),
  };

  return (
    <>
      <PublicNavbar currentPage="services" />
      <main className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative flex min-h-[520px] items-center overflow-hidden bg-alfs-deep-blue sm:min-h-[600px] lg:min-h-[640px]">
          <HeroBackdropWithSkeleton src={config.heroImage} alt={t("hero.imageAlt")} />
          <div className={`absolute inset-0 z-10 ${heroOverlayClass}`} />

          <div className="relative z-20 mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-[760px] text-start">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-alfs-orange">
                {t("hero.eyebrow")}
              </p>
              <h1 className="mt-3 max-w-[640px] text-[2.35rem] leading-[1.05] font-bold tracking-[-0.05em] text-white sm:text-[3.2rem] lg:text-[3.75rem]">
                {t("hero.headline")}
              </h1>
              <p className="mt-5 max-w-[580px] text-[0.98rem] leading-7 text-white/88 sm:text-[1.02rem]">
                {t("hero.subheadline")}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {config.chipKeys.map((key) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                  >
                    <PublicIcon name={config.heroIcon} className="h-3.5 w-3.5 text-alfs-orange" />
                    {t(`hero.chips.${key}`)}
                  </span>
                ))}
              </div>

              <div
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <a
                  href="#quote-form"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryCta")}
                </a>
                <a
                  href={config.secondaryCtaHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t("hero.secondaryCta")}
                </a>
              </div>
            </div>

          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.4fr] lg:items-start">
            <div className="max-w-[640px] text-start">
              {localeIsRTL && (
                <div className="mb-8">
                  <OverviewBackLink localeIsRTL={localeIsRTL} label={t("overview.backToServices")} />
                </div>
              )}
              <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("overview.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <p className="mt-6 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("overview.paragraphOne")}
              </p>
              <p className="mt-4 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("overview.paragraphTwo")}
              </p>
            </div>
            {!localeIsRTL && (
              <OverviewBackLink localeIsRTL={localeIsRTL} label={t("overview.backToServices")} />
            )}
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("whenToChoose.heading")}
              </h2>
              <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>

            <WhenToChooseGrid whenToChooseItems={whenToChooseItems} localeIsRTL={localeIsRTL} />
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-[560px] text-start">
              <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("capabilities.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilityItems.map((item) => (
                <CapabilityCard key={item.key} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-[560px] text-start">
              <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("useCases.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {useCaseItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 rounded-[10px] border border-[#e8e4ef] bg-white px-4 py-3 text-[0.9rem] text-on-surface-variant text-start"
                >
                  <PublicIcon name="check" className="h-5 w-5 shrink-0 text-alfs-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="process" className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <DotPattern />
          <div className="relative mx-auto max-w-[1280px]">
            <ProcessSectionHeader heading={t("process.heading")} />

            <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.map((step) => (
                <li
                  key={step.key}
                  className="relative rounded-[12px] border border-white/12 bg-white/6 p-6 backdrop-blur-sm text-start"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-alfs-orange text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <div className="mt-4 flex items-center gap-2">
                    <PublicIcon name={step.icon} className="h-5 w-5 text-alfs-orange" />
                    <h3 className="text-[1rem] font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-[0.84rem] leading-6 text-off-white/80">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-[560px] text-start">
              <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("whyAlfs.heading")}
              </h2>
              <span
                className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`}
              />
              <ul className="mt-8 space-y-4">
                {whyAlfsItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-start"
                  >
                    <PublicIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-alfs-orange" />
                    <span className="text-[0.96rem] leading-7 text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[760px] text-center">
              <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("related.heading")}
              </h2>
              <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedItems.map((item) => (
                <PageTransitionLink
                  key={item.key}
                  href={item.href}
                  className="group flex flex-col rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 shadow-[0_12px_28px_rgba(26,47,122,0.10)] transition-transform duration-300 hover:-translate-y-1 text-start"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-alfs-orange/10 text-alfs-orange">
                    <PublicIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.02rem] font-semibold text-alfs-navy group-hover:text-alfs-orange">
                    {item.title}
                  </h3>
                  <span className="mt-3 text-sm font-semibold text-alfs-orange">
                    {t("related.explore")}
                    <span aria-hidden className="mx-1">
                      {localeIsRTL ? "←" : "→"}
                    </span>
                  </span>
                </PageTransitionLink>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ServiceQuoteForm
            title={t("quoteForm.title")}
            subheading={t("quoteForm.subheading")}
            fields={quoteFields}
            localeIsRTL={localeIsRTL}
          />
        </section>

        <section
          id="final-cta"
          className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20"
        >
          <DotPattern />
          <CtaGlow className={ctaGlowSideClass} />
          <div className="relative mx-auto max-w-[760px]">
            <h2 className="text-[2rem] leading-[1.2] font-bold tracking-[-0.04em] text-white sm:text-[2.5rem]">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-5 max-w-[580px] text-[0.98rem] leading-7 text-white/84">
              {t("cta.description")}
            </p>
            <a
              href="#quote-form"
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

function OverviewBackLink({localeIsRTL, label}: {localeIsRTL: boolean; label: string}) {
  return (
    <div className={localeIsRTL ? "text-start" : "text-start lg:text-end"}>
      <PageTransitionLink
        href="/services"
        className="inline-flex items-center gap-2 text-sm font-semibold text-alfs-navy transition-colors hover:text-alfs-orange"
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

function WhenToChooseGrid({
  whenToChooseItems,
}: {
  whenToChooseItems: {
    key: string;
    title: string;
    description: string;
    icon: IconName;
  }[];
  localeIsRTL: boolean;
}) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {whenToChooseItems.map((item) => (
        <article
          key={item.key}
          className="rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 shadow-[0_12px_28px_rgba(26,47,122,0.10)] text-start"
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-full bg-alfs-orange/10 text-alfs-orange"
          >
            <PublicIcon name={item.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-[1.02rem] font-semibold text-alfs-navy">{item.title}</h3>
          <p className="mt-2 text-[0.84rem] leading-6 text-on-surface-variant">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

function CapabilityCard({
  item,
}: {
  item: {key: string; title: string; description: string; icon: IconName};
}) {
  return (
    <div
      className="flex gap-4 rounded-[12px] border border-[#ebe8f3] bg-[#fbf8ff] px-5 py-5 text-start"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-alfs-orange/10 text-alfs-orange">
        <PublicIcon name={item.icon} className="h-5 w-5" />
      </span>
      <div>
        <h3 className="text-[0.98rem] font-semibold text-alfs-navy">{item.title}</h3>
        <p className="mt-1.5 text-[0.84rem] leading-6 text-on-surface-variant">{item.description}</p>
      </div>
    </div>
  );
}



function CtaGlow({className}: {className: string}) {
  return <div className={`absolute inset-y-0 w-1/2 ${className}`} />;
}
