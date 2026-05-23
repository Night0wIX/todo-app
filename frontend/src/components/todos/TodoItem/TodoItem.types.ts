import type { Todo } from '../../../types';

export interface TodoItemProps {
  todo: Todo;
  isSelected: boolean;
  isBulkMode: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onSelect: (id: number) => void;
}