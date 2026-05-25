import path from "node:path";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { envConfig } from "@/app/configs/env.config.js";
import { Category } from "@/modules/category/category.entity.js";
import { Todo } from "@/modules/todo/todo.entity.js";
import { getEsmDirname } from "@/shared/utils/getEsmDirname.js";

const __dirname = getEsmDirname(import.meta.url);

const DB_DEFAULT_STORAGE_PATH = path.resolve(
  __dirname,
  "..",
  "..",
  "data",
  "todos.sqlite3",
);

function resolveStoragePath() {
  return envConfig.DB_STORAGE
    ? path.resolve(envConfig.DB_STORAGE)
    : DB_DEFAULT_STORAGE_PATH;
}

function sqlLogger(sql: string): void {
  process.stdout.write(`${sql}\n`);
}

export function buildDatabaseConfig(): SequelizeModuleOptions {
  return {
    dialect: "sqlite",
    storage: resolveStoragePath(),
    models: [Todo, Category],
    autoLoadModels: true,
    synchronize: true,
    logging: envConfig.DB_LOGGING ? sqlLogger : false,
  };
}
