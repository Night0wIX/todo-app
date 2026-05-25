import { TODO_ENDPOINTS } from "@/features/todo/api/todoEndpoints";
import type {
  CreateTodoDto,
  Todo,
  TodoResponse,
  TodosQueryParams,
  UpdateTodoDto,
} from "@/features/todo/types";
import { BaseApiService } from "@/shared/api/baseApiService";

class TodoApiService extends BaseApiService {
  constructor() {
    super(TODO_ENDPOINTS.ROOT);
  }

  async getAll(params?: TodosQueryParams): Promise<Todo[]> {
    const { data } = await this.get<TodoResponse[]>(
      this.url(TODO_ENDPOINTS.GET_ALL, undefined, {
        category: params?.category,
      }),
    );

    return data.map(this.mapTodoResponse);
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const { data } = await this.post<TodoResponse>(
      this.url(TODO_ENDPOINTS.CREATE),
      dto,
    );

    return this.mapTodoResponse(data);
  }

  async updateStatus(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const { data } = await this.patch<TodoResponse>(
      this.url(TODO_ENDPOINTS.UPDATE, { id }),
      { completed: dto.status === "completed" },
    );

    return this.mapTodoResponse(data);
  }

  async remove(id: number): Promise<void> {
    await this.delete(this.url(TODO_ENDPOINTS.DELETE, { id }));
  }

  private mapTodoResponse = (raw: TodoResponse): Todo => ({
    id: raw.id,
    text: raw.text,
    categoryId: raw.categoryId,
    categoryName: raw.category?.name ?? "Unknown",
    status: raw.completed ? "completed" : "active",
    createdAt: raw.createdAt,
  });
}

export const todoService = new TodoApiService();
