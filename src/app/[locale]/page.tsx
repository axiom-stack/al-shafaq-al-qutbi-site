import type {Metadata} from "next";

import {getTranslations, setRequestLocale} from "next-intl/server";

import type {Locale} from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const capabilityKeys = [
  "speed",
  "contrast",
  "tokens",
  "typography",
] as const;

const serviceKeys = [
  "freightForwarding",
  "crossBorderLogistics",
  "customsSupport",
] as const;

const statKeys = [
  "visibility",
  "width",
  "accent",
  "system",
] as const;

export default async function HomePage({
  params,
}: Readonly<{
  params: Promise<{locale: Locale}>;
}>) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  const capabilities = capabilityKeys.map((key) => t(`capabilities.${key}`));
  const services = serviceKeys.map((key) => ({
    eyebrow: t(`services.${key}.eyebrow`),
    title: t(`services.${key}.title`),
    description: t(`services.${key}.description`),
  }));
  const stats = statKeys.map((key) => ({
    value: t(`stats.${key}.value`),
    label: t(`stats.${key}.label`),
  }));

  return (
    <main id="top" className="min-h-screen">
      <section className="relative overflow-hidden border-b border-outline-variant/50">
        <div className="absolute inset-0 bg-surface-gradient opacity-95" />
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-alfs-orange/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative brand-shell py-section">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl text-white">
              <p className="brand-kicker text-white/80">{t("hero.kicker")}</p>
              <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-[4.5rem] lg:leading-[1.05]">
                {t("hero.heading")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                {t("hero.description")}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#services" className="brand-button">
                  {t("hero.primaryAction")}
                </a>
                <a
                  href="#system"
                  className="brand-button-secondary border-white/70 text-white"
                >
                  {t("hero.secondaryAction")}
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="brand-pill border-white/20 bg-white/10 text-white">
                  {t("hero.badgeOne")}
                </div>
                <div className="brand-pill border-white/20 bg-white/10 text-white">
                  <span className="font-arabic text-base">{t("hero.badgeTwo")}</span>
                </div>
              </div>
            </div>

            <div className="brand-card-dark p-8 text-white shadow-brand-soft">
              <div className="flex items-center justify-between">
                <span className="brand-pill border-white/15 bg-white/5 text-white">
                  {t("systemSnapshot.eyebrow")}
                </span>
                <span className="text-sm text-white/60">{t("systemSnapshot.version")}</span>
              </div>

              <div className="mt-10 space-y-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-end justify-between gap-4 border-b border-white/10 pb-4 last:border-b-0"
                  >
                    <div>
                      <p className="text-4xl font-bold tracking-tight text-white">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/70">
                        {stat.label}
                      </p>
                    </div>
                    <span className="mb-3 h-2.5 w-2.5 rounded-full bg-alfs-orange" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="brand-section">
        <div className="brand-shell">
          <h2 className="section-heading">{t("capabilities.title")}</h2>
          <p className="section-copy">{t("capabilities.copy")}</p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item) => (
              <div key={item} className="brand-card p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alfs-orange/10 text-alfs-orange">
                  <span className="h-2.5 w-2.5 rounded-full bg-alfs-orange" />
                </div>
                <p className="mt-5 text-base leading-7 text-on-surface-variant">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="brand-section pt-0">
        <div className="brand-shell">
          <h2 className="section-heading">{t("services.title")}</h2>
          <p className="section-copy">{t("services.copy")}</p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="brand-card p-8">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-alfs-orange" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-alfs-navy">
                    {service.eyebrow}
                  </p>
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-alfs-navy">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-on-surface-variant">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-section pt-0">
        <div className="brand-shell">
          <div className="brand-card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-alfs-deep-blue p-8 text-white sm:p-10">
                <p className="brand-kicker text-white/75">{t("implementation.kicker")}</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {t("implementation.heading")}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/80">
                  {t("implementation.copy")}
                </p>
                <a
                  href="#top"
                  className="brand-button-secondary mt-8 border-white/70 text-white"
                >
                  {t("implementation.action")}
                </a>
              </div>

              <div className="bg-surface-container-low p-8 sm:p-10">
                <h3 className="text-2xl font-bold tracking-tight text-alfs-navy">
                  {t("implementation.whatWeCover.title")}
                </h3>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-alfs-orange" />
                    <span className="text-base leading-7 text-on-surface-variant">
                      {t("implementation.whatWeCover.one")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-alfs-orange" />
                    <span className="text-base leading-7 text-on-surface-variant">
                      {t("implementation.whatWeCover.two")}
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-alfs-orange" />
                    <span className="text-base leading-7 text-on-surface-variant">
                      {t("implementation.whatWeCover.three")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
