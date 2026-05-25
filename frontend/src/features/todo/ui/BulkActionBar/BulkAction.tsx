import type { BulkActionBarProps } from "@/features/todo/ui/BulkActionBar/BulkAction.types";

export const BulkActionBar = ({
  selectedCount,
  totalCount,
  isAllSelected,
  isIndeterminate,
  onCompleteSelected,
  onSelectAll,
  onClearAll,
  isLoading = false,
}: BulkActionBarProps) => {
  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className="flex items-center justify-between gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isAllSelected}
          ref={(el) => {
            if (el) {
              el.indeterminate = isIndeterminate;
            }
          }}
          onChange={isAllSelected ? onClearAll : onSelectAll}
          aria-label={isAllSelected ? "Deselect all tasks" : "Select all tasks"}
          className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-violet-600
          focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1"
        />
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-violet-700">{selectedCount}</span>
          of
          <span className="font-medium">{totalCount}</span> selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClearAll}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600
          hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-violet-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onCompleteSelected}
          disabled={selectedCount === 0 || isLoading}
          aria-label={`Mark ${selectedCount} task${selectedCount === 1 ? "" : "s"} as complete`}
          className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white
          hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
          transition-colors"
        >
          {isLoading ? "Completing…" : "Complete selected"}
        </button>
      </div>
    </div>
  );
};
