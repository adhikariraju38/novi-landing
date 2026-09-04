"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/hooks/use-is-client";
import { IconButton } from "./icon-button";
import { CloseIcon } from "@/components/icons";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  labelledBy?: string;
  align?: "center" | "top";
  className?: string;
  children: React.ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  labelledBy,
  align = "center",
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const mounted = useIsClient();
  const reduced = useReducedMotion();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    // Padding compensates for the vanishing scrollbar so the page doesn't jump.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? panelRef.current;
      target?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restoreFocusTo.current?.focus();
    };
  }, [open, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex justify-center p-4 sm:p-6",
            align === "center" ? "items-center" : "items-start pt-[12vh]",
          )}
        >
          <motion.div
            className="bg-ink/25 absolute inset-0 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={labelledBy ? undefined : title}
            aria-labelledby={labelledBy}
            aria-describedby={description ? "modal-description" : undefined}
            tabIndex={-1}
            className={cn(
              "border-line bg-surface shadow-float relative flex max-h-[calc(100dvh-4rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border outline-none",
              className,
            )}
            initial={{
              opacity: 0,
              scale: reduced ? 1 : 0.97,
              y: reduced ? 0 : 12,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.98, y: reduced ? 0 : 8 }}
            transition={{ duration: reduced ? 0.15 : 0.32, ease: easeOutExpo }}
          >
            {title && (
              <header className="border-line flex shrink-0 items-start justify-between gap-6 border-b px-6 py-5">
                <div>
                  <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
                  {description && (
                    <p id="modal-description" className="text-ink-muted mt-1 text-sm">
                      {description}
                    </p>
                  )}
                </div>
                <IconButton
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="text-ink-faint -mt-0.5 -mr-1.5 size-8"
                >
                  <CloseIcon className="size-[18px]" />
                </IconButton>
              </header>
            )}
            <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
