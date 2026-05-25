import { CATEGORY_ENDPOINTS } from "@/features/category/api/categoryEndpoints";
import type { Category } from "@/features/category/types";
import { BaseApiService } from "@/shared/api/baseApiService";

class CategoryApiService extends BaseApiService {
  constructor() {
    super(CATEGORY_ENDPOINTS.ROOT);
  }

  async getAll(): Promise<Category[]> {
    const { data } = await this.get<Category[]>(
      this.url(CATEGORY_ENDPOINTS.GET_ALL),
    );

    return data;
  }
}

export const categoryService = new CategoryApiService();
