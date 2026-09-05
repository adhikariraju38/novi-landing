"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useId } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { CheckIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { useEmailSubmit } from "@/hooks/use-email-submit";
import { signup } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SignupModal() {
  const { active, close } = useOverlay();
  const { email, status, change, submit, reset } = useEmailSubmit();
  const inputId = useId();
  const reduced = useReducedMotion();

  const isOpen = active === "signup";

  const dismiss = useCallback(() => {
    reset();
    close();
  }, [reset, close]);

  return (
    <Modal
      open={isOpen}
      onClose={dismiss}
      title={signup.title}
      description={signup.description}
      className="max-w-md"
    >
      <div className="p-6">
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
            >
              <span className="bg-accent text-accent-ink grid size-10 place-items-center rounded-full">
                <CheckIcon className="size-5" strokeWidth={2.5} />
              </span>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">{signup.success}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">{signup.successBody}</p>
              <Button variant="secondary" size="md" onClick={dismiss} className="mt-6 w-full">
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={submit}
              noValidate
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor={inputId} className="text-ink text-sm font-medium">
                Work email
              </label>
              <input
                id={inputId}
                type="email"
                value={email}
                onChange={(event) => change(event.target.value)}
                placeholder={signup.placeholder}
                autoComplete="email"
                aria-invalid={status === "invalid"}
                aria-describedby={status === "invalid" ? `${inputId}-error` : undefined}
                className={cn(
                  "bg-surface text-ink mt-2 h-11 w-full rounded-md border px-3.5 text-[0.9375rem] outline-none",
                  "placeholder:text-ink-faint focus:border-accent transition-colors duration-200",
                  status === "invalid" ? "border-danger" : "border-line",
                )}
              />

              {status === "invalid" && (
                <p id={`${inputId}-error`} role="alert" className="text-danger mt-2 text-xs">
                  That doesn&rsquo;t look like an email address.
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="mt-5 w-full"
              >
                {status === "submitting" ? "Setting things up…" : signup.action}
              </Button>

              <p className="text-ink-faint mt-4 text-center text-xs leading-relaxed">
                {signup.note}
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
