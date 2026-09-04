"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Overlay = "command" | "demo" | "signup" | "contact" | null;

type OverlayContextValue = {
  active: Overlay;
  open: (overlay: Exclude<Overlay, null>) => void;
  close: () => void;
};

const OverlayContext = createContext<OverlayContextValue | null>(null);

/** One overlay at a time, so the palette and the demo can never stack. */
export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Overlay>(null);

  const value = useMemo<OverlayContextValue>(
    () => ({ active, open: setActive, close: () => setActive(null) }),
    [active],
  );

  return <OverlayContext value={value}>{children}</OverlayContext>;
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) throw new Error("useOverlay must be used inside OverlayProvider");
  return context;
}
