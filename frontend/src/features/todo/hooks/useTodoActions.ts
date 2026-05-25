import { useCallback } from "react";
import { todoService } from "@/features/todo/api/todoService";
import {
  COMPLETION_ANIMATION_DELAY_MS,
  FILTER,
  TODO_STATUS,
} from "@/features/todo/constants";
import type { usePendingRemovals } from "@/features/todo/hooks/usePendingRemovals";
import { todoNotifications } from "@/features/todo/notifications";
import type { CreateTodoDto, Todo } from "@/features/todo/types";
import type { FilterValue } from "@/shared/types/common";

type UseTodoActionsParams = {
  filter: FilterValue;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  pendingRemovals: ReturnType<typeof usePendingRemovals>;
};

type UseTodoActionsReturn = {
  createTodo: (payload: CreateTodoDto) => Promise<void>;
  toggleTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
};

export const useTodoActions = ({
  filter,
  setTodos,
  pendingRemovals,
}: UseTodoActionsParams): UseTodoActionsReturn => {
  const { schedule, cancel } = pendingRemovals;

  const restoreTodo = useCallback(
    (todo: Todo) => {
      setTodos((prev) => [...(prev ?? []), todo].sort((a, b) => a.id - b.id));
    },
    [setTodos],
  );

  const createTodo = useCallback(
    async (payload: CreateTodoDto): Promise<void> => {
      const newTodo = await todoService.create(payload);

      setTodos((prev) => {
        const isVisible =
          filter === FILTER.ALL || filter === newTodo.categoryId;

        return isVisible ? [newTodo, ...(prev ?? [])] : prev;
      });
    },
    [filter, setTodos],
  );

  const undoCompletion = useCallback(
    (todoId: number) => {
      const pending = cancel(todoId);

      if (!pending) {
        return;
      }

      restoreTodo({ ...pending.todo, status: TODO_STATUS.ACTIVE });

      todoService
        .updateStatus(todoId, { status: TODO_STATUS.ACTIVE })
        .catch(todoNotifications.undoFailed);
    },
    [cancel, restoreTodo],
  );

  const completeTodo = useCallback(
    (todo: Todo) => {
      // Оптимістично змінюємо статус в UI
      setTodos((prev) =>
        (prev ?? []).map((t) =>
          t.id === todo.id ? { ...t, status: TODO_STATUS.COMPLETED } : t,
        ),
      );

      // Зберігаємо id таймера анімації, щоб скасувати у разі помилки
      const animationTimerId = setTimeout(() => {
        setTodos((prev) => (prev ?? []).filter((t) => t.id !== todo.id));
      }, COMPLETION_ANIMATION_DELAY_MS);

      todoService
        .updateStatus(todo.id, { status: TODO_STATUS.COMPLETED })
        .catch(() => {
          // API впало — скасовуємо анімацію і відновлюємо статус
          clearTimeout(animationTimerId);
          setTodos((prev) =>
            (prev ?? []).map((t) =>
              t.id === todo.id ? { ...t, status: TODO_STATUS.ACTIVE } : t,
            ),
          );
          todoNotifications.completeFailed();
        });

      const completedTodo: Todo = { ...todo, status: TODO_STATUS.COMPLETED };

      schedule(
        completedTodo,
        () => todoService.remove(todo.id),
        () => {
          restoreTodo(completedTodo);
          todoNotifications.restoreAfterRemove();
        },
      );

      todoNotifications.taskCompleted(todo.id, todo.text, () =>
        undoCompletion(todo.id),
      );
    },
    [schedule, setTodos, restoreTodo, undoCompletion],
  );

  const reactivateTodo = useCallback(
    (todo: Todo) => {
      setTodos((prev) =>
        (prev ?? []).map((t) =>
          t.id === todo.id ? { ...t, status: TODO_STATUS.ACTIVE } : t,
        ),
      );

      todoService
        .updateStatus(todo.id, { status: TODO_STATUS.ACTIVE })
        .catch(() => {
          setTodos((prev) =>
            (prev ?? []).map((t) =>
              t.id === todo.id ? { ...t, status: TODO_STATUS.COMPLETED } : t,
            ),
          );

          todoNotifications.statusUpdateFailed();
        });
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (todo: Todo) => {
      if (todo.status === TODO_STATUS.ACTIVE) {
        completeTodo(todo);
      } else {
        reactivateTodo(todo);
      }
    },
    [completeTodo, reactivateTodo],
  );

  const undoDeletion = useCallback(
    (todoId: number) => {
      const pending = cancel(todoId);

      if (!pending) {
        return;
      }

      restoreTodo(pending.todo);
    },
    [cancel, restoreTodo],
  );

  const deleteTodo = useCallback(
    (todo: Todo) => {
      cancel(todo.id);
      setTodos((prev) => (prev ?? []).filter((t) => t.id !== todo.id));

      schedule(
        todo,
        () => todoService.remove(todo.id),
        () => {
          restoreTodo(todo);
          todoNotifications.restoreAfterDelete();
        },
      );

      todoNotifications.taskDeleted(todo.id, todo.text, () =>
        undoDeletion(todo.id),
      );
    },
    [cancel, schedule, setTodos, restoreTodo, undoDeletion],
  );

  return { createTodo, toggleTodo, deleteTodo };
};
