import "server-only";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  bn: () => import("./dictionaries/bn.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

/**
 * Validate locale param and load dictionary in one call.
 * Calls notFound() if the locale is invalid.
 *
 * Usage in any server page/layout:
 *
 * ```ts
 * import { getPageLocale } from "@/i18n/server";
 *
 * export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
 *   const { lang, dict } = await getPageLocale(params);
 *   return <h1>{dict.home.title}</h1>;
 * }
 * ```
 */
export async function getPageLocale(params: Promise<{ lang: string }>) {
  const { lang: langParam } = await params;

  if (!(i18n.locales as readonly string[]).includes(langParam)) notFound();

  const lang = langParam as Locale;
  const dict = await getDictionary(lang);

  return { lang, dict };
}
