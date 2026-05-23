import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreateTodoDto } from "@/modules/todo/dto/create-todo.dto.js";
import { UpdateTodoDto } from "@/modules/todo/dto/update-todo.dto.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { TodosService } from "@/modules/todo/todo.service.js";
import { ROUTES } from "@/app/constants.js";

@Controller(ROUTES.TODOS.ROOT)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

@Get(ROUTES.TODOS.GET)
findAll(@Query("category") category?: string): Promise<Todo[]> {
  const categories = category
    ? category.split(",").map((c) => c.trim().toLowerCase())
    : undefined;

  return this.todosService.findAll(categories);
}

  @Post(ROUTES.TODOS.CRAETE)
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
async remove(
  @Param("id", ParseIntPipe) id: number,
): Promise<void> {
  await this.todosService.remove(id);
}
}
