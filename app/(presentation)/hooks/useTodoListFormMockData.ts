"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Todo } from "@/domain/entities/Todo";

export function useTodoListFromMockData() {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", title: "Learn React" },
        { id: "2", title: "Build a Todo App" },
    ]);

    const navigateToHome = () => {
        router.push("/");
    };

    const navigateToTodoList = () => {
        router.push("/pages/todo");
    };

    const navigateToTodoItem = (id: string) => {
        router.push(`/pages/todo/${id}`);
    };

    const handleUpdate = (id: string, updatedTitle: string) => {
        console.log(`Updated Todo ID: ${id}, New Title: ${updatedTitle}`);
        // Add logic to update the todo in the state or backend
    };

    const handleDelete = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleAddTodo = () => {
        const newTodoId = Date.now().toString();
        const newTodo: Todo = { id: newTodoId, title: "New Todo" };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        navigateToTodoItem(newTodo.id); // Navigate to the new TodoItem page
    };

    return {
        todos,
        navigateToHome,
        navigateToTodoItem,
        navigateToTodoList,
        handleUpdate,
        handleDelete,
        handleAddTodo,
    };
}