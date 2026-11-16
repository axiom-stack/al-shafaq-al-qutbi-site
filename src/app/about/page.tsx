import type {Metadata} from "next";

import Image from "next/image";
import {getTranslations} from "next-intl/server";

import {PublicFooter} from "@/components/public/PublicFooter";
import type {IconName} from "@/components/public/PublicIcon";
import {PublicNavbar} from "@/components/public/PublicNavbar";
import {FeatureGrid, FeatureList} from "@/components/ui/Blocks";
import {ButtonLink} from "@/components/ui/Button";
import {ClosingBand} from "@/components/ui/ClosingBand";
import {PageHero} from "@/components/ui/PageHero";
import {Section} from "@/components/ui/Section";
import {contactInquiryHref, siteRoutes} from "@/lib/site-routes";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  const coverageT = await getTranslations("CoveragePage");

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const introCardKeys = ["integratedFreight", "operationalClarity", "flexibleHandling"] as const;
const valueKeys = ["accuracy", "speed", "flexibility", "tracking"] as const;
const teamPointKeys = ["professionalism", "support", "training"] as const;

const introIcons: Record<(typeof introCardKeys)[number], IconName> = {
  integratedFreight: "layers",
  operationalClarity: "eye",
  flexibleHandling: "flex",
};
const valueIcons: Record<(typeof valueKeys)[number], IconName> = {
  accuracy: "track",
  speed: "speed",
  flexibility: "flex",
  tracking: "eye",
};
const teamIcons: Record<(typeof teamPointKeys)[number], IconName> = {
  professionalism: "professional",
  support: "support",
  training: "training",
};

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");
  const coverageT = await getTranslations("CoveragePage");

  const introCards = introCardKeys.map((key) => ({
    key,
    title: t(`snapshot.cards.${key}.title`),
    description: t(`snapshot.cards.${key}.description`),
    icon: introIcons[key],
  }));

  const values = valueKeys.map((key) => ({
    key,
    title: t(`values.items.${key}.title`),
    description: t(`values.items.${key}.description`),
    icon: valueIcons[key],
  }));

  const teamPoints = teamPointKeys.map((key) => ({
    key,
    title: t(`team.points.${key}.title`),
    description: t(`team.points.${key}.description`),
    icon: teamIcons[key],
  }));

  return (
    <>
      <PublicNavbar currentPage="about" />
      <main id="main" className="pt-[var(--header-h)]">
        <PageHero
          title={t("hero.heading")}
          lead={t("hero.description")}
          image="/images/careers/careers-hero.png"
          imageAlt={t("hero.imageAlt")}
          imagePosition="70% 50%"
          actions={
            <>
              <ButtonLink href={contactInquiryHref} size="lg">
                {t("hero.primaryAction")}
              </ButtonLink>
              <ButtonLink href="/services" variant="onDark" size="lg">
                {t("hero.secondaryAction")}
              </ButtonLink>
            </>
          }
        />

        <Section tone="surface">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="t-h2 text-navy-900">{t("snapshot.heading")}</h2>
              <p className="t-lead mt-6 text-ink-soft">{t("snapshot.descriptionOne")}</p>
              <p className="t-lead mt-4 text-ink-soft">{t("snapshot.descriptionTwo")}</p>
            </div>
            <FeatureList items={introCards} className="border-b border-line lg:self-start" />
          </div>
        </Section>

        <Section tone="navy">
          <div className="grid gap-12 md:grid-cols-2 md:gap-0">
            {(["vision", "mission"] as const).map((key, index) => (
              <div
                key={key}
                className={index === 0 ? "md:pe-12 lg:pe-20" : "border-t border-white/15 pt-12 md:border-s md:border-t-0 md:ps-12 md:pt-0 lg:ps-20"}
              >
                <h2 className="t-h3 border-t-2 border-orange-500 pt-5 text-white">{t(`missionVision.${key}.title`)}</h2>
                <p className="mt-4 text-xl font-medium leading-relaxed text-white">
                  {t(`missionVision.${key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <h2 className="t-h3 mt-16 max-w-3xl text-white lg:mt-20">{t("values.heading")}</h2>
          <FeatureGrid items={values} columns={4} onDark className="mt-6" />
        </Section>

        <Section tone="surface">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
              <Image
                src="/images/about/our-team-clean.jpg"
                alt={t("team.imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div>
              <h2 className="t-h2 text-navy-900">{t("team.heading")}</h2>
              <p className="t-lead mt-6 text-ink-soft">{t("team.description")}</p>
              <FeatureList items={teamPoints} className="mt-8 border-b border-line" />
            </div>
          </div>
        </Section>

        <Section tone="navy">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <h2 className="t-h2 text-white">{t("coverage.heading")}</h2>
              <p className="t-lead mt-6 text-on-dark-soft">{t("coverage.description")}</p>
              <div className="mt-8">
                <ButtonLink href={siteRoutes.coverage} variant="onDark">
                  {coverageT("link")}
                </ButtonLink>
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden rounded-media bg-navy-950 ring-1 ring-white/10">
              <Image
                src="/images/services/sea_fright/sea_fright.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </div>
        </Section>

        <ClosingBand
          title={t("cta.heading")}
          lead={t("cta.description")}
          actions={
            <ButtonLink href={contactInquiryHref} size="lg">
              {t("cta.primaryAction")}
            </ButtonLink>
          }
        />
      </main>

      <PublicFooter />
    </>
  );
}
