import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "@/modules/category/category.entity.js";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({ order: [["name", "ASC"]] });
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  count(): Promise<number> {
    return this.categoryModel.count();
  }

  bulkCreate(names: string[]): Promise<Category[]> {
    return this.categoryModel.bulkCreate(names.map((name) => ({ name: name.trim().toLowerCase() })));
  }
}
