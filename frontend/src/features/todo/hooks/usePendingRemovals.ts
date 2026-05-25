import { useCallback, useEffect, useRef } from "react";
import { UNDO_DELAY_MS } from "@/features/todo/constants";
import type { PendingRemoval, Todo } from "@/features/todo/types";

type UsePendingRemovalsReturn = {
  schedule: (
    todo: Todo,
    onCommit: () => Promise<void>,
    onRollback: () => void,
  ) => void;
  cancel: (todoId: number) => PendingRemoval | undefined;
};

export const usePendingRemovals = (): UsePendingRemovalsReturn => {
  const pendingRemovals = useRef<Map<number, PendingRemoval>>(new Map());

  const cancel = useCallback((todoId: number): PendingRemoval | undefined => {
    const pending = pendingRemovals.current.get(todoId);

    if (!pending) {
      return undefined;
    }

    clearTimeout(pending.timerId);
    pendingRemovals.current.delete(todoId);

    return pending;
  }, []);

  const schedule = useCallback(
    (todo: Todo, onCommit: () => Promise<void>, onRollback: () => void) => {
      const timerId = setTimeout(async () => {
        pendingRemovals.current.delete(todo.id);

        try {
          await onCommit();
        } catch {
          onRollback();
        }
      }, UNDO_DELAY_MS);

      pendingRemovals.current.set(todo.id, { todo, timerId });
    },
    [],
  );

  useEffect(() => {
    return () => {
      pendingRemovals.current.forEach(({ timerId }) => clearTimeout(timerId));
    };
  }, []);

  return { schedule, cancel };
};
