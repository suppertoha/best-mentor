import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { CSSProperties } from "react";

export const useDndSensors = () =>
  useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

export const useSortableItem = (id: number) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return {
    ref: setNodeRef,
    style,
    handleProps: {
      ...attributes,
      ...listeners,
    },
  };
};

export type SortableHandleProps = ReturnType<typeof useSortableItem>["handleProps"];
