import { Module, OnModuleInit } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { buildDatabaseConfig } from "@/app/configs/database.config.js";
import { setupAssociations } from "@/app/associations.js";
import { LoggerModule } from "nestjs-pino";
import { loggerConfig } from "@/app/configs/logger.config.js";
import { CategoriesModule } from "@/modules/category/category.module.js";
import { TodosModule } from "@/modules/todo/todo.module.js";

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    SequelizeModule.forRoot(buildDatabaseConfig()),
    CategoriesModule,
    TodosModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): void {
    setupAssociations();
  }
}