import type { TodoItemProps } from "@/features/todo/ui/TodoItem/TodoItem.types";
import { cn } from "@/shared/libs/cn";
import { formatRelativeTime } from "@/shared/libs/formatRelativeTime";
import { Badge } from "@/shared/ui/Badge/Badge";
import { TruncatedText } from "@/shared/ui/TruncatedText/TruncatedText";

export const TodoItem = ({
  todo,
  isSelected,
  isBulkMode,
  onToggle,
  onDelete,
  onSelect,
}: TodoItemProps) => {
  const isCompleted = todo.status === "completed";

  const getCheckboxAriaLabel = () => {
    if (isBulkMode) {
      return `Select task: ${todo.text}`;
    }

    if (isCompleted) {
      return `Unmark "${todo.text}" as done`;
    }

    return `Mark "${todo.text}" as done`;
  };

  const handleCheckboxChange = () => {
    if (isBulkMode) {
      if (!isCompleted) {
        onSelect(todo.id);
      }
    } else {
      onToggle(todo);
    }
  };

  return (
    <li
      className={cn(
        "group flex items-center gap-3 rounded-xl border px-4 py-3",
        "transition-all duration-200",
        isCompleted
          ? "border-gray-100 bg-gray-50 opacity-60"
          : "border-gray-200 bg-white hover:border-violet-200 hover:shadow-sm",
        isSelected && "ring-2 ring-violet-400 ring-offset-1",
        isBulkMode && !isCompleted && "cursor-pointer select-none",
      )}
    >
      <input
        type="checkbox"
        checked={isBulkMode ? isSelected : isCompleted}
        onChange={handleCheckboxChange}
        disabled={isBulkMode && isCompleted}
        aria-label={getCheckboxAriaLabel()}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-violet-600
          focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1
          disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        <TruncatedText text={todo.text} isCompleted={isCompleted} />

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge label={todo.categoryName} />
          {todo.createdAt && (
            <time dateTime={todo.createdAt} className="text-xs text-gray-400">
              {formatRelativeTime(todo.createdAt)}
            </time>
          )}
        </div>
      </div>

      {!isBulkMode && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onDelete(todo)}
            aria-label={`Delete task: ${todo.text}`}
            className={cn(
              "rounded-md p-1 text-gray-400",
              "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
              "transition-opacity duration-150",
              "hover:bg-red-50 hover:text-red-500",
              "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-red-400 focus-visible:ring-offset-1",
            )}
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
};

TodoItem.displayName = "TodoItem";
