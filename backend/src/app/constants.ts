export const MAX_TODOS_PER_CATEGORY = 5;
export const DEFAULT_CATEGORIES = [
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Study",
];
export const API_PREFIX = "api/v1";
export const ROUTES = {
  CATEGORIES: {
    ROOT: "categories",
    GET: ""
  },

  TODOS: {
    ROOT: "todos",
    GET: "",
    CRAETE: "",
    UPDATE: ":id",
    DELETE: ":id",
  },
} as const;
