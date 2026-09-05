"use client";

import { useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "./section-heading";
import { WorkspacePreview } from "@/components/workspace/workspace-preview";
import { howItWorks } from "@/lib/content";
import { cn } from "@/lib/utils";

function Step({
  index,
  step,
  active,
  onEnter,
}: {
  index: number;
  step: (typeof howItWorks.steps)[number];
  active: boolean;
  onEnter: (index: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A band across the middle of the viewport decides which step is "current".
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li id={`step-${step.view}`} ref={ref} className="relative py-8 lg:py-20">
      <div
        className={cn(
          "absolute top-8 bottom-8 -left-px w-px transition-colors duration-500 lg:top-20 lg:bottom-20",
          active ? "bg-accent" : "bg-transparent",
        )}
      />
      <p
        className={cn(
          "font-mono text-[0.625rem] tracking-[0.13em] uppercase transition-colors duration-500",
          active ? "text-accent" : "text-ink-faint",
        )}
      >
        {String(index + 1).padStart(2, "0")} · {step.view}
      </p>
      <h3
        className={cn(
          "text-display-md mt-4 font-serif transition-colors duration-500",
          active ? "text-ink" : "text-ink-faint",
        )}
      >
        {step.title}
      </h3>
      <p
        className={cn(
          "mt-3 max-w-md text-[0.9375rem] leading-relaxed transition-colors duration-500",
          active ? "text-ink-muted" : "text-ink-faint",
        )}
      >
        {step.body}
      </p>
    </li>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const onEnter = useCallback((index: number) => setActive(index), []);

  // The view here follows the scroll position, so a tab click moves the scroll
  // rather than the view, since the click would otherwise be undone next frame.
  const jumpToStep = useCallback((view: string) => {
    document.getElementById(`step-${view}`)?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <section id="how-it-works" className="border-line scroll-mt-20 border-t py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          heading={howItWorks.heading}
          supporting={howItWorks.supporting}
        />

        <div className="mt-12 lg:mt-4 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
          <div className="mb-10 lg:sticky lg:top-24 lg:order-last lg:mb-0">
            <WorkspacePreview
              id="tour-board"
              view={howItWorks.steps[active].view}
              onViewChange={jumpToStep}
            />
          </div>

          <ol className="border-line border-l lg:order-first [&>li]:pl-6 lg:[&>li]:pl-8">
            {howItWorks.steps.map((step, index) => (
              <Step
                key={step.view}
                index={index}
                step={step}
                active={index === active}
                onEnter={onEnter}
              />
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
