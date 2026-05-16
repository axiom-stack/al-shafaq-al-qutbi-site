import { Cairo, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { getDirection, type Locale } from "@/i18n/routing";
import { LocaleClientSync } from "@/components/public/LocaleClientSync";
import { PageTransitionProvider } from "@/components/public/PageTransitionProvider";
import { FloatingWhatsApp } from "@/components/public/FloatingWhatsApp";
import { getPublicContactInfo } from "@/components/public/PublicContactDetails";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as Locale;
  const dir = getDirection(locale);
  const contact = await getPublicContactInfo();

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${montserrat.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-on-surface">
        <NextIntlClientProvider>
          <PageTransitionProvider>
            <LocaleClientSync />
            {children}
            <FloatingWhatsApp whatsAppHref={contact.whatsApp} />
          </PageTransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
