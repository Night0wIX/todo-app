import { toast } from "react-toastify";
import { UndoToastContent } from "@/features/todo/ui/UndoToastContent/UndoToastContent";
import { UNDO_DELAY_MS } from "@/features/todo/constants";

type UndoHandler = () => void;

const TOAST_BASE_CONFIG = {
  autoClose: UNDO_DELAY_MS,
  closeOnClick: false,
} as const;

export const todoNotifications = {
  taskCompleted: (todoId: number, text: string, onUndo: UndoHandler) =>
    toast.success(
      ({ closeToast }) =>
        UndoToastContent({
          message: `"${text}" marked as done`,
          onUndo: () => {
            onUndo();
            closeToast?.();
          },
        }),

      { ...TOAST_BASE_CONFIG, toastId: `complete-${todoId}` },
    ),

  taskDeleted: (todoId: number, text: string, onUndo: UndoHandler) =>
    toast.info(
      ({ closeToast }) =>
        UndoToastContent({
          message: `"${text}" deleted`,
          onUndo: () => {
            onUndo();
            closeToast?.();
          },
        }),

      { ...TOAST_BASE_CONFIG, toastId: `delete-${todoId}` },
    ),

  undoFailed: () => toast.error("Failed to undo. Please refresh."),
  completeFailed: () =>
    toast.error("Could not complete task. Please try again."),
  restoreAfterRemove: () =>
    toast.error("Failed to remove completed task. It has been restored."),
  restoreAfterDelete: () =>
    toast.error("Failed to delete task. It has been restored."),
  statusUpdateFailed: () => toast.error("Failed to update task status."),
};
