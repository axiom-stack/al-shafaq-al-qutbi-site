import { Cairo, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { getDirection, type Locale } from "@/i18n/routing";
import { LocaleClientSync } from "@/components/public/LocaleClientSync";
import { PageTransitionProvider } from "@/components/public/PageTransitionProvider";

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
          </PageTransitionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
