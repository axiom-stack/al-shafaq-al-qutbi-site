import type {Metadata} from "next";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {CareersApplicationForm} from "@/components/careers/CareersApplicationForm";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {isRTL, type Locale} from "@/i18n/routing";
import {siteRoutes} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("CareersPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const highlightKeys = ["growth", "team", "impact"] as const;
const processKeys = ["apply", "review", "interview", "join"] as const;

export default async function CareersPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("CareersPage");
  const formT = await getTranslations("Common.forms");

  const sideHeadingAccentClass = localeIsRTL ? "ml-auto mr-0" : "mr-auto ml-0";
  const heroOverlayClass = localeIsRTL
    ? "bg-[linear-gradient(270deg,rgba(13,31,92,0.94)_0%,rgba(13,31,92,0.84)_42%,rgba(13,31,92,0.38)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(13,31,92,0.94)_0%,rgba(13,31,92,0.84)_42%,rgba(13,31,92,0.38)_100%)]";

  const highlights = highlightKeys.map((key) => ({
    title: t(`highlights.items.${key}.title`),
    description: t(`highlights.items.${key}.description`),
    icon: key === "growth" ? "spark" : key === "team" ? "professional" : "globe",
  }));

  const processSteps = processKeys.map((key, index) => ({
    step: index + 1,
    title: t(`process.steps.${key}.title`),
    description: t(`process.steps.${key}.description`),
  }));

  return (
    <>
      <PublicNavbar currentPage="careers" />
      <main id="top" className="min-h-screen bg-[#fbf8ff] pt-[56px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <div className="absolute inset-0">
            <Image
              src="/images/careers/careers-hero.png"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className={`absolute inset-0 ${heroOverlayClass}`} />
          </div>

          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className={`lg:col-span-7 ${localeIsRTL ? "text-right" : "text-left"}`}>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-alfs-orange">
                {t("hero.kicker")}
              </p>
              <h1 className="mt-3 max-w-[640px] text-[2.35rem] leading-[1.04] font-bold tracking-[-0.05em] text-white sm:text-[3.2rem] lg:text-[3.75rem]">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 max-w-[600px] text-[0.98rem] leading-7 text-white/88 sm:text-[1.02rem]">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#application-form"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryAction")}
                </a>
                <PageTransitionLink
                  href={siteRoutes.contact}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t("hero.secondaryAction")}
                </PageTransitionLink>
              </div>
            </div>

            <div
              className={`lg:col-span-5 ${
                localeIsRTL ? "lg:justify-self-start" : "lg:justify-self-end"
              }`}
            >
              <div className="rounded-[18px] border border-white/18 bg-white/14 p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <h2 className={`text-[1.35rem] font-bold ${localeIsRTL ? "text-right" : "text-left"}`}>
                  {t("hero.panel.title")}
                </h2>
                <p className={`mt-2 text-sm leading-6 text-white/82 ${localeIsRTL ? "text-right" : "text-left"}`}>
                  {t("hero.panel.description")}
                </p>
                <ul className="mt-5 space-y-3">
                  {highlights.map((item) => (
                    <li
                      key={item.title}
                      className={`flex items-start gap-3 ${localeIsRTL ? "flex-row-reverse text-right" : ""}`}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-alfs-orange">
                        <PublicIcon
                          name={item.icon as Parameters<typeof PublicIcon>[0]["name"]}
                          className="h-4 w-4"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-white/76">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center">
              <h2 className="inline-block text-[2rem] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.2rem]">
                {t("highlights.heading")}
                <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("highlights.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_16px_rgba(26,47,122,0.08)] ${localeIsRTL ? "text-right" : "text-left"}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-alfs-orange/10 text-alfs-orange">
                    <PublicIcon
                      name={item.icon as Parameters<typeof PublicIcon>[0]["name"]}
                      className="h-5 w-5"
                    />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-bold text-alfs-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
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

            <div className={localeIsRTL ? "text-right" : "text-left"}>
              <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("process.heading")}
              </h2>
              <span className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`} />
              <p className="mt-5 max-w-[520px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("process.description")}
              </p>

              <ol className="mt-8 space-y-4">
                {processSteps.map((step) => (
                  <li
                    key={step.title}
                    className={`flex items-start gap-4 rounded-[10px] bg-white px-5 py-4 shadow-[0_12px_24px_rgba(26,47,122,0.08)] ${
                      localeIsRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-alfs-orange text-sm font-bold text-white">
                      {step.step}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[1rem] font-semibold text-alfs-navy">{step.title}</h3>
                      <p className="mt-1 text-[0.82rem] leading-6 text-on-surface-variant">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

            </div>
          </div>
        </section>

        <section className="bg-alfs-orange px-4 py-14 text-center text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[760px]">
            <h2 className="text-[2rem] leading-[1.15] font-bold tracking-[-0.04em] sm:text-[2.35rem]">
              {t("cta.heading")}
            </h2>
            <p className="mt-4 text-[0.96rem] leading-7 text-white/90">{t("cta.description")}</p>
            <a
              href="#application-form"
              className="mt-7 inline-flex rounded-md bg-white px-7 py-3 text-sm font-semibold text-alfs-orange shadow-lg transition-colors hover:bg-[#f5f5f5]"
            >
              {t("cta.action")}
            </a>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
