"use client";

import { motion, useReducedMotion } from "motion/react";
import { thread } from "@/lib/workspace-data";
import { easeOutExpo } from "@/lib/motion";

export function ThreadsView() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full flex-col">
      <div className="border-line mb-3 flex items-center gap-2 border-b pb-3">
        <span className="bg-accent size-1.5 rounded-full" />
        <p className="text-ink truncate text-[0.8125rem] font-medium">{thread.task}</p>
        <span className="text-ink-faint ml-auto shrink-0 font-mono text-[0.625rem] tracking-[0.11em] uppercase">
          In progress
        </span>
      </div>

      <ul className="flex flex-1 flex-col gap-3.5">
        {thread.messages.map((message, index) => (
          <motion.li
            key={message.id}
            className="flex gap-2.5"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: easeOutExpo,
            }}
          >
            <span className="border-line bg-surface-sunken text-ink-muted mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[0.5625rem]">
              {message.initials}
            </span>
            <div className="min-w-0">
              <p className="flex items-baseline gap-2">
                <span className="text-ink text-[0.75rem] font-medium">{message.author}</span>
                <span className="text-ink-faint font-mono text-[0.625rem]">{message.time}</span>
              </p>
              <p className="text-ink-muted mt-1 text-[0.75rem] leading-relaxed">{message.body}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      <div className="border-line bg-surface mt-4 flex items-center gap-2 rounded-lg border px-3 py-2.5">
        <span className="border-line bg-surface-sunken text-ink-muted grid size-5 shrink-0 place-items-center rounded-full border font-mono text-[0.5rem]">
          RK
        </span>
        <span className="text-ink-faint text-[0.75rem]">Reply to the thread…</span>
      </div>
    </div>
  );
}
