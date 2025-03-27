"use client";

import TodoList from "@/(presentation)/components/TodoList";
import { useTodoList } from "@/(presentation)/hooks/useTodoList";
import { Button } from "@/components/ui/button";

export default function TodoListPage() {
  const {
    todos,
    isLoading,
    isError,
    navigateToTodoItem,
    handleAddTodo,
    handleDelete,
    navigateToHome,
  } = useTodoList();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load todos</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoList todos={todos} onUpdate={navigateToTodoItem} onDelete={handleDelete} />
      <div className="flex space-x-4 mt-4">
        <Button onClick={() => handleAddTodo("New Todo")}>Add Todo</Button>
        <Button variant="secondary" onClick={navigateToHome}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}