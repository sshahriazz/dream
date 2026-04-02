import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // ── Server-side variables ──────────────────────────────
  // Only available in server components, API routes, middleware.
  // Never exposed to the browser.
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    // Add server-only vars here as the project grows, e.g.:
    // DATABASE_URL: z.string().url(),
    // AUTH_SECRET: z.string().min(32),
    // REDIS_URL: z.string().url().optional(),
  },

  // ── Client-side variables ──────────────────────────────
  // Must be prefixed with NEXT_PUBLIC_.
  // Available in both server and client code.
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },

  // ── Shared variables ───────────────────────────────────
  // Available everywhere without NEXT_PUBLIC_ prefix.
  // Useful for vars set by the framework itself.
  shared: {},

  // Next.js 13.4.4+ can skip manual runtime env destructuring
  // for server vars. Only client vars need explicit mapping.
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },

  // Skip validation in edge cases (e.g., Docker builds without secrets)
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",

  // Filter empty strings — treat "" as undefined
  emptyStringAsUndefined: true,
});
