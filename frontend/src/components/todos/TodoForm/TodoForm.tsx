import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useCategories } from '../../../hooks';
import type { TodoFormProps, TodoFormValues } from './TodoForm.types';
import { Input } from '../../ui/Input/Input';
import { Select } from '../../ui/Select/Select';
import { Button } from '../../ui/Button/Button';

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const { categories, isLoading: categoriesLoading } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    defaultValues: { text: '', categoryId: '' },
  });

  useEffect(() => {
    if (categories.length > 0) {
      reset({ text: '', categoryId: String(categories[0].id) });
    }
  }, [categories, reset]);

  const handleFormSubmit = async (values: TodoFormValues) => {
    try {
      await onSubmit({
        text: values.text.trim(),
        categoryId: Number(values.categoryId),
      });
      reset({ text: '', categoryId: values.categoryId });
      toast.success('Task created!', { autoClose: 2000 });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create task.';

      if (message.toLowerCase().includes('limit') || message.includes('5')) {
        setError('categoryId', { message });
      } else {
        toast.error(message);
      }
    }
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      noValidate
      aria-label="Create new task"
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-gray-800">New Task</h2>

<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex-1">
          <Input
            label="Task"
            placeholder="What needs to be done?"
            aria-required="true"
            error={errors.text?.message}
            {...register('text', {
              required: 'Task text is required.',
              maxLength: {
                value: 255,
                message: 'Task text must be at most 255 characters.',
              },
              validate: (v) => v.trim().length > 0 || 'Task text cannot be blank.',
            })}
          />
        </div>

        <div className="w-full sm:w-52">
          <Select
            label="Category"
            options={categoryOptions}
            disabled={categoriesLoading || categories.length === 0}
            placeholder={categoriesLoading ? 'Loading…' : undefined}
            error={errors.categoryId?.message}
            {...register('categoryId', {
              required: 'Please select a category.',
            })}
          />
        </div>
<Button
  type="submit"
  isLoading={isSubmitting}
  disabled={categoriesLoading}
  className="h-10 self-start mt-6"
>
  Add Task
</Button>
      </div>
    </form>
  );
};