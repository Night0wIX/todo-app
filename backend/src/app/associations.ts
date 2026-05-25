import { Category } from "@/modules/category/category.entity.js";
import { Todo } from "@/modules/todo/todo.entity.js";

const CATEGORY_FOREIGN_KEY = "categoryId";

/**
 * Sequelize associations are defined here manually instead of using
 * decorators on entities to avoid circular dependency issues between modules.
 */
export function setupAssociations(): void {
  Category.hasMany(Todo, {
    foreignKey: CATEGORY_FOREIGN_KEY,
    as: "todos",
    onDelete: "CASCADE",
  });

  Todo.belongsTo(Category, {
    foreignKey: CATEGORY_FOREIGN_KEY,
    as: "category",
  });
}
