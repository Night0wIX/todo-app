import { Todo } from "@/modules/todo/todo.entity.js";
import { Category } from "@/modules/category/category.entity.js";

export function setupAssociations(): void {
  Category.hasMany(Todo, {
    foreignKey: "categoryId",
    as: "todos",
    onDelete: "CASCADE",
  });

  Todo.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });
}