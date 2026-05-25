import type { UndoToastContentProps } from "@/features/todo/ui/UndoToastContent/UndoToastContent.types";

export const UndoToastContent = ({
  message,
  onUndo,
}: UndoToastContentProps) => (
  <div className="flex items-center justify-between gap-4 w-full">
    <span className="text-sm leading-snug">{message}</span>
    <button
      type="button"
      onClick={onUndo}
      className="shrink-0 font-semibold text-sm underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
      aria-label="Undo last action"
    >
      Undo
    </button>
  </div>
);
