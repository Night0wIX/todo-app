import { useTodos } from '../hooks/useTodos';
import { useBulkSelect } from '../hooks/useBulkSelect';
import { useCategories } from '../hooks/useCategories';
import { TodoForm } from '../components/todos/TodoForm/TodoForm';
import { TodoFilters } from '../components/todos/TodoFilters/TodoFilters';
import { TodoList } from '../components/todos/TodoList/TodoList';
import { BulkActionBar } from '../components/todos/BulkActionBar/BulkActionBar';
import type { Todo } from '../types';

export const TodosPage = () => {
  const {
    todos,
    filter,
    isLoading,
    error,
    setFilter,
    createTodo,
    toggleTodo,
    deleteTodo,
    refetch,
  } = useTodos();

  const { categories } = useCategories();

  const {
    selectedIds,
    selectedCount,
    isAllSelected,
    isIndeterminate,
    toggleSelect,
    selectAll,
    clearSelection,
  } = useBulkSelect(todos);

  const activeTodos = todos.filter((t) => t.status === 'active');

const handleBulkComplete = () => {
  const todosToComplete = [...selectedIds]
    .map((id) => todos.find((t) => t.id === id))
    .filter((t): t is Todo => t !== undefined && t.status === 'active');

  clearSelection();
  todosToComplete.forEach((todo) => toggleTodo(todo));
};

  return (
    <main id="main-content" className="mx-auto w-full max-w-2xl px-4 py-10">
      <section aria-labelledby="create-heading" className="mb-10">
        <h2 id="create-heading" className="sr-only">Create a new task</h2>
        <TodoForm onSubmit={createTodo} />
      </section>

      <section aria-label="Filter tasks" className="mb-4">
        <TodoFilters
          categories={categories}
          filter={filter}
          totalCount={todos.length}
          activeCount={activeTodos.length}
          onFilterChange={setFilter}
        />
      </section>

      {selectedCount > 0 && (
        <div className="mb-4">
          <BulkActionBar
            selectedCount={selectedCount}
            totalCount={activeTodos.length}
            isAllSelected={isAllSelected}
            isIndeterminate={isIndeterminate}
            onCompleteSelected={handleBulkComplete}
            onSelectAll={selectAll}
            onClearAll={clearSelection}
          />
        </div>
      )}

      <section aria-label="Task list" aria-live="polite" aria-busy={isLoading}>
        <TodoList
          todos={todos}
          isLoading={isLoading}
          error={error}
          selectedIds={selectedIds}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onSelect={toggleSelect}
          onSelectAll={selectAll}
          onRetry={() => refetch(filter)}
        />
      </section>
    </main>
  );
};