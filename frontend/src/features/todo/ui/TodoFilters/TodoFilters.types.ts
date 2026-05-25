import type { Category } from "@/features/category";
import type { FilterValue } from "@/shared/types/common";

export type TodoFiltersProps = {
  categories: Category[];
  filter: FilterValue;
  totalCount: number;
  activeCount: number;
  onFilterChange: (value: FilterValue, categoryName?: string) => void;
};
