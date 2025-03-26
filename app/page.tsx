"use client";

import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoRepository } from './infrastructure/repositories/TodoRepository';
import { Todo } from './domain/entities/Todo';
import TodoList from './presentation/components/TodoList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const todoRepository = new TodoRepository();

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await todoRepository.getTodos();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const onSubmit = (data: TodoFormValues) => {
    const newTodo: Todo = { id: Date.now().toString(), title: data.title };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("title")} placeholder="Enter a new todo" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <Button type="submit">Add Todo</Button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
}