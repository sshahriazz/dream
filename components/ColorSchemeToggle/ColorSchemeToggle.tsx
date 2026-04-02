"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Tooltip,
} from "@mantine/core";
import { Sun, Moon } from "@phosphor-icons/react";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";

  const toggleColorScheme = () => {
    setColorScheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip label={isDark ? "Light mode" : "Dark mode"}>
      <ActionIcon
        onClick={toggleColorScheme}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {isDark ? <Sun /> : <Moon />}
      </ActionIcon>
    </Tooltip>
  );
}
