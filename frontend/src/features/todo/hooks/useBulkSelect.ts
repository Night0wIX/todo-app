import { useState } from "react";
import type { Todo, TodoStatus } from "@/features/todo/types";

const SELECTABLE_STATUS: TodoStatus = "active";

type UseBulkSelectReturn = {
  selectedIds: Set<number>;
  selectedCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  isSelected: (id: number) => boolean;
  toggleSelect: (id: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
};

export const useBulkSelect = (todos: Todo[]): UseBulkSelectReturn => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const activeTodos = todos?.filter(
    (todo) => todo.status === SELECTABLE_STATUS,
  );

  const isSelected = (id: number) => selectedIds.has(id);

  const toggleSelect = (id: number) => {
    setSelectedIds((currentIds) => {
      const updatedIds = new Set(currentIds);
      updatedIds.has(id) ? updatedIds.delete(id) : updatedIds.add(id);
      return updatedIds;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(activeTodos.map((todo) => todo.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const isAllSelected =
    activeTodos.length > 0 &&
    activeTodos.every((todo) => selectedIds.has(todo.id));

  const isIndeterminate =
    !isAllSelected && activeTodos.some((todo) => selectedIds.has(todo.id));

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    isAllSelected,
    isIndeterminate,
    isSelected,
    toggleSelect,
    selectAll,
    clearSelection,
  };
};
