import { cn } from "@/shared/libs/cn";
import type { SpinnerProps } from "@/shared/ui/Spinner/Spinner.types";

export const Spinner = ({ className, label = "Loading…" }: SpinnerProps) => (
  <div
    role="status"
    aria-label={label}
    className={cn(
      "inline-block rounded-full border-2 border-current border-t-transparent",
      "animate-spin text-violet-500",
      "h-6 w-6",
      className,
    )}
  />
);
