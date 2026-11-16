import type {Metadata} from "next";

import {getLocale, getTranslations} from "next-intl/server";

import {ContactInquiryForm} from "@/components/contact/ContactInquiryForm";
import {getPublicContactInfo} from "@/components/public/PublicContactDetails";
import {PublicFooter} from "@/components/public/PublicFooter";
import {PublicIcon, type IconName} from "@/components/public/PublicIcon";
import {PublicMap} from "@/components/public/PublicMap";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {IconWell} from "@/components/ui/Blocks";
import {ButtonLink} from "@/components/ui/Button";
import {PageHeader} from "@/components/ui/PageHero";
import {Section} from "@/components/ui/Section";
import {isRTL, type Locale} from "@/i18n/routing";
import {formatPhoneLabel, parsePhoneNumbers} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ContactPage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const localeIsRTL = isRTL(locale);
  const t = await getTranslations("ContactPage");
  const formT = await getTranslations("Common.forms");
  const contact = await getPublicContactInfo();
  const phoneNumbers = parsePhoneNumbers(contact.phone);

  const channels: {
    key: string;
    icon: IconName;
    title: string;
    description: string;
    links: {href: string; label: string; external?: boolean; ltr?: boolean}[];
  }[] = [
    {
      key: "phone",
      icon: "phone",
      title: t("channels.items.phone.title"),
      description: t("channels.items.phone.description"),
      links: phoneNumbers.map((num) => ({href: `tel:${num.tel}`, label: formatPhoneLabel(num.label), ltr: true})),
    },
    {
      key: "whatsapp",
      icon: "whatsapp",
      title: t("channels.items.whatsapp.title"),
      description: t("channels.items.whatsapp.description"),
      links: [{href: contact.whatsApp, label: t("channels.items.whatsapp.action"), external: true}],
    },
    {
      key: "email",
      icon: "mail",
      title: t("channels.items.email.title"),
      description: t("channels.items.email.description"),
      links: [{href: `mailto:${contact.email}`, label: contact.email, ltr: true}],
    },
  ];

  return (
    <>
      <PublicNavbar currentPage="contact" />
      <main id="main" className="pt-[var(--header-h)]">
        <span id="top" className="sr-only" />
        <PageHeader
          title={t("hero.heading")}
          lead={t("hero.description")}
          actions={
            <>
              <ButtonLink href="#inquiry-form" size="lg">
                {t("hero.primaryAction")}
              </ButtonLink>
              <ButtonLink href={`tel:${phoneNumbers[0].tel}`} variant="onDark" size="lg">
                <PublicIcon name="phone" className="h-4 w-4" />
                {t("hero.secondaryAction")}
              </ButtonLink>
            </>
          }
        />

        <Section tone="paper">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            <ContactInquiryForm
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
              locale={locale}
              localeIsRTL={localeIsRTL}
            />

            <aside className="lg:pt-3">
              <h2 className="t-h3 text-navy-900">{t("channels.heading")}</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{t("channels.description")}</p>

              <ul className="mt-8 border-b border-line">
                {channels.map((channel) => (
                  <li key={channel.key} className="flex gap-4 border-t border-line py-6">
                    <IconWell name={channel.icon} />
                    <div className="min-w-0">
                      <h3 className="text-item font-semibold text-navy-900">{channel.title}</h3>
                      <p className="mt-1 text-base leading-relaxed text-ink-soft">{channel.description}</p>
                      <div className="mt-2 flex flex-col items-start">
                        {channel.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            dir={link.ltr ? "ltr" : undefined}
                            {...(link.external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                            className="inline-flex min-h-11 items-center break-all text-base font-semibold text-navy-800 underline decoration-line-strong underline-offset-4 transition-colors hover:text-navy-700 hover:decoration-navy-700"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Section>

        <PublicMap />
      </main>

      <PublicFooter />
    </>
  );
}
