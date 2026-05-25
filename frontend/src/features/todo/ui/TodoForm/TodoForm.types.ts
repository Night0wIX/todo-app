import type { CreateTodoDto } from "@/features/todo/types";

export type TodoFormProps = {
  onSubmit: (data: CreateTodoDto) => Promise<void>;
};

export type TodoFormValues = {
  text: string;
  categoryId: string;
};
