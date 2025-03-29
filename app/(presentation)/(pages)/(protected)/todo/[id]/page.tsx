"use client";

import TodoItem from "@/(presentation)/components/TodoItem";
import { useTodoList } from "@/(presentation)/hooks/useTodoList";
import { Button } from "@/components/ui/button";
import { useTodoItem } from "@/(presentation)/hooks/useTodoItem";

export default function TodoItemPage() {
    const { navigateToTodoList } = useTodoList();
    const { todo, loading, error, handleUpdate } = useTodoItem();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Todo Item</h1>
            <TodoItem
                todo={todo}
                onUpdate={handleUpdate}
            />
            <Button
                variant="secondary"
                onClick={navigateToTodoList}
                className="mt-4"
            >
                Back to Todo List
            </Button>
        </div>
    );
}