"use client";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  useDroppable,
  type Announcements,
  type DropAnimation,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTaskCard, TaskCard } from "./task-card";
import { useBoard } from "./use-board";
import { initialColumns, tasks, type Column } from "@/lib/workspace-data";
import { cn } from "@/lib/utils";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: "0.4" } },
  }),
};

/** Drag ids are opaque; screen readers should hear the task and column names. */
const columnTitles = Object.fromEntries(initialColumns.map((column) => [column.id, column.title]));

function label(id: string | number) {
  const key = String(id);
  return tasks[key]?.title ?? columnTitles[key] ?? key;
}

const announcements: Announcements = {
  onDragStart: ({ active }) => `Picked up ${label(active.id)}.`,
  onDragOver: ({ active, over }) =>
    over ? `${label(active.id)} is over ${label(over.id)}.` : undefined,
  onDragEnd: ({ active, over }) =>
    over
      ? `${label(active.id)} was dropped on ${label(over.id)}.`
      : `${label(active.id)} was returned to its place.`,
  onDragCancel: ({ active }) =>
    `Dragging cancelled. ${label(active.id)} was returned to its place.`,
};

function BoardColumn({ column }: { column: Column }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-2.5 flex items-center gap-2 px-0.5">
        <p className="text-ink-faint font-mono text-[0.625rem] tracking-[0.12em] uppercase">
          {column.title}
        </p>
        <span className="text-ink-faint font-mono text-[0.625rem]">{column.taskIds.length}</span>
      </div>

      <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          data-column={column.id}
          className={cn(
            "flex min-h-28 flex-1 flex-col gap-1.5 rounded-lg border border-dashed p-1 transition-colors duration-200 sm:gap-2 sm:p-1.5",
            isOver ? "border-accent/40 bg-accent-soft/50" : "border-transparent",
          )}
        >
          {column.taskIds.map((id) => (
            <SortableTaskCard key={id} task={tasks[id]} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export function BoardView({ id }: { id: string }) {
  const { columns, activeTask, sensors, onDragStart, onDragOver, onDragEnd, onDragCancel } =
    useBoard();

  return (
    <DndContext
      // Stable id: dnd-kit otherwise numbers its aria ids from a counter that
      // restarts on the client, which trips a hydration mismatch.
      id={id}
      sensors={sensors}
      collisionDetection={closestCorners}
      accessibility={{ announcements }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} />
        ))}
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask && <TaskCard task={activeTask} lifted />}
      </DragOverlay>
    </DndContext>
  );
}
