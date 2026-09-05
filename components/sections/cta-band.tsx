"use client";

import { Button } from "@/components/ui/button";
import { useOverlay } from "@/components/overlay-provider";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { callToAction } from "@/lib/content";

export function CtaBand() {
  const { open } = useOverlay();

  return (
    <section id="get-started" className="border-line scroll-mt-20 border-t py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="border-line bg-surface relative overflow-hidden rounded-2xl border px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,var(--accent-soft),transparent_70%)]"
            />
            <div className="relative">
              <h2 className="text-display-lg text-ink mx-auto max-w-[20ch] font-serif">
                {callToAction.heading} <em className="text-accent">{callToAction.emphasis}</em>
              </h2>
              <p className="text-lead text-ink-muted mx-auto mt-5 max-w-lg">
                {callToAction.supporting}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={() => open("signup")}>
                  {callToAction.primary.label}
                </Button>
                <Button variant="secondary" size="lg" onClick={() => open("contact")}>
                  {callToAction.secondary.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
