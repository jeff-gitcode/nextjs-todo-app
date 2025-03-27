"use client";

import TodoItem from "@/presentation/components/TodoItem";
import { useTodoList } from "@/presentation/hooks/useTodoList";
import { Button } from "@/components/ui/button";

interface TodoItemPageProps {
    params: { id: string };
}

export default function TodoItemPage({ params }: TodoItemPageProps) {
    const { navigateToTodoList, handleUpdate, handleDelete } = useTodoList();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Todo Item</h1>
            <TodoItem
                id={params.id}
                title={params.title}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
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