"use client";

import { Burger, Group, Text } from "@mantine/core";
import { ColorSchemeToggle } from "@/components/ColorSchemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { appConfig } from "@/app.config";

interface HeaderProps {
  mobileOpened: boolean;
  desktopExpanded: boolean;
  onMobileToggle: () => void;
  onDesktopToggle: () => void;
}

export function Header({
  mobileOpened,
  desktopExpanded,
  onMobileToggle,
  onDesktopToggle,
}: HeaderProps) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={onMobileToggle}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle mobile navigation"
        />
        <Burger
          opened={desktopExpanded}
          onClick={onDesktopToggle}
          visibleFrom="sm"
          size="sm"
          aria-label="Toggle desktop navigation"
        />
        <Text fw={700} size="lg">
          {appConfig.name}
        </Text>
      </Group>
      <Group gap="xs">
        <LocaleSwitcher />
        <ColorSchemeToggle />
      </Group>
    </Group>
  );
}
