"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TodoApiService } from "@/infrastructure/services/TodoApiService";
import { toast } from "sonner";

const todoApiService = new TodoApiService();

export function useTodoList() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: todos = [], isLoading, isError } = useQuery(
        {
            queryKey: ["todos"],
            queryFn: () => todoApiService.getAll()
        }
    );

    const deleteTodoMutation = useMutation(
        {
            mutationFn: (id: number) => todoApiService.delete(id),
            onSuccess: () => {
                toast.success("Todo deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["todos"] });
            },
            onError: (_, __, context) => {
                toast.error("Failed to delete todo");
                // queryClient.setQueryData(["todos"], context.oldTodos);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["todos"] });
            },
            mutationKey: ["deleteTodo"],
        }
    );

    const handleAddTodo = (title: string) => {
        router.push(`/todo/new`);
        // addTodoMutation.mutate(title);
    };

    const handleDelete = (id: number) => {
        deleteTodoMutation.mutate(id);
    };

    const navigateToTodoItem = (id: number) => {
        router.push(`/todo/${id}`);
    };

    const navigateToHome = () => {
        router.push("/");
    };

    const navigateToTodoList = () => {
        router.push("/todo");
    };

    return {
        todos,
        isLoading,
        isError,
        handleAddTodo,
        handleDelete,
        navigateToTodoItem,
        navigateToHome,
        navigateToTodoList,
    };
}