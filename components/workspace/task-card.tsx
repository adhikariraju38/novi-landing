"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CommentIcon } from "@/components/icons";
import type { Task } from "@/lib/workspace-data";
import { cn } from "@/lib/utils";

export function TaskCard({
  task,
  lifted = false,
  className,
}: {
  task: Task;
  lifted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-line bg-surface rounded-lg border p-2 select-none sm:p-3",
        lifted ? "shadow-float rotate-[1.5deg] cursor-grabbing" : "shadow-card cursor-grab",
        className,
      )}
    >
      <p className="text-ink text-[0.75rem] leading-snug font-medium sm:text-[0.8125rem]">
        {task.title}
      </p>

      {task.progress !== undefined && (
        <div className="bg-surface-sunken mt-2.5 h-1 overflow-hidden rounded-full">
          <div
            className="bg-accent h-full rounded-full"
            style={{ width: `${task.progress * 100}%` }}
          />
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between gap-1.5 sm:mt-3 sm:gap-2">
        <span className="text-ink-faint truncate font-mono text-[0.625rem] tracking-[0.11em] uppercase">
          {task.tag}
        </span>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {task.comments && (
            <span className="text-ink-faint hidden items-center gap-1 text-[0.6875rem] sm:flex">
              <CommentIcon className="size-3.5" />
              {task.comments}
            </span>
          )}
          <span className="border-line bg-surface-sunken text-ink-muted grid size-5 shrink-0 place-items-center rounded-full border font-mono text-[0.5rem] sm:size-6 sm:text-[0.5625rem]">
            {task.initials}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SortableTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={cn("touch-none", isDragging && "opacity-40")}
      {...attributes}
      {...listeners}
    >
      <TaskCard task={task} />
    </div>
  );
}
