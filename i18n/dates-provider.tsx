"use client";

import "dayjs/locale/bn";

import { DatesProvider as MantineDatesProvider } from "@mantine/dates";
import { useLocale } from "./locale-context";

export function DatesProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <MantineDatesProvider settings={{ locale }}>
      {children}
    </MantineDatesProvider>
  );
}
