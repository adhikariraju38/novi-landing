"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CloseIcon, NoviMark, PlayIcon, socialIcons } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { easeOutExpo } from "@/lib/motion";
import { footer, hero, nav } from "@/lib/content";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();
  const { open: openOverlay } = useOverlay();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const entrance = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      delay: reduced ? 0 : 0.06 + index * 0.05,
      ease: easeOutExpo,
    },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="bg-paper fixed inset-0 z-50 flex flex-col md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: easeOutExpo }}
        >
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <span className="flex items-center gap-2">
              <NoviMark className="text-accent size-7" />
              <span className="font-serif text-2xl tracking-tight">Novi</span>
            </span>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <IconButton onClick={onClose} aria-label="Close menu" autoFocus>
                <CloseIcon className="size-5" />
              </IconButton>
            </div>
          </div>

          <nav className="flex flex-1 flex-col px-5 pt-4" aria-label="Mobile">
            {nav.links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-line text-ink ease-out-quart border-b py-5 font-serif text-3xl tracking-tight transition-transform duration-200 active:scale-[0.98] motion-reduce:active:scale-100"
                {...entrance(index)}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div className="mt-8 flex flex-col gap-3" {...entrance(nav.links.length)}>
              <Button
                size="lg"
                onClick={() => {
                  onClose();
                  openOverlay("signup");
                }}
              >
                {nav.cta.label}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  onClose();
                  openOverlay("demo");
                }}
              >
                <PlayIcon className="text-accent size-4" />
                {hero.secondary.label}
              </Button>
            </motion.div>

            <motion.div
              className="mt-auto flex items-center justify-between gap-4 py-6"
              {...entrance(nav.links.length + 1)}
            >
              <p className="text-ink-faint max-w-[16rem] text-xs leading-relaxed">
                {footer.tagline}
              </p>
              <ul className="flex items-center gap-1">
                {footer.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="text-ink-faint ease-out-quart hover:bg-surface-active hover:text-ink grid size-8 place-items-center rounded-md transition-[transform,background-color,color] duration-200 hover:scale-110 active:scale-90 motion-reduce:hover:scale-100"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
