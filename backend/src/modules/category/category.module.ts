import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoriesService } from "@/modules/category/category.service.js";
import { CategoriesController } from "@/modules/category/category.controller.js";
import { Category } from "@/modules/category/category.entity.js";
import { CategoryRepository } from "@/modules/category/category.repository.js";

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoryRepository, CategoriesService],
  exports: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
