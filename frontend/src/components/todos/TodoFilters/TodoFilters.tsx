import { Select } from '../../ui/Select/Select';
import type { TodoFiltersProps } from './TodoFilters.types';

export const TodoFilters = ({
  categories,
  filter,
  totalCount,
  onFilterChange,
}: TodoFiltersProps) => {
  const options = [
    { value: 'all', label: 'All categories' },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const raw = e.target.value;
  if (raw === 'all') {
    onFilterChange('all');
    return;
  }
  const id = Number(raw);
  const name = categories.find((c) => c.id === id)?.name ?? '';
  onFilterChange(id, name);
};

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Select
        aria-label="Filter tasks by category"
        options={options}
        value={filter}
        onChange={handleChange}
        className="w-52"
      />

      <p className="text-sm text-gray-500" aria-live="polite">
        <span className="font-medium text-gray-700">{totalCount}</span> total
      </p>
    </div>
  );
};