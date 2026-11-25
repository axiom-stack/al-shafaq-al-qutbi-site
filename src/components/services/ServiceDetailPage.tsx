import type {ComponentProps} from "react";

import {getLocale, getTranslations} from "next-intl/server";

import Image from "next/image";

import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {ServiceQuoteForm} from "@/components/services/ServiceQuoteForm";
import {CheckList, FeatureGrid, Steps} from "@/components/ui/Blocks";
import {ArrowIcon, ButtonLink} from "@/components/ui/Button";
import {ClosingBand} from "@/components/ui/ClosingBand";
import {PageHero} from "@/components/ui/PageHero";
import {Section, SectionHeader} from "@/components/ui/Section";
import {siteRoutes} from "@/lib/site-routes";
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
  const formT = await getTranslations("Common.forms");
  const homeT = await getTranslations("HomePage");


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
    image: getServiceConfig(config.relatedRoutes[key]).heroImage,
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
      <main id="main" className="pt-[var(--header-h)]">
        <PageHero
          title={t("hero.headline")}
          lead={t("hero.subheadline")}
          image={config.heroImage}
          imageAlt={t("hero.imageAlt")}
          breadcrumb={
            <PageTransitionLink
              href="/services"
              className="inline-flex min-h-9 items-center gap-2 text-ui font-semibold text-on-dark-soft transition-colors hover:text-white"
            >
              <ArrowIcon className="h-4 w-4 rotate-180 rtl:rotate-0" />
              {t("overview.backToServices")}
            </PageTransitionLink>
          }
          actions={
            <>
              <ButtonLink href="#quote-form" size="lg">
                {t("hero.primaryCta")}
              </ButtonLink>
              <ButtonLink href="#process" variant="onDark" size="lg">
                {t("process.heading")}
              </ButtonLink>
            </>
          }
        />

        <Section tone="surface">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] xl:gap-x-24">
            <div className="lg:col-start-1">
              <h2 className="t-h2 text-navy-900">{t("overview.heading")}</h2>
              <p className="t-lead mt-6 text-ink-soft">{t("overview.paragraphOne")}</p>
              <p className="t-lead mt-4 text-ink-soft">{t("overview.paragraphTwo")}</p>
            </div>

            <div className="lg:col-start-1 lg:row-start-2">
              <div>
                <h3 className="t-h3 text-navy-900">{t("capabilities.heading")}</h3>
                <dl className="mt-5 border-b border-line">
                  {capabilityItems.map((item) => (
                    <div
                      key={item.key}
                      className="grid gap-1 border-t border-line py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="flex items-start gap-3 text-item font-semibold leading-snug text-navy-900">
                        <PublicIcon name={item.icon} className="mt-0.5 h-5 w-5 shrink-0 text-navy-800" />
                        {item.title}
                      </dt>
                      <dd className="text-base leading-relaxed text-ink-soft">{item.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-12">
                <h3 className="t-h3 text-navy-900">{t("whyAlfs.heading")}</h3>
                <CheckList items={whyAlfsItems} className="mt-6" />
              </div>
            </div>

            <div className="row-start-2 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
              <ServiceQuoteForm
                title={t("quoteForm.title")}
                subheading={t("quoteForm.subheading")}
                formCopy={{
                  requiredLabel: formT("requiredLabel"),
                  optionalLabel: formT("optionalLabel"),
                  submissionSucceeded: formT("submissionSucceeded"),
                  submissionFailed: formT("submissionFailed"),
                  validation: {
                    required: formT("validation.required"),
                    email: formT("validation.email"),
                    phone: formT("validation.phone"),
                    select: formT("validation.select"),
                    messageMin: formT("validation.messageMin"),
                    cargoDetailsMin: formT("validation.cargoDetailsMin"),
                    linkedin: formT("validation.linkedin"),
                    fileRequired: formT("validation.fileRequired"),
                    fileType: formT("validation.fileType"),
                    fileSize: formT("validation.fileSize"),
                  },
                  legend: {
                    required: formT("legend.required"),
                    optional: formT("legend.optional"),
                  },
                  status: {
                    sending: formT("status.sending"),
                  },
                  feedback: {
                    successTitle: formT("feedback.successTitle"),
                    errorTitle: formT("feedback.errorTitle"),
                    errorDescription: formT("feedback.errorDescription"),
                  },
                }}
                fields={quoteFields}
                locale={locale}
                localeIsRTL={localeIsRTL}
              />
              <p className="mt-4 flex items-center gap-2 text-sm text-ink-faint">
                <PublicIcon name="clock" className="h-4 w-4 shrink-0" />
                {formT("replyNote")}
              </p>
            </div>
          </div>
        </Section>

        <Section tone="paper">
          <SectionHeader title={t("whenToChoose.heading")} />
          <FeatureGrid items={whenToChooseItems} columns={3} className="mt-10 lg:mt-12" />
        </Section>

        <Section id="process" tone="navy">
          <SectionHeader title={t("process.heading")} onDark />
          <Steps steps={processSteps} columns={3} onDark className="mt-10 lg:mt-14" />
        </Section>

        <Section tone="paper">
          <SectionHeader title={t("related.heading")} />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {relatedItems.map((item) => (
              <PageTransitionLink
                key={item.key}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,box-shadow] duration-200 hover:border-navy-800 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                  <h3 className="text-ui font-bold leading-snug text-navy-900 sm:text-item">{item.title}</h3>
                  <ArrowIcon className="flip-rtl mt-1 h-4 w-4 text-ink-faint transition-colors group-hover:text-navy-800" />
                </div>
              </PageTransitionLink>
            ))}
          </div>
        </Section>

        <ClosingBand
          title={t("cta.heading")}
          lead={t("cta.description")}
          actions={
            <>
              <ButtonLink href="#quote-form" size="lg">
                {t("cta.primaryAction")}
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
