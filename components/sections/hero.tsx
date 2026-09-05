"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WorkspacePreview } from "@/components/workspace/workspace-preview";
import { PlayIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { hero } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";

export function Hero() {
  const reduced = useReducedMotion();
  const { open } = useOverlay();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  const step = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: {
      opacity: inView ? 1 : 0,
      y: inView || reduced ? 0 : 16,
    },
    transition: {
      duration: inView ? 0.7 : 0.3,
      delay: inView && !reduced ? index * 0.08 : 0,
      ease: easeOutExpo,
    },
  });

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
      {/* Soft wash that lifts the workspace card off the page without a hard gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-[38rem] bg-[radial-gradient(ellipse_45%_45%_at_50%_50%,var(--accent-soft),transparent_70%)]"
      />

      <Container className="relative">
        <motion.p
          {...step(0)}
          className="text-meta text-ink-faint flex items-center gap-2 font-mono tracking-[0.13em] uppercase"
        >
          <span className="bg-accent size-1.5 rounded-full" />
          {hero.eyebrow}
        </motion.p>

        <motion.h1 {...step(1)} className="text-display-xl text-ink mt-6 max-w-[19ch] font-serif">
          {hero.headline.lead} <em className="text-accent">{hero.headline.emphasis}</em>
        </motion.h1>

        <motion.p {...step(2)} className="text-lead text-ink-muted mt-6 max-w-xl">
          {hero.supporting}
        </motion.p>

        <motion.div {...step(3)} className="mt-9 flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => open("signup")}>
            {hero.primary.label}
          </Button>
          <Button variant="secondary" size="lg" onClick={() => open("demo")}>
            <PlayIcon className="text-accent size-4" />
            {hero.secondary.label}
          </Button>
        </motion.div>

        <motion.p {...step(4)} className="text-ink-faint mt-4 text-sm">
          {hero.note}
        </motion.p>

        <motion.div
          className="mt-14 sm:mt-16"
          initial={{
            opacity: 0,
            y: reduced ? 0 : 32,
            scale: reduced ? 1 : 0.985,
          }}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView || reduced ? 0 : 32,
            scale: inView || reduced ? 1 : 0.985,
          }}
          transition={{
            duration: inView ? 0.9 : 0.3,
            delay: inView && !reduced ? 0.35 : 0,
            ease: easeOutExpo,
          }}
        >
          <WorkspacePreview id="hero-board" />
          <p className="text-ink-faint mt-3.5 text-center text-sm">
            This one is live. Drag a card between columns, or switch the view.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
