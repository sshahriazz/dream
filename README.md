# Dream

A production-ready Next.js 16 + Mantine 9 starter with multilingual support, dark mode, and developer tooling preconfigured.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Mantine 9** (UI, forms, dates, notifications, modals, charts, carousel, spotlight, dropzone)
- **PostCSS** with `postcss-preset-mantine` (CSS Modules, not Tailwind)
- **Phosphor Icons** (duotone)
- **TypeScript** (strict)
- **pnpm**

## Getting Started

```bash
# 1. Clone and install
pnpm install

# 2. Copy environment variables
cp .env.example .env.local

# 3. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/en` (or your browser's preferred locale).

## Environment Variables

| Variable               | Description                                   | Required |
| ---------------------- | --------------------------------------------- | -------- |
| `NEXT_PUBLIC_SITE_URL` | Production URL (used in SEO, sitemap, robots) | Yes      |

See `.env.example` for the full template.

## Project Structure

```
app/
  [lang]/              # All pages live under the locale segment
    layout.tsx         # Root layout (providers, fonts, theme, i18n)
    page.tsx           # Home page
    loading.tsx        # Skeleton loading UI for route transitions
    error.tsx          # Error boundary (500)
    not-found.tsx      # 404 page
  global-error.tsx     # Root layout error fallback
  globals.css          # Global styles
  robots.ts            # Programmatic robots.txt
  sitemap.ts           # Programmatic sitemap.xml

components/
  AppShell/            # AppShellLayout, Header, Navbar (mini sidebar on desktop)
  AppLink/             # Next.js Link + Mantine Anchor (Styles API supported)
  AppImage/            # Next.js Image + Mantine Image (Styles API supported)
  ColorSchemeToggle/   # Dark/light mode toggle button
  ColorSchemeSync/     # Syncs color scheme to cookie (prevents flash)
  LocaleSwitcher/      # Language dropdown switcher

i18n/
  config.ts            # Supported locales, default locale, Locale type
  dictionaries/        # Translation JSON files (en.json, bn.json)
  get-dictionary.ts    # Server-only dictionary loader + getPageLocale helper
  locale-context.tsx   # LocaleProvider, useLocale(), useDictionary()
  dates-provider.tsx   # Mantine DatesProvider wired to current locale
  locale-labels.ts     # Display names for each locale
  index.ts             # Client-safe barrel exports
  server.ts            # Server-only barrel exports

lib/
  seo.ts               # SEO utility — builds full Metadata from minimal input
  notify.ts            # Notification helpers (success, error, warning, info, loading)
  routes.ts            # Centralized route constants
  color-scheme.ts      # Cookie name + color scheme resolver

theme/
  index.ts             # Mantine createTheme() with component defaults

app.config.ts          # App-wide constants (name, version, URL — from package.json)
proxy.ts               # Locale detection + redirect (replaces middleware in Next.js 16)
postcss.config.mjs     # Mantine PostCSS preset + breakpoint variables
```

## Styling

This project uses **Mantine PostCSS preset + CSS Modules**. No Tailwind.

```css
/* components/MyComponent/MyComponent.module.css */
.root {
  background: light-dark(
    var(--mantine-color-white),
    var(--mantine-color-dark-7)
  );
  padding: rem(16px);

  @mixin smaller-than $mantine-breakpoint-sm {
    padding: rem(8px);
  }
}
```

Available PostCSS features: `rem()`, `em()`, `light-dark()`, `@mixin dark`, `@mixin hover`, responsive breakpoint mixins, nested CSS.

## Dark Mode

Color scheme is persisted via **cookies** (not localStorage scripts). The server reads the cookie and renders the correct theme in the initial HTML — zero flash, zero hydration warnings.

- Toggle: `ColorSchemeToggle` component in the header
- Programmatic: `useMantineColorScheme()` hook
- Supports: light, dark, auto (system preference)

## Internationalization (i18n)

Two languages preconfigured: **English** (`en`) and **Bangla** (`bn`).

### In server components

```tsx
import { getPageLocale } from "@/i18n/server";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang, dict } = await getPageLocale(params);
  return <h1>{dict.home.title}</h1>;
}
```

### In client components

```tsx
import { useDictionary, useLocale } from "@/i18n";

function MyComponent() {
  const dict = useDictionary();
  const locale = useLocale(); // "en" | "bn"
  return <p>{dict.common.appName}</p>;
}
```

### Adding a new language

1. Add the locale code to `i18n/config.ts` `locales` array
2. Create `i18n/dictionaries/<code>.json` (copy `en.json` as a starting point)
3. Add the dynamic import in `i18n/get-dictionary.ts`
4. Add the display label in `i18n/locale-labels.ts`

Proxy, sitemap, static params, and the locale switcher pick it up automatically.

## SEO

Root layout sets `metadataBase`, title template (`%s | Dream`), and global OG/Twitter/robots defaults.

For individual pages, use the `seo()` helper:

```tsx
import { seo } from "@/lib/seo";

// Static page
export const metadata = seo({
  title: "Dashboard",
  description: "View your analytics",
  path: "/dashboard",
  locale: "en",
});

// Dynamic page
export async function generateMetadata({ params }) {
  const post = await getPost((await params).slug);
  return seo({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    article: { publishedTime: post.createdAt },
  });
}
```

Generates: title, description, canonical URL, hreflang alternates for all locales, OpenGraph, Twitter Card, and robots directives.

## Icons

Uses [Phosphor Icons](https://phosphoricons.com/) with the **duotone** weight as the default style.

```tsx
import { House, Gear } from "@phosphor-icons/react";

<House size={24} weight="duotone" />
<Gear size={20} weight="duotone" />
```

ESLint enforces:

- **`phosphor/require-weight-prop`** (warn) — every icon must have an explicit `weight` prop
- **`no-restricted-imports`** (error) — prevents importing from `@phosphor-icons/react/ssr` (Next.js `optimizePackageImports` handles tree-shaking automatically)

## Notifications

```tsx
import { notify } from "@/lib/notify";

notify.success({ message: "Saved!" });
notify.error({ message: "Failed to save" });
notify.warning({ message: "Check your input" });
notify.info({ message: "Update available" });

// Loading → done pattern
notify.loading({ id: "save", message: "Saving..." });
notify.loaded({ id: "save", message: "Saved!" });
```

## Reusable Components

### AppLink

Next.js `Link` + Mantine `Anchor` with full Styles API support:

```tsx
import { AppLink } from "@/components/AppLink";

<AppLink href="/dashboard" fw={600} c="blue" underline="hover">
  Dashboard
</AppLink>;
```

### AppImage

Next.js `Image` + Mantine `Image` with full Styles API support:

```tsx
import { AppImage } from "@/components/AppImage";

<AppImage src="/hero.jpg" alt="Hero" width={800} height={400} radius="md" />;
```

## App Configuration

All app-wide constants live in `app.config.ts` and pull from `package.json`:

```tsx
import { appConfig } from "@/app.config";

appConfig.name; // "Dream" (capitalized from package.json name)
appConfig.description; // from package.json description
appConfig.version; // from package.json version
appConfig.author; // from package.json author
appConfig.url; // from NEXT_PUBLIC_SITE_URL env var
```

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Start dev server (Turbopack)   |
| `pnpm build`        | Production build               |
| `pnpm start`        | Start production server        |
| `pnpm lint`         | Run ESLint                     |
| `pnpm format`       | Format all files with Prettier |
| `pnpm format:check` | Check formatting (CI)          |

## Git Hooks

Enforced automatically via Husky — no manual setup needed after `pnpm install`.

### pre-commit

1. **lint-staged** — ESLint fix + Prettier format on staged files
2. **tsc --noEmit** — full TypeScript type check

### commit-msg

Validates [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add user dashboard        # valid
fix: resolve dark mode flash     # valid
refactor(i18n): simplify loader  # valid
"updated stuff"                  # rejected
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

## VS Code

Workspace settings are included in `.vscode/`:

- **Format on save** via Prettier
- **ESLint auto-fix on save**
- **Recommended extensions**: Prettier, ESLint
