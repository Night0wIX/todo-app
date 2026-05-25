export const MAX_TODOS_PER_CATEGORY = 5;

export const DEFAULT_CATEGORIES = [
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Study",
] as const;

export const API_PREFIX = "api/v1";

export const ROUTES = {
  CATEGORIES: {
    ROOT: "categories",
    GET_ALL: "",
  },
  TODOS: {
    ROOT: "todos",
    GET_ALL: "",
    CREATE: "",
    UPDATE: ":id",
    DELETE: ":id",
  },
} as const;
