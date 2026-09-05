"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { BoardView } from "./board-view";
import { ThreadsView } from "./threads-view";
import { TimelineView } from "./timeline-view";
import { NoviMark, SearchIcon } from "@/components/icons";
import { useOverlay } from "@/components/overlay-provider";
import { easeOutExpo, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type WorkspaceView = "board" | "threads" | "timeline";

const VIEWS: { id: WorkspaceView; label: string }[] = [
  { id: "board", label: "Board" },
  { id: "threads", label: "Threads" },
  { id: "timeline", label: "Timeline" },
];

const MEMBERS = ["AM", "JD", "RK"];

export function WorkspacePreview({
  id,
  view: controlledView,
  onViewChange,
  className,
}: {
  /** Distinguishes the several previews on the page for dnd-kit's aria wiring. */
  id: string;
  view?: WorkspaceView;
  onViewChange?: (view: WorkspaceView) => void;
  className?: string;
}) {
  const [internalView, setInternalView] = useState<WorkspaceView>("board");
  const view = controlledView ?? internalView;
  const reduced = useReducedMotion();
  const { open } = useOverlay();

  function selectView(next: WorkspaceView) {
    setInternalView(next);
    onViewChange?.(next);
  }

  return (
    <div
      className={cn(
        "border-line bg-surface shadow-float overflow-hidden rounded-xl border",
        className,
      )}
    >
      <div className="border-line flex items-center gap-2 border-b px-3 py-2.5 sm:px-4">
        <NoviMark className="text-accent size-4 shrink-0" />
        <p className="text-ink-muted truncate font-mono text-[0.6875rem]">
          Fieldnote <span className="text-ink-faint">/ Sprint 12</span>
        </p>
        <div className="ml-auto flex -space-x-1.5">
          {MEMBERS.map((initials) => (
            <span
              key={initials}
              className="border-surface bg-surface-sunken text-ink-muted ring-line grid size-[22px] place-items-center rounded-full border font-mono text-[0.5rem] ring-1"
            >
              {initials}
            </span>
          ))}
        </div>
      </div>

      <div className="border-line flex items-center gap-1 border-b px-2 py-1.5 sm:px-3">
        <div role="tablist" aria-label="Workspace views" className="flex items-center gap-0.5">
          {VIEWS.map((item) => {
            const selected = item.id === view;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={selected}
                onClick={() => selectView(item.id)}
                className={cn(
                  "relative rounded-md px-2.5 py-1.5 text-[0.75rem] font-medium sm:px-3",
                  "ease-out-quart transition-[color,transform] duration-200",
                  "hover:scale-105 active:scale-95 active:duration-75 motion-reduce:hover:scale-100",
                  selected ? "text-ink" : "text-ink-faint hover:text-ink-muted",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="workspace-tab"
                    className="bg-surface-active absolute inset-0 rounded-md"
                    transition={reduced ? { duration: 0 } : spring.snappy}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => open("command")}
          className="border-line text-ink-faint ease-out-quart hover:border-line-strong hover:text-ink-muted ml-auto flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[0.6875rem] transition-[transform,border-color,color] duration-200 hover:scale-105 active:scale-95 active:duration-75 motion-reduce:hover:scale-100"
        >
          <SearchIcon className="size-3.5" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden font-mono text-[0.625rem] sm:inline">⌘K</kbd>
        </button>
      </div>

      <div className="bg-surface-sunken min-h-[19rem] p-2 sm:min-h-[21rem] sm:p-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            className="h-full"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration: reduced ? 0.15 : 0.28, ease: easeOutExpo }}
          >
            {view === "board" && <BoardView id={id} />}
            {view === "threads" && <ThreadsView />}
            {view === "timeline" && <TimelineView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
