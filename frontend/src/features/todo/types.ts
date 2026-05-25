export type TodoStatus = "active" | "completed";

export type Todo = {
  id: number;
  text: string;
  categoryId: number;
  categoryName: string;
  status: TodoStatus;
  createdAt: string;
};

export type CreateTodoDto = {
  text: string;
  categoryId: number;
};

export type UpdateTodoDto = {
  status: TodoStatus;
};

export type TodosQueryParams = {
  category?: string;
};

export type TodoResponse = {
  id: number;
  text: string;
  categoryId: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
};

export type PendingRemoval = {
  todo: Todo;
  timerId: ReturnType<typeof setTimeout>;
};
