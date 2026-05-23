import { Controller, Get } from "@nestjs/common";
import { CategoriesService } from "@/modules/category/category.service.js";
import { Category } from "@/modules/category/category.entity.js";
import { ROUTES } from "@/app/constants.js";

@Controller(ROUTES.CATEGORIES.ROOT)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(ROUTES.CATEGORIES.GET)
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
