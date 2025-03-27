"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema, TodoFormValues } from "@/domain/schemas/todoSchema";
import ApiService from "@/infrastructure/services/ApiService";

interface UseTodoItemProps {
    id: string;
}

export function useTodoItemFromMockData({ id }: UseTodoItemProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
        defaultValues: { title: "" },
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setLoading(true);
                // const apiService = new ApiService();
                // const todo = await apiService.getById(id);
                form.reset({ title: "" }); // Populate the form with fetched data
            } catch (err) {
                setError("Failed to fetch todo");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id, form]);

    return {
        form,
        loading,
        error,
    };
}