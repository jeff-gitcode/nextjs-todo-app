"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TodoList from "@/presentation/components/TodoList";
import { Button } from "@/components/ui/button";

interface Todo {
  id: string;
  title: string;
}

export default function Home() {
  const router = useRouter();

  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Build a Todo App" },
  ]);

  const handleUpdate = (id: string) => {
    // Navigate to the TodoItem page dynamically
    router.push(`/presentation/components/todo/${id}`);
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = () => {
    // Generate a new Todo with a unique ID
    const newTodoId = Date.now().toString();
    const newTodo: Todo = { id: newTodoId, title: "" };

    // Add the new Todo to the list
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Redirect to the TodoItem page for the new Todo
    router.push(`/presentation/components/todo/${newTodoId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
      <Button className="mt-4" onClick={handleAddTodo}>
        Add Todo
      </Button>
    </div>
  );
}