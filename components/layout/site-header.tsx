"use client";

import { motion, useMotionValueEvent, useScroll, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MenuIcon, NoviMark, SearchIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { useActiveSection } from "@/hooks/use-active-section";
import { nav } from "@/lib/content";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const WATCHED = ["top", "features", "how-it-works", "pricing"] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useOverlay();
  const { scrollY } = useScroll();
  const activeSection = useActiveSection(WATCHED);
  const reduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 12));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-line bg-paper/80 border-b backdrop-blur-md"
            : "border-b border-transparent",
        )}
      >
        <Container className="flex h-16 items-center gap-6">
          <a
            href="#top"
            className="ease-out-quart flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] motion-reduce:hover:scale-100"
          >
            <NoviMark className="text-accent size-7" />
            <span className="font-serif text-2xl tracking-tight">Novi</span>
          </a>

          <nav className="hidden md:flex md:items-center md:gap-1" aria-label="Primary">
            {nav.links.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "ease-out-quart relative rounded-md px-3 py-2 text-sm transition-[color,transform] duration-200",
                    "hover:scale-[1.04] active:scale-[0.96] motion-reduce:hover:scale-100",
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="bg-surface-active absolute inset-0 rounded-md"
                      transition={reduced ? { duration: 0 } : spring.snappy}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => open("command")}
              aria-label="Search ⌘K"
              className="border-line text-ink-faint ease-out-quart hover:border-line-strong hover:text-ink-muted hidden items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-[transform,border-color,color] duration-200 hover:scale-105 active:scale-95 active:duration-75 motion-reduce:hover:scale-100 sm:flex"
            >
              <SearchIcon className="size-3.5" />
              <kbd className="font-mono text-[0.6875rem]">⌘K</kbd>
            </button>

            <ThemeToggle />

            <Button size="sm" onClick={() => open("signup")} className="hidden md:inline-flex">
              {nav.cta.label}
            </Button>

            <IconButton
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden"
            >
              <MenuIcon className="size-5" />
            </IconButton>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
