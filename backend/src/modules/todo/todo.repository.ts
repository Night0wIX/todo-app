import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, Order, WhereOptions } from "sequelize";

import { Category } from "@/modules/category/category.entity.js";
import { Todo } from "@/modules/todo/todo.entity.js";

const CATEGORY_INCLUDE = {
  model: Category,
  as: "category",
  attributes: ["id", "name"],
};

const FIND_ALL_ORDER: Order = [["createdAt", "DESC"]];

type CreateTodoData = Pick<Todo, "text" | "categoryId" | "completed">;
type UpdateTodoData = Partial<Pick<Todo, "completed">>;

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  findAll(categoryNames?: string[]): Promise<Todo[]> {
    const categoryInclude =
      categoryNames && categoryNames.length > 0
        ? { ...CATEGORY_INCLUDE, where: { name: { [Op.in]: categoryNames } } }
        : CATEGORY_INCLUDE;

    return this.todoModel.findAll({
      include: [categoryInclude],
      order: FIND_ALL_ORDER,
    });
  }

  findById(id: number): Promise<Todo | null> {
    return this.todoModel.findByPk(id, {
      include: [CATEGORY_INCLUDE],
    });
  }

  count(where: WhereOptions<Todo>): Promise<number> {
    return this.todoModel.count({ where });
  }

  async create(data: CreateTodoData): Promise<Todo> {
    const todo = await this.todoModel.create(data);

    return this.findByIdOrThrow(todo.id);
  }

  async update(todo: Todo, changes: UpdateTodoData): Promise<Todo> {
    await todo.update(changes);

    return this.findByIdOrThrow(todo.id);
  }

  destroy(todo: Todo): Promise<void> {
    return todo.destroy();
  }

  private async findByIdOrThrow(id: number): Promise<Todo> {
    const todo = await this.findById(id);

    if (!todo) {
      throw new Error(`Todo ${id} not found after write operation`);
    }

    return todo;
  }
}
