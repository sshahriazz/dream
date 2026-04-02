import packageJson from "./package.json";
import { env } from "@/lib/env";

export const appConfig = {
  name: packageJson.name.charAt(0).toUpperCase() + packageJson.name.slice(1),
  description: packageJson.description,
  version: packageJson.version,
  author: packageJson.author,
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "en_US",
  language: "en",
} as const;
