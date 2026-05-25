import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "sequelize";
import { Category } from "@/modules/category/category.entity.js";

const FIND_ALL_ORDER: Order = [["name", "ASC"]];

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryModel.findAll({ order: FIND_ALL_ORDER });
  }

  findById(id: number): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  count(): Promise<number> {
    return this.categoryModel.count();
  }

  bulkCreate(names: readonly string[]): Promise<Category[]> {
    const records = names.map((name) => ({ name: name.trim().toLowerCase() }));

    return this.categoryModel.bulkCreate(records);
  }
}
