"use client";

import { motion, useReducedMotion } from "motion/react";
import { milestones, weekDays } from "@/lib/workspace-data";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LANES = [0, 1, 2];

export function TimelineView() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full flex-col">
      <div className="border-line flex border-b pb-2">
        {weekDays.map((day) => (
          <span
            key={day}
            className="text-ink-faint flex-1 font-mono text-[0.625rem] tracking-[0.08em] uppercase"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="relative flex-1 pt-4">
        <div className="pointer-events-none absolute inset-0 flex">
          {weekDays.map((day, index) => (
            <div key={day} className={cn("flex-1", index > 0 && "border-line/60 border-l")} />
          ))}
        </div>

        {/* Today marker, so the bars are anchored to a moment and read as live. */}
        <div className="bg-accent/35 pointer-events-none absolute inset-y-0 left-[46%] w-px">
          <span className="bg-accent absolute -top-0.5 -left-[3px] size-[7px] rounded-full" />
        </div>

        <div className="relative flex flex-col gap-3">
          {LANES.map((lane) => (
            <div key={lane} className="relative h-7">
              {milestones
                .filter((item) => item.lane === lane)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    className="absolute top-0 flex h-7 items-center"
                    style={{
                      left: `${item.start * 100}%`,
                      width: `${item.width * 100}%`,
                      transformOrigin: "left",
                    }}
                    initial={{ opacity: 0, scaleX: reduced ? 1 : 0.6 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 * lane,
                      ease: easeOutExpo,
                    }}
                  >
                    <div
                      className={cn(
                        "flex h-full w-full items-center gap-1.5 rounded-md border px-2",
                        item.done
                          ? "border-line bg-surface-sunken"
                          : "border-accent/25 bg-accent-soft",
                      )}
                    >
                      {item.isMilestone && (
                        <span className="bg-accent size-1.5 shrink-0 rotate-45" />
                      )}
                      <span
                        className={cn(
                          "truncate text-[0.6875rem] font-medium",
                          item.done ? "text-ink-faint" : "text-ink",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-ink-faint ml-auto hidden shrink-0 font-mono text-[0.5625rem] sm:block">
                        {item.date}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
