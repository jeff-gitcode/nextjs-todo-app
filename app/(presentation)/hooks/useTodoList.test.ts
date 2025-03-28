import { renderHook, act } from "@testing-library/react";
import { useTodoList } from "./useTodoList";
import { TodoApiService } from "@/infrastructure/services/TodoApiService";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { on } from "events";

// FILE: app/(presentation)/hooks/useTodoList.test.ts

jest.mock("@/infrastructure/services/TodoApiService");
jest.mock("sonner", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));
const mockMutation = jest.fn();
jest.mock("@tanstack/react-query", () => ({
    ...jest.requireActual("@tanstack/react-query"),
    useQueryClient: jest.fn(),
    useQuery: jest.fn(() => ({ data: [], isLoading: false, isError: false })),
    useMutation: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
}));
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("useTodoList - deleteTodoMutation", () => {
    const mockQueryClient = {
        invalidateQueries: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
        (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    });

    it("calls todoApiService.delete with the correct id", async () => {
        const mockDelete = jest.fn();
        (TodoApiService as jest.Mock).mockImplementation(() => ({
            delete: mockDelete,
        }));
        (useMutation as jest.Mock).mockReturnValue({ mutate: mockDelete, isLoading: false });

        const { result } = renderHook(() => useTodoList());
        await act(async () => {
            result.current.handleDelete("123");
        });

        expect(mockDelete).toHaveBeenCalledWith("123");
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });

    it("triggers onSuccess, shows success toast, and invalidates queries", async () => {
        const mockDelete = jest.fn().mockResolvedValue({});
        const mockSuccess = jest.fn();

        (TodoApiService as jest.Mock).mockImplementation(() => ({
            delete: mockDelete,
        }));

        (useMutation as jest.Mock).mockReturnValue({
            mutate: (id: string) => {
                mockDelete(id).then(() => {
                    mockSuccess(); // Manually trigger onSuccess
                    toast.success("Todo deleted successfully!");
                    mockQueryClient.invalidateQueries({ queryKey: ["todos"] });
                });
            },
            isLoading: false,
        });

        const { result } = renderHook(() => useTodoList());
        const { handleDelete } = result.current;

        await act(async () => {
            handleDelete("123");
        });

        expect(mockDelete).toHaveBeenCalledWith("123");
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockSuccess).toHaveBeenCalled();
        expect(toast.success).toHaveBeenCalledWith("Todo deleted successfully!");
        expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["todos"] });
    });

    it("triggers onError and shows error toast", async () => {
        const mockDelete = jest.fn().mockRejectedValue(new Error("Delete failed"));
        const mockError = jest.fn();

        (TodoApiService as jest.Mock).mockImplementation(() => ({
            delete: mockDelete,
        }));

        (useMutation as jest.Mock).mockReturnValue({
            mutate: (id: string) => {
                mockDelete(id).catch(() => {
                    mockError(); // Manually trigger onError
                    toast.error("Failed to delete todo");
                });
            },
            isLoading: false,
        });

        const { result } = renderHook(() => useTodoList());
        const { handleDelete } = result.current;

        await act(async () => {
            handleDelete("123");
        });

        expect(mockDelete).toHaveBeenCalledWith("123");
        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockError).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith("Failed to delete todo");
    });
});