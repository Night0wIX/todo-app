export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: number;
  text: string;
  categoryId: number;
  categoryName: string;
  status: TodoStatus;
  createdAt: string;
}

export interface CreateTodoDto {
  text: string;
  categoryId: number;
}

export interface UpdateTodoDto {
  status: TodoStatus;
}

export interface TodosQueryParams {
  category?: string;
}

export interface PendingRemoval {
  todo: Todo;
  timerId: ReturnType<typeof setTimeout>;
}