import type { Todo } from "@/features/todo/types";

export type TodoItemProps = {
  todo: Todo;
  isSelected: boolean;
  isBulkMode: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onSelect: (id: number) => void;
};
