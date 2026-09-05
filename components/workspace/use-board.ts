"use client";

import { useCallback, useState } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { initialColumns, tasks, type Column } from "@/lib/workspace-data";

function locate(columns: Column[], id: string) {
  const asColumn = columns.findIndex((column) => column.id === id);
  if (asColumn !== -1) return asColumn;
  return columns.findIndex((column) => column.taskIds.includes(id));
}

export function useBoard() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    // A few pixels of travel before a drag starts, so tapping a card still reads as a tap.
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setColumns((current) => {
      const from = locate(current, activeId);
      const to = locate(current, overId);
      if (from === -1 || to === -1 || from === to) return current;

      const next = current.map((column) => ({
        ...column,
        taskIds: [...column.taskIds],
      }));
      next[from].taskIds = next[from].taskIds.filter((id) => id !== activeId);

      const overIndex = next[to].taskIds.indexOf(overId);
      const insertAt = overIndex === -1 ? next[to].taskIds.length : overIndex;
      next[to].taskIds.splice(insertAt, 0, activeId);

      return next;
    });
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setColumns((current) => {
      const from = locate(current, activeId);
      const to = locate(current, overId);
      if (from === -1 || to === -1 || from !== to) return current;

      const oldIndex = current[from].taskIds.indexOf(activeId);
      const newIndex = current[to].taskIds.indexOf(overId);
      if (oldIndex === newIndex || newIndex === -1) return current;

      const next = [...current];
      next[from] = {
        ...next[from],
        taskIds: arrayMove(next[from].taskIds, oldIndex, newIndex),
      };
      return next;
    });
  }, []);

  const onDragCancel = useCallback(() => setActiveId(null), []);

  return {
    columns,
    activeTask: activeId ? tasks[activeId] : null,
    sensors,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
  };
}
