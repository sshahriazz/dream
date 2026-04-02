"use client";

import { AppShell, ScrollArea } from "@mantine/core";

interface NavbarProps {
  desktopExpanded: boolean;
  onClose: () => void;
}

export function Navbar({ desktopExpanded }: NavbarProps) {
  return (
    <>
      <AppShell.Section p={desktopExpanded ? "md" : "xs"}>
        {/* Navbar top section — e.g. search, user profile */}
        {/* When collapsed: show icon-only items wrapped in <Tooltip> */}
        {/* When expanded: show full labels */}
      </AppShell.Section>

      <AppShell.Section
        grow
        component={ScrollArea}
        p={desktopExpanded ? "md" : "xs"}
      >
        {/* Scrollable nav links go here */}
        {/* Use <NavLink> or custom links */}
        {/* When collapsed on desktop: show only icons */}
        {/* When expanded: show icon + label */}
      </AppShell.Section>

      <AppShell.Section p={desktopExpanded ? "md" : "xs"}>
        {/* Navbar bottom section — e.g. settings, logout */}
      </AppShell.Section>
    </>
  );
}
