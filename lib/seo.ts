import type { Metadata } from "next";
import { appConfig } from "@/app.config";
import type { Locale } from "@/i18n";
import { i18n } from "@/i18n";

interface SeoInput {
  /** Page title — gets templated as "title | SiteName" automatically */
  title: string;
  /** Current locale */
  locale?: Locale;
  /** Page description for search results and social cards */
  description?: string;
  /** Canonical URL path, e.g. "/blog/my-post" (base URL is prepended) */
  path?: string;
  /** OG image URL or path — defaults to site-wide OG image */
  image?: string;
  /** Set to true to prevent indexing */
  noIndex?: boolean;
  /** Additional keywords */
  keywords?: string[];
  /** Override openGraph type (default: "website") */
  type?: "website" | "article";
  /** Article-specific metadata */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
}

/**
 * Build a complete Next.js Metadata object from minimal input.
 *
 * Usage in any page.tsx or layout.tsx (server components only):
 *
 * ```ts
 * import { seo } from "@/lib/seo";
 *
 * export const metadata = seo({
 *   title: "Dashboard",
 *   description: "View your analytics",
 * });
 * ```
 *
 * For dynamic pages with generateMetadata:
 *
 * ```ts
 * import { seo } from "@/lib/seo";
 *
 * export async function generateMetadata({ params }) {
 *   const post = await getPost((await params).slug);
 *   return seo({
 *     title: post.title,
 *     description: post.excerpt,
 *     path: `/blog/${post.slug}`,
 *     type: "article",
 *     article: {
 *       publishedTime: post.createdAt,
 *       authors: [post.author],
 *       tags: post.tags,
 *     },
 *   });
 * }
 * ```
 */
export function seo(input: SeoInput): Metadata {
  const {
    title,
    locale,
    description = appConfig.description,
    path,
    image,
    noIndex = false,
    keywords,
    type = "website",
    article,
  } = input;

  const lang = locale || i18n.defaultLocale;
  const url = path ? `${appConfig.url}/${lang}${path}` : undefined;
  const ogImage = image?.startsWith("http")
    ? image
    : `${appConfig.url}${image || "/opengraph-image.png"}`;

  // Build hreflang alternates when a path is provided
  const languages: Record<string, string> = {};
  if (path) {
    for (const l of i18n.locales) {
      languages[l] = `${appConfig.url}/${l}${path}`;
    }
  }

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      ...(url && { canonical: url }),
      ...(path && { languages }),
    },

    openGraph: {
      title,
      description,
      siteName: appConfig.name,
      locale: lang,
      type,
      ...(url && { url }),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" && article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            tags: article.tags,
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
        },
  };
}
