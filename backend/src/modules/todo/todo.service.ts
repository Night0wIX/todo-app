import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { CreateTodoDto } from "@/modules/todo/dto/create-todo.dto.js";
import { UpdateTodoDto } from "@/modules/todo/dto/update-todo.dto.js";
import { TodoRepository } from "@/modules/todo/todo.repository.js";
import { CategoriesService } from "@/modules/category/category.service.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { MAX_TODOS_PER_CATEGORY } from "@/app/constants.js";

@Injectable()
export class TodosService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

findAll(categoryNames?: string[]): Promise<Todo[]> {
  return this.todoRepository.findAll(categoryNames);
}

  async create(dto: CreateTodoDto): Promise<Todo> {
    const category = await this.categoriesService.findById(dto.categoryId);
    if (!category) {
      throw new NotFoundException(
        `Category with id ${dto.categoryId} does not exist.`,
      );
    }

    const activeTodosCount = await this.todoRepository.count({
      categoryId: dto.categoryId,
      completed: false,
    });

    if (activeTodosCount >= MAX_TODOS_PER_CATEGORY) {
      throw new BadRequestException(
        `Category "${category.name}" already has ${MAX_TODOS_PER_CATEGORY} active tasks. ` +
          `Complete or delete some before adding more.`,
      );
    }

    return this.todoRepository.create({
      text: dto.text.trim(),
      categoryId: dto.categoryId,
      completed: false,
    });
  }

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOneOrFail(id);
    return this.todoRepository.update(todo, dto);
  }

  async remove(id: number): Promise<{ success: boolean; id: number }> {
    const todo = await this.findOneOrFail(id);
    await this.todoRepository.destroy(todo);
    return { success: true, id };
  }

  private async findOneOrFail(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return todo;
  }
}
