import type { Todo } from '../../../types';

export interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  selectedIds: Set<number>;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onSelect: (id: number) => void;
  onSelectAll: () => void;
  onRetry?: () => void;
}