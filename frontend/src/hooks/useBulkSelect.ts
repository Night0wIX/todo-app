import { useState, useCallback } from 'react';
import type { Todo } from '../types';

interface UseBulkSelectReturn {
  selectedIds: Set<number>;
  selectedCount: number;
  isAllSelected: boolean;
  isIndeterminate: boolean;
  isSelected: (id: number) => boolean;
  toggleSelect: (id: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
}

export const useBulkSelect = (todos: Todo[]): UseBulkSelectReturn => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const activeTodos = todos.filter((t) => t.status === 'active');

  const isSelected = useCallback(
    (id: number) => selectedIds.has(id),
    [selectedIds],
  );

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(activeTodos.map((t) => t.id)));
  }, [activeTodos]);

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const isAllSelected =
    activeTodos.length > 0 && activeTodos.every((t) => selectedIds.has(t.id));

  const isIndeterminate =
    !isAllSelected && activeTodos.some((t) => selectedIds.has(t.id));

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