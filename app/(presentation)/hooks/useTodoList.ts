"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TodoApiService } from "@/infrastructure/services/TodoApiService";
import { Todo } from "@/domain/entities/Todo";

const todoApiService = new TodoApiService();

export function useTodoList() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: todos = [], isLoading, isError } = useQuery(
        {
            queryKey: ["todos"],
            queryFn: () => todoApiService.getAll(),
        }
    );

    const addTodoMutation = useMutation(
        {
            mutationFn: (title: string) => todoApiService.create({ id: "", title }),
            onSuccess: (newTodo: Todo) => {
                router.push(`/todos/${newTodo.id}`);
            },
            onError: (_, __, context) => {
                // queryClient.setQueryData(["todos"], context.oldTodos);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["todos"] });
            },
            mutationKey: ["addTodo"],
        }
    );

    const deleteTodoMutation = useMutation(
        {
            mutationFn: (id: string) => todoApiService.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["todos"] });
            },
            onError: (_, __, context) => {
                // queryClient.setQueryData(["todos"], context.oldTodos);
            },
            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["todos"] });
            },
            mutationKey: ["deleteTodo"],
        }
    );

    const handleAddTodo = (title: string) => {
        addTodoMutation.mutate(title);
    };

    const handleDelete = (id: string) => {
        deleteTodoMutation.mutate(id);
    };

    const navigateToTodoItem = (id: string) => {
        router.push(`/todos/${id}`);
    };

    const navigateToHome = () => {
        router.push("/");
    };

    const navigateToTodoList = () => {
        router.push("/pages/todo");
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