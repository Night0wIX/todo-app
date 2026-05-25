import { Controller, Get } from "@nestjs/common";
import { ROUTES } from "@/app/constants.js";
import { Category } from "@/modules/category/category.entity.js";
import { CategoryService } from "@/modules/category/category.service.js";

@Controller(ROUTES.CATEGORIES.ROOT)
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) {}

  @Get(ROUTES.CATEGORIES.GET_ALL)
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }
}
