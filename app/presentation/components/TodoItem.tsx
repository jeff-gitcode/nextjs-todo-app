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

interface TodoItemProps {
    id: string;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: FC<TodoItemProps> = ({ id, onUpdate, onDelete }) => {
    const { form, loading, error } = useTodoItem({ id });

    const onSubmit = (data: TodoFormValues) => {
        onUpdate(id, data.title); // Call the onUpdate handler with the updated title
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
                        <Input value={id} readOnly className="w-full bg-gray-100" />
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
                        Update
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={() => onDelete(id)}
                    >
                        Delete
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default TodoItem;