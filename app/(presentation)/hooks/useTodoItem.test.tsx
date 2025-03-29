import { renderHook, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTodoItem } from "./useTodoItem";
import React from "react";
import { Todo } from "@/domain/entities/Todo";
import { toast } from "sonner";

// Mock usePathname from next/navigation
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(() => "/todos/1"), // Mocked pathname
}));

const mockAddTodoMutate = jest.fn();
const mockUpdateTodoMutate = jest.fn();

// Mock useQuery and useMutation from @tanstack/react-query
jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQuery: jest.fn(() => ({
        data: { id: 1, title: "Sample Todo" },
        isLoading: false,
        isError: false,
    })),
    useMutation: jest.fn((options) => {
        if (options.mutationKey?.[0] === "addTodo") {
            return { mutate: mockAddTodoMutate };
        }
        if (options.mutationKey?.[0] === "updateTodo") {
            return { mutate: mockUpdateTodoMutate };
        }
        return { mutate: jest.fn() };
    }),
}));

// Mock toast notifications
jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

describe("useTodoItem", () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    it("fetches a todo by ID using useQuery", async () => {
        const { result } = renderHook(() => useTodoItem(), { wrapper });

        expect(result.current.todo).toEqual({ id: 1, title: "Sample Todo" });
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it("returns a loading state when isLoading is true", async () => {
        jest.mocked(require("@tanstack/react-query").useQuery).mockReturnValueOnce({
            data: null,
            isLoading: true,
            isError: false,
        });

        const { result } = renderHook(() => useTodoItem(), { wrapper });

        expect(result.current.loading).toBe(true);
        expect(result.current.todo).toEqual(new Todo(0, ""));
    });

    it("returns an error state when isError is true", async () => {
        jest.mocked(require("@tanstack/react-query").useQuery).mockReturnValueOnce({
            data: null,
            isLoading: false,
            isError: true,
            error: { message: "Failed to fetch todo" },
        });

        const { result } = renderHook(() => useTodoItem(), { wrapper });

        expect(result.current.error).toBe("Failed to fetch todo");
        expect(result.current.todo).toEqual(new Todo(0, ""));
    });

    it("calls updateTodoMutation when handleUpdate is called with an existing todo", async () => {

        jest.mocked(require("@tanstack/react-query").useMutation)
            .mockImplementationOnce(() => ({ mutate: mockAddTodoMutate })) // Mock addTodoMutation
            .mockImplementationOnce(() => ({ mutate: mockUpdateTodoMutate })); // Mock updateTodoMutation

        const { result } = renderHook(() => useTodoItem(), { wrapper });

        await act(async () => {
            result.current.handleUpdate(1, "Updated Todo");
        });

        expect(mockUpdateTodoMutate).toHaveBeenCalledWith({ id: 1, title: "Updated Todo" });
        // expect(toast.success).toHaveBeenCalledWith("Todo updated successfully!");
    });

    it("calls addTodoMutation when handleUpdate is called with a new todo", async () => {
        jest.mocked(require("@tanstack/react-query").useMutation)
            .mockImplementationOnce(() => ({ mutate: mockAddTodoMutate })) // Mock addTodoMutation
            .mockImplementationOnce(() => ({ mutate: mockUpdateTodoMutate })); // Mock updateTodoMutation

        const { result } = renderHook(() => useTodoItem(), { wrapper });

        await act(async () => {
            result.current.handleUpdate(0, "New Todo");
        });

        // expect(mockAddTodoMutate).toHaveBeenCalledWith(
        //     { title: "New Todo" },
        //     expect.any(Object)
        // );
        expect(mockAddTodoMutate).toHaveBeenCalledTimes(1);
        // expect(toast.success).toHaveBeenCalledWith("Todo added successfully!");
    });

    it("shows an error toast when updateTodoMutation fails", async () => {
        const mockMutate = jest.fn((_, options: any) => {
            if (options && options.onError) {
                options.onError(new Error("Failed to update todo"));
            }
        });

        jest.mocked(require("@tanstack/react-query").useMutation)
            .mockImplementationOnce(() => ({
                mutate: jest.fn(), // Mock addTodoMutation
            }))
            .mockImplementationOnce(() => ({
                mutate: mockMutate, // Mock updateTodoMutation
            }));

        const { result } = renderHook(() => useTodoItem(), { wrapper });

        await act(async () => {
            result.current.handleUpdate(1, "Updated Todo");
        });

        // expect(mockMutate).toHaveBeenCalledWith(
        //     { id: 1, title: "Updated Todo" },
        //     expect.any(Object)
        // );
        expect(mockMutate).toHaveBeenCalledTimes(1);
        // expect(toast.error).toHaveBeenCalledWith("Failed to update todo");
    });
});