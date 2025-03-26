"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

interface TodoItemProps {
    id: string;
    title: string;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
}

const todoSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

const TodoItem: FC<TodoItemProps> = ({ id, title, onUpdate, onDelete }) => {
    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
        defaultValues: { title },
    });

    const onSubmit = (data: TodoFormValues) => {
        onUpdate(id, data.title); // Call the onUpdate handler with the updated title
    };

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