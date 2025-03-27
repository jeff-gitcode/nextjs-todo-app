"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { TodoFormValues } from "@/domain/schemas/todoSchema";
import { useTodoItem } from "../hooks/useTodoItem";
import { Todo } from "@/domain/entities/Todo";

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const { todo: newTodo, form, loading, error } = useTodoItem();

    console.log("TodoItem", todo, newTodo);
    const onSubmit = (data: TodoFormValues) => {
        onUpdate(todo.id, data.title); // Call the onUpdate handler with the updated title
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-4"
            >
                {/* Readonly ID Field */}
                <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                        <Input value={todo.id} readOnly className="w-full bg-gray-100" />
                    </FormControl>
                </FormItem>

                {/* Editable Title Field */}
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input
                            {...form.register("title")}
                            placeholder="Enter title"
                            className="w-full"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                    <Button type="submit" variant="secondary">
                        {todo.id ? "Update" : "Create"}
                    </Button>
                    {/* <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onDelete(todo.id)}
                    >
                        Delete
                    </Button> */}
                </div>
            </form>
        </Form>
    );
};

export default TodoItem;