import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as path from "path";
import { envConfig } from "@/app/configs/env.config.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { Category } from "@/modules/category/category.entity.js";

export function buildDatabaseConfig(): SequelizeModuleOptions {
  const storagePath = envConfig.DB_STORAGE
    ? path.resolve(envConfig.DB_STORAGE)
    : path.resolve(__dirname, "..", "..", "data", "todos.sqlite3");

  return {
    dialect: "sqlite",
    storage: storagePath,
    autoLoadModels: true,
    synchronize: envConfig.NODE_ENV !== "production",
    logging: envConfig.DB_LOGGING ? console.log : false,
    models: [Todo, Category]
  };
}
