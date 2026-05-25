import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

import { ROUTES } from "@/app/constants.js";
import { CreateTodoDto } from "@/modules/todo/dto/create-todo.dto.js";
import { UpdateTodoDto } from "@/modules/todo/dto/update-todo.dto.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { TodosService } from "@/modules/todo/todo.service.js";

const CATEGORY_QUERY_SEPARATOR = ",";

@Controller(ROUTES.TODOS.ROOT)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get(ROUTES.TODOS.GET_ALL)
  findAll(@Query("category") category?: string): Promise<Todo[]> {
    const categories = this.parseCategoryQuery(category);
    return this.todosService.findAll(categories);
  }

  @Post(ROUTES.TODOS.CREATE)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Patch(ROUTES.TODOS.UPDATE)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(ROUTES.TODOS.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.todosService.remove(id);
  }

  private parseCategoryQuery(category?: string): string[] | undefined {
    if (!category) {
      return;
    }

    return category
      .split(CATEGORY_QUERY_SEPARATOR)
      .map((c) => c.trim().toLowerCase());
  }
}
