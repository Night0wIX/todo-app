import { forwardRef } from "react";
import { cn } from "@/shared/libs/cn";
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "@/shared/ui/Button/Button.types";
import { Spinner } from "@/shared/ui/Spinner/Spinner";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-700 active:bg-violet-800 focus-visible:ring-violet-500",
  secondary:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus-visible:ring-gray-400",
  ghost:
    "text-gray-600 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-400",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isLoading}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner className="h-4 w-4" label="Processing…" />
        ) : (
          leftIcon
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
