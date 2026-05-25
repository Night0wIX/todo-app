import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryController } from "@/modules/category/category.controller.js";
import { Category } from "@/modules/category/category.entity.js";
import { CategoryRepository } from "@/modules/category/category.repository.js";
import { CategoryService } from "@/modules/category/category.service.js";

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
