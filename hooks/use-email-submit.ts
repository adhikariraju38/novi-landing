"use client";

import { useCallback, useState } from "react";

export type EmailStatus = "idle" | "invalid" | "submitting" | "done";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Shared by the newsletter field and the signup dialog. There is no backend on a
 * landing page, but the delay keeps the four states honest.
 */
export function useEmailSubmit() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<EmailStatus>("idle");

  const change = useCallback((value: string) => {
    setEmail(value);
    setStatus((current) => (current === "invalid" ? "idle" : current));
  }, []);

  const submit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (status === "submitting") return;

      if (!EMAIL.test(email.trim())) {
        setStatus("invalid");
        return;
      }

      setStatus("submitting");
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("done");
    },
    [email, status],
  );

  const reset = useCallback(() => {
    setEmail("");
    setStatus("idle");
  }, []);

  return { email, status, change, submit, reset };
}
