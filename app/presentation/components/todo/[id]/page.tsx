"use client";

import { useRouter } from "next/navigation";

import TodoItem from "@/presentation/components/TodoItem";

interface TodoItemPageProps {
    params: { id: string };
}

export default function TodoItemPage({ params }: TodoItemPageProps) {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return (
        <div>
            <h1>Todo Item</h1>
            <TodoItem
                id={params.id}
                title={`Todo with ID: ${params.id}`}
                onUpdate={(id, updatedTitle) => {
                    console.log(`Updated Todo ID: ${id}, New Title: ${updatedTitle}`);
                    // Update the todo in the state or backend
                }}
                onDelete={(id) => {
                    console.log(`Deleted Todo ID: ${id}`);
                    // Remove the todo from the state or backend
                }}
            />
            <button onClick={handleBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Back to Todo List
            </button>
        </div>
    );
}