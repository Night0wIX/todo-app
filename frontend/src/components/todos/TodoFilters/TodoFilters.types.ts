import type { Category, FilterValue } from '../../../types';

export interface TodoFiltersProps {
  categories: Category[];
  filter: FilterValue;
  totalCount: number;
  activeCount: number;
onFilterChange: (value: FilterValue, categoryName?: string) => void;
}