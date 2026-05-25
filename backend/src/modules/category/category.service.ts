import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { DEFAULT_CATEGORIES } from "@/app/constants.js";
import { Category } from "@/modules/category/category.entity.js";
import { CategoryRepository } from "@/modules/category/category.repository.js";

@Injectable()
export class CategoryService implements OnApplicationBootstrap {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  /**
   * Seeds default categories on first run if the table is empty.
   * This runs once per application start via OnApplicationBootstrap.
   */
  async onApplicationBootstrap(): Promise<void> {
    await this.seedDefaultCategories();
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }

  private normalizeCategory(name: string): string {
    return name.trim().toLowerCase();
  }

  private async seedDefaultCategories(): Promise<void> {
    const count = await this.categoryRepository.count();

    if (count === 0) {
      const normalized = DEFAULT_CATEGORIES.map((name) =>
        this.normalizeCategory(name),
      );

      await this.categoryRepository.bulkCreate(normalized);
    }
  }
}
