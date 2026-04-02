# ─────────────────────────────────────────────────────────────
# Multi-stage Dockerfile for Next.js (standalone output)
# ─────────────────────────────────────────────────────────────
# Stages:
#   1. base    — shared Node.js + pnpm setup
#   2. deps    — install production dependencies
#   3. build   — compile the Next.js app
#   4. runner  — minimal production image (~150MB)
#
# All Next.js features work: SSR, SSG, CSR, ISR, API routes,
# image optimization (sharp), middleware.
# ─────────────────────────────────────────────────────────────

# ── Stage 1: Base ────────────────────────────────────────────
FROM node:25-alpine AS base

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# ── Stage 2: Dependencies ───────────────────────────────────
FROM base AS deps

WORKDIR /app

# Copy lockfile + package.json for cached dependency install
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (dev included — needed for build)
RUN pnpm install --frozen-lockfile

# ── Stage 3: Build ───────────────────────────────────────────
FROM base AS build

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Skip env validation during build — real values injected at runtime
ENV SKIP_ENV_VALIDATION=true
ENV NEXT_TELEMETRY_DISABLED=1
# Dummy URL for build-time page data collection (overridden at runtime)
ENV NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Build the app (standalone output)
RUN pnpm build

# ── Stage 4: Runner (production) ─────────────────────────────
FROM node:25-alpine AS runner

WORKDIR /app

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Disable telemetry in production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Copy public assets
COPY --from=build /app/public ./public

# Copy standalone server + static assets
# Set ownership to nextjs user in one layer
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# ISR: Next.js needs a writable cache directory for on-demand revalidation
# Create it and give nextjs user ownership
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start the standalone server
CMD ["node", "server.js"]
