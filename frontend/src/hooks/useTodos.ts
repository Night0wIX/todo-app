import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { todosApi } from '../api/index';
import type { Todo, FilterValue, PendingRemoval, CreateTodoDto } from '../types';
import { UndoToastContent } from '../components/todos/UndoToastContent/UndoToastContent';

const UNDO_DELAY_MS = 5_000;

interface UseTodosReturn {
  todos: Todo[];
  filter: FilterValue;
  isLoading: boolean;
  error: string | null;
  setFilter: (value: FilterValue, categoryName?: string) => void;
  createTodo: (payload: CreateTodoDto) => Promise<void>;
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
  refetch: (filter?: FilterValue) => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
const [filter, setFilter] = useState<FilterValue>('all');
const [filterCategoryName, setFilterCategoryName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pendingRemovals = useRef<Map<number, PendingRemoval>>(new Map());

const handleSetFilter = useCallback((value: FilterValue, name?: string) => {
  setFilter(value);
  setFilterCategoryName(value === 'all' ? undefined : name);
}, []);

const fetchTodos = useCallback(async (activeFilter: FilterValue = 'all', categoryName?: string) => {
  setIsLoading(true);
  setError(null);
  try {
    const data = await todosApi.getAll(
      activeFilter !== 'all' && categoryName
        ? { category: categoryName.toLowerCase() }
        : undefined,
    );
    setTodos(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to load tasks.');
  } finally {
    setIsLoading(false);
  }
}, []);

useEffect(() => {
  fetchTodos(filter, filterCategoryName);
}, [fetchTodos, filter, filterCategoryName]);

const createTodo = useCallback(async (payload: CreateTodoDto): Promise<void> => {
  const newTodo = await todosApi.create(payload);
  setTodos((prev) =>
    filter === 'all' || filter === newTodo.categoryId
      ? [newTodo, ...prev]
      : prev,
  );
}, [filter]);

  const undoCompletion = useCallback((todoId: number) => {
  const pending = pendingRemovals.current.get(todoId);
  if (!pending) return;

  clearTimeout(pending.timerId);
  pendingRemovals.current.delete(todoId);

  setTodos((prev) =>
    [{ ...pending.todo, status: 'active' as const }, ...prev].sort((a, b) => a.id - b.id),
  );

  todosApi.updateStatus(todoId, { status: 'active' }).catch(() => {
    toast.error('Failed to undo. Please refresh.');
  });
}, []);

  const toggleTodo = useCallback((todo: Todo) => {
  const isCompleting = todo.status === 'active';

  setTodos((prev) =>
    prev.map((t) =>
      t.id === todo.id
        ? { ...t, status: isCompleting ? 'completed' as const : 'active' as const }
        : t,
    ),
  );

  if (!isCompleting) {
    todosApi.updateStatus(todo.id, { status: 'active' }).catch(() => {
      setTodos((prev) =>
        prev.map((t) => t.id === todo.id ? { ...t, status: 'completed' as const } : t),
      );
      toast.error('Failed to update task status.');
    });
    return;
  }

  todosApi.updateStatus(todo.id, { status: 'completed' }).catch(() => {
    setTodos((prev) =>
      prev.map((t) => t.id === todo.id ? { ...t, status: 'active' as const } : t),
    );
    toast.error('Could not complete task. Please try again.');
    return;
  });

  setTimeout(() => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  }, 300);

  const completedTodo = { ...todo, status: 'completed' as const };

  const timerId = setTimeout(async () => {
    pendingRemovals.current.delete(todo.id);
    try {
      await todosApi.remove(todo.id);
    } catch {
      setTodos((prev) => [completedTodo, ...prev].sort((a, b) => a.id - b.id));
      toast.error('Failed to remove completed task. It has been restored.');
    }
  }, UNDO_DELAY_MS);

  pendingRemovals.current.set(todo.id, { todo: completedTodo, timerId });

  toast.success(
    ({ closeToast }) =>
      UndoToastContent({
        message: `"${todo.text}" marked as done`,
        onUndo: () => {
          undoCompletion(todo.id);
          closeToast?.();
        },
      }),
    {
      autoClose: UNDO_DELAY_MS,
      closeOnClick: false,
      toastId: `complete-${todo.id}`,
    },
  );
}, [undoCompletion]);

  const undoDeletion = useCallback((todoId: number) => {
    const pending = pendingRemovals.current.get(todoId);
    if (!pending) return;

    clearTimeout(pending.timerId);
    pendingRemovals.current.delete(todoId);

    setTodos((prev) => [pending.todo, ...prev].sort((a, b) => a.id - b.id));
  }, []);

  const deleteTodo = useCallback((todo: Todo) => {
    const existing = pendingRemovals.current.get(todo.id);
    if (existing) {
      clearTimeout(existing.timerId);
      pendingRemovals.current.delete(todo.id);
    }

    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

    const timerId = setTimeout(async () => {
      pendingRemovals.current.delete(todo.id);
      try {
        await todosApi.remove(todo.id);
      } catch {
        setTodos((prev) => [todo, ...prev].sort((a, b) => a.id - b.id));
        toast.error('Failed to delete task. It has been restored.');
      }
    }, UNDO_DELAY_MS);

    pendingRemovals.current.set(todo.id, { todo, timerId });

    toast.info(
      ({ closeToast }) =>
        UndoToastContent({
          message: `"${todo.text}" deleted`,
          onUndo: () => {
            undoDeletion(todo.id);
            closeToast?.();
          },
        }),
      {
        autoClose: UNDO_DELAY_MS,
        closeOnClick: false,
        toastId: `delete-${todo.id}`,
      },
    );
  }, [undoDeletion]);

  useEffect(() => {
    const removals = pendingRemovals.current;
    return () => { removals.forEach(({ timerId }) => clearTimeout(timerId)); };
  }, []);

  return {
    todos,
    filter,
    isLoading,
    error,
    setFilter: handleSetFilter,
    createTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
};