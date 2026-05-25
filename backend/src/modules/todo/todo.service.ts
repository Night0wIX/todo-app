import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { MAX_TODOS_PER_CATEGORY } from "@/app/constants.js";
import { CategoryService } from "@/modules/category/category.service.js";
import { CreateTodoDto } from "@/modules/todo/dto/create-todo.dto.js";
import { UpdateTodoDto } from "@/modules/todo/dto/update-todo.dto.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { TodoRepository } from "@/modules/todo/todo.repository.js";

@Injectable()
export class TodosService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly categoriesService: CategoryService,
  ) {}

  findAll(categoryNames?: string[]): Promise<Todo[]> {
    return this.todoRepository.findAll(categoryNames);
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const category = await this.findCategoryOrFail(dto.categoryId);

    await this.assertActiveTodosLimit(dto.categoryId, category.name);

    return this.todoRepository.create({
      text: dto.text.trim(),
      categoryId: dto.categoryId,
      completed: false,
    });
  }

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findTodoOrFail(id);

    return this.todoRepository.update(todo, dto);
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findTodoOrFail(id);

    await this.todoRepository.destroy(todo);
  }

  private async findCategoryOrFail(categoryId: number) {
    const category = await this.categoriesService.findById(categoryId);

    if (!category) {
      throw new NotFoundException(
        `Category with id ${categoryId} does not exist.`,
      );
    }

    return category;
  }

  private async assertActiveTodosLimit(
    categoryId: number,
    categoryName: string,
  ): Promise<void> {
    const activeTodosCount = await this.todoRepository.count({
      categoryId,
      completed: false,
    });

    if (activeTodosCount >= MAX_TODOS_PER_CATEGORY) {
      throw new BadRequestException(
        `Category "${categoryName}" already has ${MAX_TODOS_PER_CATEGORY} active tasks.
        Complete or delete some before adding more.`,
      );
    }
  }

  private async findTodoOrFail(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }

    return todo;
  }
}
