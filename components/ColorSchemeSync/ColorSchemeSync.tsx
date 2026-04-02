"use client";

import { useEffect } from "react";
import { useMantineColorScheme } from "@mantine/core";
import { COLOR_SCHEME_COOKIE } from "@/lib/color-scheme";

/**
 * Syncs Mantine's color scheme state to a cookie so the server
 * can read it on the next request and render the correct theme
 * in the initial HTML — zero flash, zero script tags.
 */
export function ColorSchemeSync() {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    document.cookie = `${COLOR_SCHEME_COOKIE}=${colorScheme};path=/;max-age=31536000;SameSite=Lax`;
  }, [colorScheme]);

  return null;
}
