"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormValues, todoSchema } from "@/domain/schemas/todoSchema";
import { TodoApiService } from "@/infrastructure/services/TodoApiService";
import { Todo } from "@/domain/entities/Todo";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const todoApiService = new TodoApiService();

export function useTodoItem() {
  const router = useRouter();

  const pathname = usePathname();

  const id = pathname.split("/").pop() || "";

  const queryClient = useQueryClient();

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { id: "", title: "" },
  });

  // Use TanStack Query to fetch the todo by ID
  const { data: todo, isLoading, isError, error
  } = useQuery(
    {
      queryKey: ["todo", id], // Unique query key for this query
      queryFn: () => todoApiService.getById(id), // Fetch the todo by ID
      enabled: !!id, // Enable only if id is provided
      refetchOnWindowFocus: false, // Disable refetch on window
      // onSuccess: (data) => {
      //   form.reset({ title: data.title }); // Populate the form with fetched data
      // },
    }
  );

  const updateTodoMutation = useMutation(
    {
      mutationFn: (todo: Todo) => todoApiService.update(todo.id, todo),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: (_, __, context) => {
        // queryClient.setQueryData(["todos"], context.oldTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      mutationKey: ["updateTodo"],
    }
  );

  const handleUpdate = (id: string, title: string): void => {
    if (!todo) return;
    updateTodoMutation.mutate({ ...todo, title: title });
  };

  const newTodo = todo || new Todo("", "");

  return {
    todo: newTodo,
    form,
    loading: isLoading,
    error: isError ? error?.message || "Failed to fetch todo" : null,
    handleUpdate,
  };
}