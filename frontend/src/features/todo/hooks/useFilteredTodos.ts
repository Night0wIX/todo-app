import { useCallback, useState } from "react";
import { todoService } from "@/features/todo/api/todoService";
import { FILTER } from "@/features/todo/constants";
import type { Todo } from "@/features/todo/types";
import { useFetch } from "@/shared/hooks/useFetch";
import type { FilterValue } from "@/shared/types/common";

type UseFilteredTodosReturn = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  filter: FilterValue;
  setFilter: (value: FilterValue, categoryName?: string) => void;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useFilteredTodos = (): UseFilteredTodosReturn => {
  const [filterValue, setFilterValue] = useState<FilterValue>(FILTER.ALL);
  const [filterCategory, setFilterCategory] = useState<string | undefined>(
    undefined,
  );

  const fetchFn = useCallback(
    () =>
      todoService.getAll(
        filterValue !== FILTER.ALL && filterCategory
          ? { category: filterCategory.toLowerCase() }
          : undefined,
      ),
    [filterValue, filterCategory],
  );

  const {
    data: todos,
    setData: setTodos,
    isLoading,
    error,
    refetch,
  } = useFetch<Todo[]>(fetchFn);

  const setFilter = useCallback((value: FilterValue, categoryName?: string) => {
    setFilterValue(value);
    setFilterCategory(value === FILTER.ALL ? undefined : categoryName);
  }, []);

  return {
    todos: todos ?? [],
    setTodos,
    filter: filterValue,
    setFilter,
    isLoading,
    error,
    refetch,
  };
};
