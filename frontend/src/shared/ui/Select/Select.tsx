import { forwardRef } from "react";
import { cn } from "@/shared/libs/cn";
import type { SelectProps } from "@/shared/ui/Select/Select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            "h-10 rounded-lg border bg-white px-3 text-sm text-gray-800",
            error ? "border-red-400" : "border-gray-300",
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="min-h-4">
          {error && (
            <p
              id={`${selectId}-error`}
              role="alert"
              className="text-xs text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Select.displayName = "Select";
