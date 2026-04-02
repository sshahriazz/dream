import type { MetadataRoute } from "next";
import { appConfig } from "@/app.config";
import { i18n } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const localeEntries = i18n.locales.map((lang) => ({
    url: `${appConfig.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  return [
    ...localeEntries,
    // Add more routes as your app grows, e.g.:
    // ...i18n.locales.map((lang) => ({
    //   url: `${appConfig.url}/${lang}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: "monthly" as const,
    //   priority: 0.8,
    // })),
  ];
}
