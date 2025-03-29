import { GET, POST } from "./route";
import { useCases } from "@/(presentation)/di";
import { NextResponse } from "next/server";
import { Todo } from "@/domain/entities/Todo";

jest.mock("@/(presentation)/di", () => ({
    useCases: {
        getTodos: {
            execute: jest.fn(),
        },
        addTodo: {
            execute: jest.fn(),
        },
    },
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data) => data),
    },
}));

describe("API Route - /api/todos", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET", () => {
        it("calls useCases.getTodos.execute and returns todos in JSON format", async () => {
            const mockTodos = [
                { id: 1, title: "First Todo" },
                { id: 2, title: "Second Todo" },
            ];
            (useCases.getTodos.execute as jest.Mock).mockResolvedValueOnce(mockTodos);

            const response = await GET();

            expect(useCases.getTodos.execute).toHaveBeenCalledTimes(1);
            expect(NextResponse.json).toHaveBeenCalledWith(mockTodos);
            expect(response).toEqual(mockTodos);
        });
    });

    describe("POST", () => {
        it("calls useCases.addTodo.execute with the correct Todo object and returns a success message", async () => {
            const mockRequest = {
                json: jest.fn().mockResolvedValueOnce({ title: "New Todo" }),
            } as unknown as Request;

            const response = await POST(mockRequest);

            expect(mockRequest.json).toHaveBeenCalledTimes(1);
            expect(useCases.addTodo.execute).toHaveBeenCalledWith(new Todo(0, "New Todo"));
            expect(NextResponse.json).toHaveBeenCalledWith({ message: "Todo added successfully" });
            expect(response).toEqual({ message: "Todo added successfully" });
        });
    });
});