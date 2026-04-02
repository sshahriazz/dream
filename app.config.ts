import packageJson from "./package.json";

export const appConfig = {
  name: packageJson.name.charAt(0).toUpperCase() + packageJson.name.slice(1),
  description: packageJson.description,
  version: packageJson.version,
  author: packageJson.author,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  locale: "en_US",
  language: "en",
} as const;
