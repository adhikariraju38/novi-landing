"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { CheckIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { pricing } from "@/lib/content";
import { easeOutExpo, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Cycle = "monthly" | "yearly";

function BillingToggle({ cycle, onChange }: { cycle: Cycle; onChange: (next: Cycle) => void }) {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="border-line bg-surface inline-flex rounded-lg border p-1"
      >
        {(["monthly", "yearly"] as const).map((option) => {
          const selected = cycle === option;
          return (
            <button
              key={option}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option)}
              className={cn(
                "relative rounded-md px-4 py-1.5 text-sm font-medium",
                "ease-out-quart transition-[color,transform] duration-200",
                "active:scale-95 active:duration-75 motion-reduce:active:scale-100",
                selected ? "text-ink" : "text-ink-faint hover:text-ink-muted",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="billing-cycle"
                  className="bg-surface-active absolute inset-0 rounded-md"
                  transition={reduced ? { duration: 0 } : spring.snappy}
                />
              )}
              <span className="relative">{pricing.billing[option]}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {cycle === "yearly" && (
          <motion.span
            className="border-accent/30 bg-accent-soft text-accent rounded-full border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] uppercase"
            initial={{ opacity: 0, x: reduced ? 0 : -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : -6 }}
            transition={{ duration: 0.24, ease: easeOutExpo }}
          >
            {pricing.billing.saving}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Price({ amount, reserve, cycle }: { amount: number; reserve: number; cycle: Cycle }) {
  const reduced = useReducedMotion();

  if (amount === 0) {
    return (
      <p className="flex items-baseline gap-1.5">
        <span className="text-ink font-serif text-5xl tracking-tight">$0</span>
        <span className="text-ink-faint text-sm">forever</span>
      </p>
    );
  }

  return (
    <p className="flex items-baseline gap-1.5">
      <span className="text-ink relative inline-flex font-serif text-5xl tracking-tight">
        {/* Reserves this plan's widest price so the row never shifts on toggle. */}
        <span aria-hidden className="invisible">
          ${reserve}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={amount}
            className="absolute inset-0"
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: reduced ? 0.12 : 0.26, ease: easeOutExpo }}
          >
            ${amount}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-ink-faint text-sm">
        per person / {cycle === "yearly" ? "mo, billed yearly" : "mo"}
      </span>
    </p>
  );
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const { open } = useOverlay();

  return (
    <section id="pricing" className="border-line scroll-mt-20 border-t py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={pricing.eyebrow}
          heading={pricing.heading}
          supporting={pricing.supporting}
        />

        <Reveal className="mt-10">
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </Reveal>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => (
            <Reveal as="li" key={plan.id} delay={index * 0.07}>
              <article
                className={cn(
                  "ease-out-quart relative flex h-full flex-col rounded-xl border p-6 transition-[transform,border-color,box-shadow] duration-300 sm:p-7",
                  "hover:shadow-lift hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                  plan.featured
                    ? "border-accent/40 bg-surface shadow-lift lg:-mt-3"
                    : "border-line bg-surface hover:border-line-strong",
                )}
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-meta text-ink-faint font-mono tracking-[0.13em] uppercase">
                    {plan.name}
                  </h3>
                  {"badge" in plan && plan.badge && (
                    <span className="bg-accent text-accent-ink rounded-full px-2 py-0.5 font-mono text-[0.5625rem] tracking-[0.1em] uppercase">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <div className="mt-5">
                  <Price
                    amount={cycle === "yearly" ? plan.yearly : plan.monthly}
                    reserve={plan.monthly}
                    cycle={cycle}
                  />
                </div>

                <p className="text-ink-muted mt-4 text-[0.9375rem] leading-relaxed">
                  {plan.tagline}
                </p>

                <ul className="border-line mt-7 flex-1 space-y-3 border-t pt-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full",
                          plan.featured
                            ? "bg-accent text-accent-ink"
                            : "bg-accent-soft text-accent",
                        )}
                      >
                        <CheckIcon className="size-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-ink-muted text-[0.9375rem] leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.featured ? "primary" : "secondary"}
                  size="lg"
                  onClick={() => open(plan.id === "studio" ? "contact" : "signup")}
                  className="mt-8 w-full"
                >
                  {plan.cta}
                </Button>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="text-ink-faint max-w-2xl text-sm leading-relaxed">{pricing.footnote}</p>
        </Reveal>
      </Container>
    </section>
  );
}
