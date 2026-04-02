"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, ActionIcon } from "@mantine/core";
import { useLocale, i18n, localeLabels, type Locale } from "@/i18n";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Replace the locale segment in the pathname
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <Menu shadow="md" width={160}>
      <Menu.Target>
        <ActionIcon variant="default" size="lg" aria-label="Switch language">
          {locale.toUpperCase()}
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {i18n.locales.map((l) => (
          <Menu.Item
            key={l}
            onClick={() => switchLocale(l)}
            fw={l === locale ? 700 : 400}
            bg={l === locale ? "var(--mantine-primary-color-light)" : undefined}
          >
            {localeLabels[l]}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
