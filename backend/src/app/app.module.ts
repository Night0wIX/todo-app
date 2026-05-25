import { Module, OnModuleInit } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LoggerModule } from "nestjs-pino";
import { setupAssociations } from "@/app/associations.js";
import { buildDatabaseConfig } from "@/app/configs/database.config.js";
import { loggerConfig } from "@/app/configs/logger.config.js";
import { CategoryModule } from "@/modules/category/category.module.js";
import { TodosModule } from "@/modules/todo/todo.module.js";

@Module({
  imports: [
    LoggerModule.forRoot(loggerConfig),
    SequelizeModule.forRoot(buildDatabaseConfig()),
    CategoryModule,
    TodosModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): void {
    setupAssociations();
  }
}
