"use client";

import { IconContext } from "@phosphor-icons/react";

export function IconProvider({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ weight: "duotone", size: 18 }}>
      {children}
    </IconContext.Provider>
  );
}
