import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/form",
      "@mantine/dates",
      "@mantine/notifications",
      "@mantine/modals",
      "@mantine/nprogress",
      "@mantine/spotlight",
      "@mantine/carousel",
      "@mantine/charts",
      "@mantine/dropzone",
      "@phosphor-icons/react",
    ],
  },
};

export default nextConfig;
