"use client";

import {
  ActionIcon,
  Box,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <Box component="span" fz="sm" lightHidden>
        &#x2600;&#xFE0F;
      </Box>
      <Box component="span" fz="sm" darkHidden>
        &#x1F319;
      </Box>
    </ActionIcon>
  );
}
