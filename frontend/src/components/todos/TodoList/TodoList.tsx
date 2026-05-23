import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { ErrorMessage } from '../../ui/ErrorMessage/ErrorMessage';
import { Spinner } from '../../ui/Spinner/Spinner';
import { TodoItem } from '../TodoItem/TodoItem';
import type { TodoListProps } from './TodoList.types';

export const TodoList = ({
  todos,
  isLoading,
  error,
  selectedIds,
  onToggle,
  onDelete,
  onSelect,
  onSelectAll,
  onRetry,
}: TodoListProps) => {
  const isBulkMode = selectedIds.size > 0;
  const activeTodos = todos.filter((t) => t.status === 'active');

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner className="h-8 w-8" label="Loading tasks…" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        title="No tasks"
        description="You're all caught up! Add a new task above."
      />
    );
  }

  return (
    <div>
      {activeTodos.length > 0 && !isBulkMode && (
        <div className="mb-2 flex justify-end">
          <button
            onClick={onSelectAll}
            className="text-xs font-medium text-violet-600 hover:text-violet-800
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded px-1"
          >
            Select all
          </button>
        </div>
      )}

      <ul
        role="list"
        aria-label="Task list"
        aria-live="polite"
        aria-relevant="additions removals"
        className="flex flex-col gap-2"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={selectedIds.has(todo.id)}
            isBulkMode={isBulkMode}
            onToggle={onToggle}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};