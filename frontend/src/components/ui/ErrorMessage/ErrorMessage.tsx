import type { ErrorMessageProps } from './ErrorMessage.types';

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div
    role="alert"
    className="flex flex-col items-center gap-3 py-16 text-center"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
      <svg
        aria-hidden="true"
        className="h-6 w-6 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>

    <div>
      <p className="font-semibold text-gray-700">Something went wrong</p>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>

    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-1 text-sm font-medium text-violet-600 hover:text-violet-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded"
      >
        Try again
      </button>
    )}
  </div>
);