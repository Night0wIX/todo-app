import { forwardRef } from 'react';
import { cn } from '../../../utils';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'h-10 rounded-lg border bg-white px-3 text-sm text-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-violet-500',
            error ? 'border-red-400' : 'border-gray-300',
            className,
          )}
          {...props}
        />

        <div className="min-h-4">
          {error && (
            <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';