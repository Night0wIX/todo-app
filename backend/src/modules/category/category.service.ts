import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { CategoryRepository } from "@/modules/category/category.repository.js";
import { DEFAULT_CATEGORIES } from "@/app/constants.js";
import { Category } from "@/modules/category/category.entity.js";

@Injectable()
export class CategoriesService implements OnApplicationBootstrap {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async onApplicationBootstrap(): Promise<void> {
    const count = await this.categoryRepository.count();

    if (count === 0) {
      await this.categoryRepository.bulkCreate(DEFAULT_CATEGORIES);
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }
}
