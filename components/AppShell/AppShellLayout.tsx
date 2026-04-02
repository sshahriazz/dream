"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

const NAVBAR_WIDTH = 280;
const NAVBAR_WIDTH_MINI = 72;

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure();
  const [desktopExpanded, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: desktopExpanded ? NAVBAR_WIDTH : NAVBAR_WIDTH_MINI,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
      transitionDuration={300}
      transitionTimingFunction="ease"
    >
      <AppShell.Header>
        <Header
          mobileOpened={mobileOpened}
          desktopExpanded={desktopExpanded}
          onMobileToggle={toggleMobile}
          onDesktopToggle={toggleDesktop}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar desktopExpanded={desktopExpanded} onClose={closeMobile} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
