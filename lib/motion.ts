import type { Transition, Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;

export const spring = {
  soft: { type: "spring", stiffness: 240, damping: 28, mass: 0.9 },
  snappy: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  // Cards need to settle fast on release, otherwise the overshoot reads as lag.
  drop: { type: "spring", stiffness: 520, damping: 44, mass: 0.6 },
} satisfies Record<string, Transition>;

export const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutQuart } },
};

export function stagger(gap = 0.07, delay = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
}

export const viewportOnce = {
  once: true,
  margin: "-12% 0px -12% 0px",
} as const;
