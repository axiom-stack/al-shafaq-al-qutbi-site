import type {Metadata} from "next";

import Image from "next/image";
import {getLocale, getTranslations} from "next-intl/server";

import {ContactInquiryForm} from "@/components/contact/ContactInquiryForm";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {PageTransitionLink} from "@/components/public/PageTransitionLink";
import {getPublicContactInfo} from "@/components/public/PublicContactDetails";
import {isRTL, type Locale} from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const channelKeys = ["email", "phone", "whatsapp"] as const;
const officeKeys = ["amman", "hebron"] as const;
const supportKeys = ["response", "coverage", "expertise"] as const;

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("ContactPage");
  const footerContact = await getTranslations("HomePage.footer.contact");
  const contact = await getPublicContactInfo();

  const sideHeadingAccentClass = localeIsRTL ? "ml-auto mr-0" : "mr-auto ml-0";
  const heroOverlayClass = localeIsRTL
    ? "bg-[linear-gradient(270deg,rgba(13,31,92,0.94)_0%,rgba(13,31,92,0.84)_42%,rgba(13,31,92,0.38)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(13,31,92,0.94)_0%,rgba(13,31,92,0.84)_42%,rgba(13,31,92,0.38)_100%)]";
  const officeCardClass = localeIsRTL
    ? "border-r-4 border-l-0 text-right"
    : "border-l-4 border-r-0 text-left";

  const channels = channelKeys.map((key) => {
    const icon =
      key === "email" ? "mail" : key === "phone" ? "phone" : "whatsapp";
    const href =
      key === "email"
        ? `mailto:${contact.email}`
        : key === "phone"
          ? `tel:${contact.tel}`
          : contact.whatsApp;

    return {
      key,
      title: t(`channels.items.${key}.title`),
      description: t(`channels.items.${key}.description`),
      value: key === "email" ? contact.email : key === "phone" ? contact.phone : t("channels.items.whatsapp.action"),
      href,
      external: key === "whatsapp",
      icon,
    };
  });

  const offices = officeKeys.map((key) => ({
    title: t(`offices.locations.${key}.title`),
    address: footerContact(`locations.${key}`),
  }));

  const supportPoints = supportKeys.map((key) => ({
    title: t(`support.items.${key}.title`),
    description: t(`support.items.${key}.description`),
    icon:
      key === "response"
        ? "speed"
        : key === "coverage"
          ? "globe"
          : "professional",
  }));

  return (
    <>
      <PublicNavbar currentPage="contact" />
      <main id="top" className="min-h-screen bg-[#fbf8ff] pt-[56px]">
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
                  href="#inquiry-form"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-alfs-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-alfs-amber"
                >
                  {t("hero.primaryAction")}
                </a>
                <a
                  href={`tel:${contact.tel}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t("hero.secondaryAction")}
                </a>
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
                <div className="mt-5 space-y-3">
                  {supportPoints.map((point) => (
                    <div
                      key={point.title}
                      className={`flex items-start gap-3 ${localeIsRTL ? "flex-row-reverse text-right" : ""}`}
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/12 text-alfs-orange">
                        <PublicIcon
                          name={point.icon as Parameters<typeof PublicIcon>[0]["name"]}
                          className="h-4 w-4"
                        />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{point.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-white/76">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f2eff8] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="text-center">
              <h2 className="inline-block text-[2rem] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.2rem]">
                {t("channels.heading")}
                <span className="mx-auto mt-4 block h-[3px] w-[52px] rounded-full bg-alfs-orange" />
              </h2>
              <p className="mx-auto mt-4 max-w-[620px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("channels.description")}
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {channels.map((channel) => (
                <a
                  key={channel.key}
                  href={channel.href}
                  {...(channel.external
                    ? {target: "_blank", rel: "noopener noreferrer"}
                    : {})}
                  className={`group rounded-2xl border border-outline-variant/20 bg-white p-6 shadow-[0_4px_16px_rgba(26,47,122,0.08)] transition-shadow hover:shadow-[0_8px_24px_rgba(26,47,122,0.14)] ${localeIsRTL ? "text-right" : "text-left"}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-alfs-orange/10 text-alfs-orange transition-colors group-hover:bg-alfs-orange group-hover:text-white">
                    <PublicIcon
                      name={channel.icon as Parameters<typeof PublicIcon>[0]["name"]}
                      className="h-5 w-5"
                    />
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-bold text-alfs-navy">{channel.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{channel.description}</p>
                  <p className="mt-4 text-sm font-semibold text-alfs-orange">{channel.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <ContactInquiryForm
              heading={t("form.heading")}
              description={t("form.description")}
              fields={{
                name: t("form.fields.name"),
                email: t("form.fields.email"),
                phone: t("form.fields.phone"),
                subject: t("form.fields.subject"),
                subjectPlaceholder: t("form.fields.subjectPlaceholder"),
                subjects: {
                  quote: t("form.fields.subjects.quote"),
                  tracking: t("form.fields.subjects.tracking"),
                  general: t("form.fields.subjects.general"),
                },
                message: t("form.fields.message"),
                submit: t("form.fields.submit"),
              }}
              localeIsRTL={localeIsRTL}
            />

            <div className={localeIsRTL ? "text-right" : "text-left"}>
              <h2 className="text-[2rem] leading-[1.12] font-bold tracking-[-0.04em] text-alfs-navy sm:text-[2.45rem]">
                {t("offices.heading")}
              </h2>
              <span className={`mt-5 block h-[3px] w-[52px] rounded-full bg-alfs-orange ${sideHeadingAccentClass}`} />
              <p className="mt-5 max-w-[520px] text-[0.96rem] leading-7 text-on-surface-variant">
                {t("offices.description")}
              </p>

              <div className="mt-7 grid gap-4">
                {offices.map((office) => (
                  <article
                    key={office.title}
                    className={`rounded-[10px] bg-white px-5 py-4 shadow-[0_12px_24px_rgba(26,47,122,0.08)] ${officeCardClass}`}
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

              <div className="mt-8 rounded-[14px] border border-[#ebe8f3] bg-[#f7f5fb] p-5">
                <h3 className="text-[0.98rem] font-semibold text-alfs-navy">{t("hours.title")}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-on-surface-variant">
                  {t("hours.value")}
                </p>
              </div>

              <PageTransitionLink
                href="/services"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-alfs-orange transition-colors hover:text-alfs-amber"
              >
                {t("offices.servicesLink")}
                <span aria-hidden="true">{localeIsRTL ? "←" : "→"}</span>
              </PageTransitionLink>
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
              href="#inquiry-form"
              className="mt-7 inline-flex rounded-md bg-white px-7 py-3 text-sm font-semibold text-alfs-orange shadow-lg transition-colors hover:bg-[#f5f5f5]"
            >
              {t("cta.action")}
            </a>
          </div>
        </section>
      </main>

      <a
        href={contact.whatsApp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("whatsAppLabel")}
        className={`fixed bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition-transform hover:scale-105 hover:bg-[#1da851] sm:bottom-6 ${
          localeIsRTL ? "left-4 sm:left-6" : "right-4 sm:right-6"
        }`}
      >
        <PublicIcon name="whatsapp" className="h-6 w-6" />
      </a>

      <PublicFooter />
    </>
  );
}
