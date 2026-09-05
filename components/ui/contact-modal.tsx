"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useId, useState } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { CheckIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { useEmailSubmit } from "@/hooks/use-email-submit";
import { contact } from "@/lib/content";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ContactModal() {
  const { active, close } = useOverlay();
  const { email, status, change, submit, reset } = useEmailSubmit();
  const [message, setMessage] = useState("");
  const emailId = useId();
  const messageId = useId();
  const reduced = useReducedMotion();

  const isOpen = active === "contact";

  const dismiss = useCallback(() => {
    reset();
    setMessage("");
    close();
  }, [reset, close]);

  return (
    <Modal
      open={isOpen}
      onClose={dismiss}
      title={contact.title}
      description={contact.description}
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
              <h3 className="mt-4 font-serif text-2xl tracking-tight">{contact.success}</h3>
              <p className="text-ink-muted mt-2 text-sm leading-relaxed">{contact.successBody}</p>
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
              <label htmlFor={emailId} className="text-ink text-sm font-medium">
                {contact.emailLabel}
              </label>
              <input
                id={emailId}
                type="email"
                value={email}
                onChange={(event) => change(event.target.value)}
                placeholder={contact.placeholder}
                autoComplete="email"
                aria-invalid={status === "invalid"}
                aria-describedby={status === "invalid" ? `${emailId}-error` : undefined}
                className={cn(
                  "bg-surface text-ink mt-2 h-11 w-full rounded-md border px-3.5 text-[0.9375rem] outline-none",
                  "placeholder:text-ink-faint focus:border-accent transition-colors duration-200",
                  status === "invalid" ? "border-danger" : "border-line",
                )}
              />
              {status === "invalid" && (
                <p id={`${emailId}-error`} role="alert" className="text-danger mt-2 text-xs">
                  That doesn&rsquo;t look like an email address.
                </p>
              )}

              <label htmlFor={messageId} className="text-ink mt-5 block text-sm font-medium">
                {contact.messageLabel}
              </label>
              <textarea
                id={messageId}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={contact.messagePlaceholder}
                rows={3}
                className="border-line bg-surface text-ink placeholder:text-ink-faint focus:border-accent mt-2 w-full resize-none rounded-md border px-3.5 py-2.5 text-[0.9375rem] leading-relaxed transition-colors duration-200 outline-none"
              />

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="mt-5 w-full"
              >
                {status === "submitting" ? "Sending…" : contact.action}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
