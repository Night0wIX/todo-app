import apiClient from './client';
import type { Todo, CreateTodoDto, UpdateTodoDto, TodosQueryParams } from '../types';

interface TodoResponse {
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
}

const normalise = (raw: TodoResponse): Todo => ({
  id: raw.id,
  text: raw.text,
  categoryId: raw.categoryId,
  categoryName: raw.category?.name ?? 'Unknown',
  status: raw.completed ? 'completed' : 'active',
  createdAt: raw.createdAt,
});

export const todosApi = {
  getAll: async (params?: TodosQueryParams): Promise<Todo[]> => {
    const { data } = await apiClient.get<TodoResponse[]>('/todos', {
      params: params?.category ? { category: params.category } : undefined,
    });
    return data.map(normalise);
  },

  create: async (payload: CreateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.post<TodoResponse>('/todos', payload);
    return normalise(data);
  },

  updateStatus: async (id: number, payload: UpdateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.patch<TodoResponse>(`/todos/${id}`, {
      completed: payload.status === 'completed',
    });
    return normalise(data);
  },

  remove: async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};