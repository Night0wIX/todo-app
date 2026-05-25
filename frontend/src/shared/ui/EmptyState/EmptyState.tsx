import type { EmptyStateProps } from "@/shared/ui/EmptyState/EmptyState.types";

export const EmptyState = ({
  title = "No tasks",
  description = "Add your first task using the form above.",
}: EmptyStateProps) => (
  <div
    role="status"
    aria-label={title}
    className="flex flex-col items-center justify-center py-20 gap-4 text-center"
  >
    <svg
      aria-hidden="true"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="16" fill="#f3f4f6" />
      <rect x="20" y="28" width="40" height="5" rx="2.5" fill="#9ca3af" />
      <rect x="20" y="38" width="28" height="5" rx="2.5" fill="#d1d5db" />
      <rect x="20" y="48" width="34" height="5" rx="2.5" fill="#d1d5db" />
      <circle cx="60" cy="56" r="12" fill="#ede9fe" />
      <path
        d="M56 56h8M60 52v8"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

    <div className="space-y-1">
      <p className="font-semibold text-gray-600">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  </div>
);
