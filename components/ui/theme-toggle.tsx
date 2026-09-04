"use client";

import { useTheme } from "@/components/theme-provider";
import { IconButton } from "./icon-button";
import { MoonIcon, SunIcon } from "@/components/icons";

/**
 * Both icons render and CSS picks the visible one, so the button matches the
 * pre-paint theme without waiting for hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <IconButton onClick={toggle} aria-label="Toggle colour theme" className={className}>
      <SunIcon className="size-[18px] dark:hidden" />
      <MoonIcon className="hidden size-[18px] dark:block" />
    </IconButton>
  );
}
