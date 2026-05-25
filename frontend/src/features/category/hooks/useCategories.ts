import { useCallback } from "react";
import { categoryService } from "@/features/category/api/categoryService";
import type { Category } from "@/features/category/types";
import { useFetch } from "@/shared/hooks/useFetch";

type UseCategoriesReturn = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
};

export const useCategories = (): UseCategoriesReturn => {
  const fetchFn = useCallback(() => categoryService.getAll(), []);

  const { data, isLoading, error } = useFetch<Category[]>(fetchFn);

  return { categories: data ?? [], isLoading, error };
};
