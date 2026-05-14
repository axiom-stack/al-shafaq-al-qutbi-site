import type {Metadata} from "next";

import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import type {Locale} from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const introCardKeys = ["integratedFreight", "operationalClarity", "flexibleHandling"] as const;
const valueKeys = ["accuracy", "speed", "flexibility", "tracking"] as const;
const teamPointKeys = ["professionalism", "support", "training"] as const;
const officeKeys = ["amman", "hebron"] as const;
const serviceChipKeys = ["seaFreight", "landTransport", "airFreight", "warehousing", "customs", "tracking"] as const;

export default async function AboutPage({
  params,
}: Readonly<{
  params: Promise<{locale: Locale}>;
}>) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("AboutPage");

  const introCards = introCardKeys.map((key) => ({
    title: t(`snapshot.cards.${key}.title`),
    description: t(`snapshot.cards.${key}.description`),
    icon:
      key === "integratedFreight"
        ? "spark"
        : key === "operationalClarity"
          ? "eye"
          : "flex",
  }));

  const values = valueKeys.map((key) => ({
    title: t(`values.items.${key}.title`),
    description: t(`values.items.${key}.description`),
    icon:
      key === "accuracy"
        ? "search"
        : key === "speed"
          ? "speed"
          : key === "flexibility"
            ? "flex"
            : "track",
  }));

  const teamPoints = teamPointKeys.map((key) => ({
    title: t(`team.points.${key}.title`),
    description: t(`team.points.${key}.description`),
    icon:
      key === "professionalism"
        ? "professional"
        : key === "support"
          ? "support"
          : "training",
  }));

  const offices = officeKeys.map((key) => ({
    title: t(`coverage.offices.${key}.title`),
    address: t(`coverage.offices.${key}.address`),
  }));

  const serviceChips = serviceChipKeys.map((key) => ({
    label: t(`hero.support.services.${key}`),
    icon:
      key === "seaFreight"
        ? "ship"
        : key === "landTransport"
          ? "truck"
          : key === "airFreight"
            ? "plane"
            : key === "warehousing"
              ? "warehouse"
              : key === "customs"
                ? "customs"
                : "location",
  }));

  return (
    <>
      <PublicNavbar currentPage="about" />
      <main className="min-h-screen bg-[#fbf8ff] pt-[72px]">
        <section className="relative overflow-hidden bg-alfs-deep-blue">
          <div className="absolute inset-0">
            <Image
              src="/images/about/about-hero.png"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,92,0.92)_0%,rgba(13,31,92,0.82)_40%,rgba(13,31,92,0.34)_100%)]" />
          </div>

          <div className="relative mx-auto grid max-w-[1280px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:py-16">
            <div className="lg:col-span-7">
              <p className="text-[0.72rem] font-bold tracking-[0.22em] text-alfs-orange uppercase">
                {t("hero.kicker")}
              </p>
              <h1 className="mt-3 max-w-[620px] text-[2.4rem] leading-[1.02] font-bold tracking-[-0.05em] text-white sm:text-[3.4rem] lg:text-[4rem]">
                {t("hero.heading")}
              </h1>
              <p className="mt-5 max-w-[610px] text-[0.98rem] leading-7 text-white/88 sm:text-[1.02rem]">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#final-cta"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryAction")}
                </a>
                <a
                  href={`/${locale}#services`}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t("hero.secondaryAction")}
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="max-w-[350px] rounded-[18px] border border-white/18 bg-white/14 p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                <h2 className="text-[1.55rem] leading-tight font-bold">{t("hero.support.title")}</h2>
                <div className="mt-5 space-y-3">
                  {serviceChips.map((item) => (
                    <div key={item.label} className="flex items-center gap-3 text-sm font-medium">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-alfs-orange">
                        <PublicIcon name={item.icon as Parameters<typeof PublicIcon>[0]["name"]} className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-[510px]">
              <h2 className="text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("snapshot.heading")}
              </h2>
              <span className="mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mt-6 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("snapshot.descriptionOne")}
              </p>
              <p className="mt-4 text-[0.96rem] leading-7 text-on-surface-variant">
                {t("snapshot.descriptionTwo")}
              </p>
            </div>

            <div className="space-y-3">
              {introCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[14px] border border-[#ebe8f3] bg-white px-5 py-4 shadow-[0_14px_30px_rgba(26,47,122,0.10)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f5ff] text-alfs-royal-blue">
                      <PublicIcon name={card.icon as Parameters<typeof PublicIcon>[0]["name"]} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[1rem] font-semibold text-alfs-navy">{card.title}</h3>
                      <p className="mt-1.5 text-[0.82rem] leading-5 text-on-surface-variant">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-alfs-deep-blue px-4 py-14 sm:px-6 lg:px-8 lg:py-[4.5rem]">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative mx-auto grid max-w-[1280px] gap-4 md:grid-cols-2">
            <article className="rounded-[12px] bg-white px-6 py-8 text-center shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <h2 className="text-[1.55rem] font-bold text-alfs-navy">{t("missionVision.vision.title")}</h2>
              <span className="mx-auto mt-3 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mt-5 text-[0.92rem] leading-7 text-on-surface-variant">
                {t("missionVision.vision.description")}
              </p>
            </article>
            <article className="rounded-[12px] bg-white px-6 py-8 text-center shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
              <h2 className="text-[1.55rem] font-bold text-alfs-navy">{t("missionVision.mission.title")}</h2>
              <span className="mx-auto mt-3 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mt-5 text-[0.92rem] leading-7 text-on-surface-variant">
                {t("missionVision.mission.description")}
              </p>
            </article>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-[880px] text-center">
              <h2 className="text-[2rem] leading-[1.15] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("values.heading")}
              </h2>
              <span className="mx-auto mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {values.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[12px] border border-[#e8e4ef] bg-white px-5 py-6 text-center shadow-[0_12px_28px_rgba(26,47,122,0.10)]"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-alfs-orange/8 text-alfs-orange">
                    <PublicIcon name={item.icon as Parameters<typeof PublicIcon>[0]["name"]} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[1.02rem] leading-6 font-semibold text-alfs-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-5 text-on-surface-variant">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center">
            <div className="relative order-2 overflow-hidden rounded-[14px] shadow-[0_18px_36px_rgba(26,47,122,0.14)] lg:order-1">
              <Image
                src="/images/about/our-team.png"
                alt={t("team.imageAlt")}
                width={880}
                height={760}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="max-w-[520px] text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("team.heading")}
              </h2>
              <span className="mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mt-6 max-w-[540px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("team.description")}
              </p>

              <div className="mt-7 space-y-5">
                {teamPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-4">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-alfs-orange/10 text-alfs-orange">
                      <PublicIcon name={point.icon as Parameters<typeof PublicIcon>[0]["name"]} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[0.98rem] font-semibold text-alfs-navy">{point.title}</h3>
                      <p className="mt-1.5 text-[0.84rem] leading-6 text-on-surface-variant">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f7f5fb] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <h2 className="max-w-[520px] text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.55rem]">
                {t("coverage.heading")}
              </h2>
              <span className="mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              <p className="mt-6 max-w-[570px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("coverage.description")}
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {offices.map((office) => (
                  <article
                    key={office.title}
                    className="rounded-[10px] border-l-4 border-alfs-orange bg-white px-5 py-4 shadow-[0_12px_24px_rgba(26,47,122,0.08)]"
                  >
                    <h3 className="flex items-center gap-2 text-[1rem] font-semibold text-alfs-navy">
                      <PublicIcon name="city" className="h-[18px] w-[18px] text-alfs-orange" />
                      {office.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-[0.82rem] leading-6 text-on-surface-variant">
                      {office.address}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[450px]">
              <div className="absolute inset-0 rounded-full bg-alfs-navy/6 blur-3xl" />
              <svg
                viewBox="0 0 400 400"
                className="relative w-full drop-shadow-[0_18px_36px_rgba(26,47,122,0.12)]"
                aria-label={t("coverage.mapAlt")}
                role="img"
              >
                <circle cx="200" cy="200" r="150" fill="none" stroke="#1A2F7A" strokeDasharray="6 6" strokeOpacity="0.22" strokeWidth="2" />
                <circle cx="200" cy="200" r="100" fill="none" stroke="#1A2F7A" strokeDasharray="4 4" strokeOpacity="0.28" strokeWidth="2" />
                <path d="M200 200 Q 150 100 100 80" fill="none" stroke="#F47920" strokeLinecap="round" strokeWidth="3" />
                <path d="M200 200 Q 300 150 350 100" fill="none" stroke="#F47920" strokeLinecap="round" strokeWidth="3" />
                <path d="M200 200 Q 250 300 320 320" fill="none" stroke="#F47920" strokeLinecap="round" strokeWidth="3" />
                <path d="M200 200 Q 120 250 80 300" fill="none" stroke="#F47920" strokeLinecap="round" strokeWidth="3" />
                <path d="M200 200 Q 200 80 200 50" fill="none" stroke="#F47920" strokeLinecap="round" strokeWidth="3" />
                <circle cx="200" cy="200" r="12" fill="#F47920" stroke="#fff" strokeWidth="4" />
                <circle cx="100" cy="80" r="8" fill="#1A2F7A" stroke="#fff" strokeWidth="2" />
                <circle cx="350" cy="100" r="8" fill="#1A2F7A" stroke="#fff" strokeWidth="2" />
                <circle cx="320" cy="320" r="8" fill="#1A2F7A" stroke="#fff" strokeWidth="2" />
                <circle cx="80" cy="300" r="8" fill="#1A2F7A" stroke="#fff" strokeWidth="2" />
                <circle cx="200" cy="50" r="8" fill="#1A2F7A" stroke="#fff" strokeWidth="2" />
                <text x="219" y="214" fill="#1A2F7A" fontFamily="var(--font-montserrat)" fontSize="14" fontWeight="700">
                  {t("coverage.mapLabels.hub")}
                </text>
                <text x="60" y="70" fill="#454651" fontFamily="var(--font-montserrat)" fontSize="12" fontWeight="600">
                  {t("coverage.mapLabels.syria")}
                </text>
                <text x="360" y="90" fill="#454651" fontFamily="var(--font-montserrat)" fontSize="12" fontWeight="600">
                  {t("coverage.mapLabels.lebanon")}
                </text>
                <text x="330" y="340" fill="#454651" fontFamily="var(--font-montserrat)" fontSize="12" fontWeight="600">
                  {t("coverage.mapLabels.gcc")}
                </text>
                <text x="38" y="320" fill="#454651" fontFamily="var(--font-montserrat)" fontSize="12" fontWeight="600">
                  {t("coverage.mapLabels.palestine")}
                </text>
                <text x="205" y="40" fill="#454651" fontFamily="var(--font-montserrat)" fontSize="12" fontWeight="600">
                  {t("coverage.mapLabels.global")}
                </text>
              </svg>
            </div>
          </div>
        </section>

        <section
          id="final-cta"
          className="relative overflow-hidden bg-alfs-deep-blue px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(270deg,rgba(26,47,122,0.70)_0%,rgba(26,47,122,0)_100%)]" />
          <div className="relative mx-auto max-w-[760px]">
            <h2 className="text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-white sm:text-[2.6rem]">
              {t("cta.heading")}
            </h2>
            <p className="mx-auto mt-5 max-w-[580px] text-[0.98rem] leading-7 text-white/84">
              {t("cta.description")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
              >
                {t("cta.primaryAction")}
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/75 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("cta.secondaryAction")}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-white/16 pt-6 text-sm text-white/86">
              <div className="flex items-center gap-2">
                <PublicIcon name="mail" className="h-4 w-4 text-alfs-orange" />
                <span>{t("cta.email")}</span>
              </div>
              <div className="flex items-center gap-2">
                <PublicIcon name="phone" className="h-4 w-4 text-alfs-orange" />
                <span>{t("cta.phone")}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        href="#contact"
        aria-label={t("whatsAppLabel")}
        className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 hover:bg-[#1da851] sm:right-6 sm:bottom-6"
      >
        <PublicIcon name="whatsapp" className="h-6 w-6" />
      </a>

      <PublicFooter />
    </>
  );
}
