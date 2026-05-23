import type { CreateTodoDto } from '../../../types';

export interface TodoFormProps {
  onSubmit: (data: CreateTodoDto) => Promise<void>;
}

export interface TodoFormValues {
  text: string;
  categoryId: string;
}