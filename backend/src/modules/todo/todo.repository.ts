import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";

import { Category } from "@/modules/category/category.entity.js";
import { Todo } from "@/modules/todo/todo.entity.js";

const WITH_CATEGORY = {
  model: Category,
  as: "category",
  attributes: ["id", "name"],
};

@Injectable()
export class TodoRepository {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

   findAll(categoryNames?: string[]): Promise<Todo[]> {
    return this.todoModel.findAll({
      include: [
        {
          ...WITH_CATEGORY,
          ...(categoryNames?.length && {
            where: {
              name: {
                [Op.in]: categoryNames,
              },
            },
          }),
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  findById(id: number): Promise<Todo | null> {
    return this.todoModel.findByPk(id, {
      include: [WITH_CATEGORY],
    });
  }

  count(where: WhereOptions<Todo>): Promise<number> {
    return this.todoModel.count({ where });
  }

  async create(data: {
    text: string;
    categoryId: number;
    completed: boolean;
  }): Promise<Todo> {
    const todo = await this.todoModel.create(data);
    return this.findById(todo.id) as Promise<Todo>;
  }

  async update(
    todo: Todo,
    changes: Partial<Pick<Todo, "completed">>,
  ): Promise<Todo> {
    await todo.update(changes);
    return this.findById(todo.id) as Promise<Todo>;
  }

  destroy(todo: Todo): Promise<void> {
    return todo.destroy();
  }
}