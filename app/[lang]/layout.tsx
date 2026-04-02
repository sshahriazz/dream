// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/charts/styles.css";

import "../globals.css";

import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/theme";
import { AppShellLayout } from "@/components/AppShell";
import { ColorSchemeSync } from "@/components/ColorSchemeSync";
import {
  COLOR_SCHEME_COOKIE,
  resolveColorScheme,
} from "@/lib/color-scheme";

import type { Metadata } from "next";
import { appConfig } from "@/app.config";
import { i18n, type Locale, LocaleProvider, DatesProvider } from "@/i18n";
import { getDictionary } from "@/i18n/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.url),
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    siteName: appConfig.name,
    locale: appConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  const lang = (i18n.locales as readonly string[]).includes(langParam)
    ? (langParam as Locale)
    : i18n.defaultLocale;
  const dict = await getDictionary(lang);

  // Read color scheme from cookie — set by ColorSchemeSync on the client
  const cookieStore = await cookies();
  const colorSchemeValue = cookieStore.get(COLOR_SCHEME_COOKIE)?.value;
  const resolvedScheme = resolveColorScheme(colorSchemeValue);

  return (
    <html
      lang={lang}
      className={inter.variable}
      {...mantineHtmlProps}
      data-mantine-color-scheme={resolvedScheme}
      suppressHydrationWarning
    >
      <head />
      <body>
        <MantineProvider
          theme={theme}
          defaultColorScheme={colorSchemeValue === "dark" || colorSchemeValue === "light" || colorSchemeValue === "auto" ? colorSchemeValue : "auto"}
        >
          <ColorSchemeSync />
          <LocaleProvider locale={lang} dict={dict}>
            <DatesProvider>
              <Notifications position="top-right" />
              <ModalsProvider>
                <NavigationProgress />
                <AppShellLayout>{children}</AppShellLayout>
              </ModalsProvider>
            </DatesProvider>
          </LocaleProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
