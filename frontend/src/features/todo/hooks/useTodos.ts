import { useFilteredTodos } from "@/features/todo/hooks/useFilteredTodos";
import { usePendingRemovals } from "@/features/todo/hooks/usePendingRemovals";
import { useTodoActions } from "@/features/todo/hooks/useTodoActions";
import type { CreateTodoDto, Todo } from "@/features/todo/types";
import type { FilterValue } from "@/shared/types/common";

type UseTodosReturn = {
  todos: Todo[];
  filter: FilterValue;
  isLoading: boolean;
  error: string | null;
  setFilter: (value: FilterValue, categoryName?: string) => void;
  createTodo: (payload: CreateTodoDto) => Promise<void>;
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  refetch: () => Promise<void>;
};

export const useTodos = (): UseTodosReturn => {
  const { todos, setTodos, filter, setFilter, isLoading, error, refetch } =
    useFilteredTodos();

  const pendingRemovals = usePendingRemovals();

  const { createTodo, toggleTodo, deleteTodo } = useTodoActions({
    filter,
    setTodos,
    pendingRemovals,
  });

  return {
    todos,
    filter,
    isLoading,
    error,
    setFilter,
    createTodo,
    toggleTodo,
    deleteTodo,
    refetch,
  };
};
