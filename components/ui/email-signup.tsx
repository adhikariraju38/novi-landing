"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { Button } from "./button";
import { CheckIcon } from "@/components/icons";
import { easeOutExpo } from "@/lib/motion";
import { useEmailSubmit } from "@/hooks/use-email-submit";
import { footer } from "@/lib/content";
import { cn } from "@/lib/utils";

export function EmailSignup() {
  const { email, status, change, submit } = useEmailSubmit();
  const inputId = useId();
  const reduced = useReducedMotion();

  return (
    <div className="max-w-sm">
      <h3 className="text-ink text-[0.9375rem] font-medium">{footer.newsletter.title}</h3>
      <p className="text-ink-muted mt-2 text-sm leading-relaxed">{footer.newsletter.body}</p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.p
            key="done"
            className="text-ink mt-5 flex items-center gap-2 text-sm font-medium"
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
          >
            <span className="bg-accent text-accent-ink grid size-5 place-items-center rounded-full">
              <CheckIcon className="size-3" strokeWidth={2.5} />
            </span>
            {footer.newsletter.success}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            className="mt-5"
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <div
              className={cn(
                "bg-surface focus-within:border-accent flex items-center gap-1 rounded-md border p-1 transition-colors duration-200",
                status === "invalid" ? "border-danger" : "border-line",
              )}
            >
              <input
                id={inputId}
                type="email"
                value={email}
                onChange={(event) => change(event.target.value)}
                placeholder={footer.newsletter.placeholder}
                aria-invalid={status === "invalid"}
                aria-describedby={status === "invalid" ? `${inputId}-error` : undefined}
                className="text-ink placeholder:text-ink-faint h-9 min-w-0 flex-1 bg-transparent px-2.5 text-sm outline-none"
              />
              <Button type="submit" size="sm" disabled={status === "submitting"}>
                {status === "submitting" ? "Joining…" : footer.newsletter.action}
              </Button>
            </div>

            {status === "invalid" && (
              <p id={`${inputId}-error`} role="alert" className="text-danger mt-2 text-xs">
                That doesn’t look like an email address.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
