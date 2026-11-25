import type {Metadata} from "next";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {CareersApplicationForm} from "@/components/careers/CareersApplicationForm";
import {PublicFooter} from "@/components/public/PublicFooter";
import type {IconName} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {FeatureList, Steps} from "@/components/ui/Blocks";
import {ButtonLink} from "@/components/ui/Button";
import {PageHeader} from "@/components/ui/PageHero";
import {Section} from "@/components/ui/Section";
import {isRTL, type Locale} from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CareersPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const highlightKeys = ["growth", "team", "impact"] as const;
const processKeys = ["apply", "review", "interview", "join"] as const;
const highlightIcons: Record<(typeof highlightKeys)[number], IconName> = {
  growth: "spark",
  team: "professional",
  impact: "globe",
};

export default async function CareersPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("CareersPage");
  const formT = await getTranslations("Common.forms");

  const highlights = highlightKeys.map((key) => ({
    key,
    title: t(`highlights.items.${key}.title`),
    description: t(`highlights.items.${key}.description`),
    icon: highlightIcons[key],
  }));

  const processSteps = processKeys.map((key) => ({
    key,
    title: t(`process.steps.${key}.title`),
    description: t(`process.steps.${key}.description`),
  }));

  return (
    <>
      <PublicNavbar currentPage="careers" />
      <main id="main" className="pt-[var(--header-h)]">
        <span id="top" className="sr-only" />
        <PageHeader
          title={t("hero.heading")}
          lead={t("hero.description")}
          actions={
            <ButtonLink href="#application-form" size="lg">
              {t("hero.primaryAction")}
            </ButtonLink>
          }
        />

        <Section tone="surface">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
              <Image
                src="/images/about/our-team-clean.jpg"
                alt={t("hero.imageAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div>
              <h2 className="t-h2 text-navy-900">{t("highlights.heading")}</h2>
              <p className="t-lead mt-5 text-ink-soft">{t("highlights.description")}</p>
              <FeatureList items={highlights} className="mt-8 border-b border-line" />
            </div>
          </div>
        </Section>

        <Section tone="paper">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            <CareersApplicationForm
              heading={t("form.heading")}
              description={t("form.description")}
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
              fields={{
                name: t("form.fields.name"),
                email: t("form.fields.email"),
                phone: t("form.fields.phone"),
                position: t("form.fields.position"),
                experience: t("form.fields.experience"),
                experiencePlaceholder: t("form.fields.experiencePlaceholder"),
                experienceLevels: {
                  entry: t("form.fields.experienceLevels.entry"),
                  oneToThree: t("form.fields.experienceLevels.oneToThree"),
                  threeToFive: t("form.fields.experienceLevels.threeToFive"),
                  fivePlus: t("form.fields.experienceLevels.fivePlus"),
                },
                linkedin: t("form.fields.linkedin"),
                linkedinPlaceholder: t("form.fields.linkedinPlaceholder"),
                message: t("form.fields.message"),
                cv: t("form.fields.cv"),
                cvHint: t("form.fields.cvHint"),
                cvChoose: t("form.fields.cvChoose"),
                submit: t("form.fields.submit"),
              }}
              locale={locale}
              localeIsRTL={localeIsRTL}
            />

            <aside className="order-first lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:order-none lg:self-start">
              <h2 className="t-h3 text-navy-900">{t("process.heading")}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{t("process.description")}</p>
              <Steps steps={processSteps} columns={1} className="mt-8 !gap-y-6" />
              <div className="mt-8 rounded-card bg-sunken p-6">
                <h3 className="text-item font-semibold text-navy-900">{t("process.note.title")}</h3>
                <p className="mt-2 text-ui leading-relaxed text-ink-soft">{t("process.note.description")}</p>
              </div>
            </aside>
          </div>
        </Section>
      </main>

      <PublicFooter />
    </>
  );
}
