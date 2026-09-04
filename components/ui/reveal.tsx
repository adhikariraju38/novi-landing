"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { easeOutExpo } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
};

/**
 * Reveals on entry and settles back out on exit, so scrolling up replays the
 * animation instead of leaving a page of already-arrived content behind.
 * Leaving is quicker than arriving, because a slow fade-out reads as a bug.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const Component = motion[as];

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement & HTMLElement>}
      data-reveal
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView || reduced ? 0 : 20,
      }}
      transition={{
        duration: reduced ? 0.25 : inView ? 0.6 : 0.3,
        delay: inView ? delay : 0,
        ease: easeOutExpo,
      }}
    >
      {children}
    </Component>
  );
}
