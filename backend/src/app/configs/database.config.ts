import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as path from "path";
import { envConfig } from "@/app/configs/env.config.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { Category } from "@/modules/category/category.entity.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function buildDatabaseConfig(): SequelizeModuleOptions {
  const storagePath = envConfig.DB_STORAGE
    ? path.resolve(envConfig.DB_STORAGE)
    : path.resolve(__dirname, "..", "..", "data", "todos.sqlite3");

  return {
    dialect: "sqlite",
    storage: storagePath,
    autoLoadModels: true,
    synchronize: true,
    logging: envConfig.DB_LOGGING ? console.log : false,
    models: [Todo, Category],
  };
}