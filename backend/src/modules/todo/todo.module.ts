import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModule } from "@/modules/category/category.module.js";
import { TodosController } from "@/modules/todo/todo.controller.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { TodoRepository } from "@/modules/todo/todo.repository.js";
import { TodosService } from "@/modules/todo/todo.service.js";

@Module({
  imports: [SequelizeModule.forFeature([Todo]), CategoryModule],
  controllers: [TodosController],
  providers: [TodoRepository, TodosService],
})
export class TodosModule {}
