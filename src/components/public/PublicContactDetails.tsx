import {getTranslations} from "next-intl/server";

import {whatsAppHref} from "@/lib/site-routes";

export async function getPublicContactInfo() {
  const t = await getTranslations("HomePage.footer.contact");
  const phone = t("phone");

  return {
    email: t("email"),
    phone,
    whatsApp: whatsAppHref(phone),
  };
}
