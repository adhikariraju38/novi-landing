"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { WorkspacePreview } from "@/components/workspace/workspace-preview";
import { ArrowRightIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { howItWorks } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function DemoModal() {
  const { active, close, open } = useOverlay();
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();

  const isOpen = active === "demo";

  const dismiss = useCallback(() => {
    setStep(0);
    close();
  }, [close]);
  const current = howItWorks.steps[step];
  const isLast = step === howItWorks.steps.length - 1;

  return (
    <Modal
      open={isOpen}
      onClose={dismiss}
      title="How Novi works"
      description="Three views over the same work."
      className="max-w-2xl"
    >
      <div className="p-5 sm:p-6">
        <WorkspacePreview
          id="demo-board"
          view={current.view}
          onViewChange={(view) => setStep(howItWorks.steps.findIndex((item) => item.view === view))}
          className="shadow-none"
        />

        <div className="mt-5 min-h-[4.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: reduced ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{ duration: 0.22, ease: easeOutExpo }}
            >
              <h3 className="font-serif text-xl tracking-tight">{current.title}</h3>
              <p className="text-ink-muted mt-1.5 text-sm leading-relaxed">{current.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-line mt-5 flex items-center gap-4 border-t pt-5">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Demo steps">
            {howItWorks.steps.map((item, index) => (
              <button
                key={item.view}
                role="tab"
                aria-selected={index === step}
                aria-label={item.title}
                onClick={() => setStep(index)}
                className={cn(
                  "ease-out-quart h-1.5 rounded-full transition-all duration-300 active:scale-90 active:duration-75",
                  index === step ? "bg-accent w-6" : "bg-line-strong hover:bg-ink-faint w-1.5",
                )}
              />
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={dismiss}>
              Close
            </Button>
            {isLast ? (
              <Button
                size="sm"
                onClick={() => {
                  dismiss();
                  open("signup");
                }}
              >
                Start free
              </Button>
            ) : (
              <Button size="sm" onClick={() => setStep((value) => value + 1)}>
                Next
                <ArrowRightIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
