"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormValues, todoSchema } from "@/domain/schemas/todoSchema";
import { TodoApiService } from "@/infrastructure/services/TodoApiService";
import { Todo } from "@/domain/entities/Todo";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const todoApiService = new TodoApiService();

export function useTodoItem() {

  const pathname = usePathname();

  const id = pathname.split("/").pop() || "";

  const queryClient = useQueryClient();


  // Use TanStack Query to fetch the todo by ID
  const { data: todo, isLoading, isError, error
  } = useQuery(
    {
      queryKey: ["todo", id], // Unique query key for this query
      queryFn: async () => {
        if (!id || id === "new") {
          return new Todo("", "");
        }
        return await todoApiService.getById(id);
      },// Fetch the todo by ID
      enabled: !!id && id !== "new", // Enable only if id is provided
      refetchOnWindowFocus: false, // Disable refetch on window
      // onSuccess: (data) => {
      //   form.reset({ title: data.title }); // Populate the form with fetched data
      // },
    }
  );

  // const form = useForm<TodoFormValues>({
  //   resolver: zodResolver(todoSchema),
  //   defaultValues: { id: todo?.id || "", title: todo?.title || "" },
  // });

  const addTodoMutation = useMutation(
    {
      mutationFn: (title: string) => todoApiService.create({ id: "", title }),
      onSuccess: (newTodo: Todo) => {
        console.log("New todo", newTodo);
        toast.success("Todo added successfully!");
        // router.push(`/pages/todo/${newTodo.id}`);
      },
      onError: (_, __, context) => {
        toast.error("Failed to add todo");
        // queryClient.setQueryData(["todos"], context.oldTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      mutationKey: ["addTodo"],
    }
  );



  const updateTodoMutation = useMutation(
    {
      mutationFn: (todo: Todo) => todoApiService.update(todo.id, todo),
      onSuccess: () => {
        toast.success("Todo updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: (_, __, context) => {
        toast.error("Failed to update todo");
        // queryClient.setQueryData(["todos"], context.oldTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      mutationKey: ["updateTodo"],
    }
  );

  const handleUpdate = (id: string, title: string): void => {
    if (id === "") {
      addTodoMutation.mutate(title);
    } else {
      updateTodoMutation.mutate({ ...todo, title: title });
    }
  };

  const newTodo = todo || new Todo("", "");

  return {
    todo: newTodo,
    loading: isLoading,
    error: isError ? error?.message || "Failed to fetch todo" : null,
    handleUpdate,
  };
}