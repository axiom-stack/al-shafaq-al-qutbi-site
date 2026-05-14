import {getTranslations} from "next-intl/server";

import {Link as IntlLink} from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="brand-shell flex min-h-screen items-center justify-center py-section">
      <div className="brand-card max-w-2xl p-8 text-center sm:p-10">
        <p className="brand-kicker">{t("kicker")}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-alfs-navy sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-7 text-on-surface-variant">
          {t("description")}
        </p>
        <IntlLink href="/" className="brand-button mt-8">
          {t("action")}
        </IntlLink>
      </div>
    </main>
  );
}
