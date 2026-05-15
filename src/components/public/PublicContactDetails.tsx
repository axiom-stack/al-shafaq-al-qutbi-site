import {getTranslations} from "next-intl/server";

import {primaryPhoneTel, whatsAppHref} from "@/lib/site-routes";

import {PublicIcon} from "./PublicIcon";

type PublicContactDetailsProps = {
  className?: string;
  itemClassName?: string;
  variant?: "light" | "dark";
  layout?: "inline" | "stack";
};

export async function PublicContactDetails({
  className = "",
  itemClassName = "",
  variant = "dark",
  layout = "inline",
}: PublicContactDetailsProps) {
  const t = await getTranslations("HomePage.footer.contact");
  const email = t("email");
  const phone = t("phone");
  const tel = primaryPhoneTel(phone);

  const textClass =
    variant === "dark" ? "text-white/86 hover:text-alfs-orange" : "text-on-surface-variant hover:text-alfs-orange";

  const layoutClass =
    layout === "stack"
      ? "flex flex-col items-center gap-4"
      : "flex flex-wrap items-center justify-center gap-6";

  return (
    <div className={`${layoutClass} ${className}`}>
      <a
        href={`mailto:${email}`}
        className={`inline-flex items-center gap-2 transition-colors ${textClass} ${itemClassName}`}
      >
        <PublicIcon name="mail" className="h-4 w-4 shrink-0 text-alfs-orange" />
        <span>{email}</span>
      </a>
      <a
        href={`tel:${tel}`}
        className={`inline-flex items-center gap-2 transition-colors ${textClass} ${itemClassName}`}
      >
        <PublicIcon name="phone" className="h-4 w-4 shrink-0 text-alfs-orange" />
        <span>{phone}</span>
      </a>
    </div>
  );
}

export async function getPublicContactInfo() {
  const t = await getTranslations("HomePage.footer.contact");
  const phone = t("phone");

  return {
    email: t("email"),
    phone,
    tel: primaryPhoneTel(phone),
    whatsApp: whatsAppHref(phone),
  };
}
