export const COLOR_SCHEME_COOKIE = "mantine-color-scheme";

export type ColorScheme = "light" | "dark" | "auto";

export function resolveColorScheme(
  value: string | undefined
): "light" | "dark" {
  if (value === "light" || value === "dark") return value;
  // "auto" or unknown — default to light on server
  // (server can't detect system preference)
  return "light";
}
