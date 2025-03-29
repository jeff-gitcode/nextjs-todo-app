import { useCases } from "@/(presentation)/di";
import { NextResponse } from "next/server";
import { DELETE, GET, PUT } from "./route";

jest.mock("@/(presentation)/di", () => ({
    useCases: {
        getTodoById: {
            execute: jest.fn(),
        },
        deleteTodo: {
            execute: jest.fn(),
        },
        updateTodo: {
            execute: jest.fn(),
        },
    },
}));

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data) => data),
    },
}));

describe("DELETE", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns 404 if the todo does not exist", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(null);

        const response = await DELETE({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Todo not found" }, { status: 404 });
        expect(response).toEqual({ error: "Todo not found" });
    });

    it("deletes the todo and returns a success message", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        const mockTodo = { id: 1, title: "Sample Todo" };
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(mockTodo);
        (useCases.deleteTodo.execute as jest.Mock).mockResolvedValueOnce(undefined);

        const response = await DELETE({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(useCases.deleteTodo.execute).toHaveBeenCalledWith("1");
        expect(useCases.deleteTodo.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ message: "Todo deleted successfully" });
        expect(response).toEqual({ message: "Todo deleted successfully" });
    });

    it("returns 500 if an internal server error occurs", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        (useCases.getTodoById.execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

        const response = await DELETE({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" }, { status: 500 });
        expect(response).toEqual({ error: "Internal Server Error" });
    });
});

// get todo by id

describe("GET", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns 404 if the todo does not exist", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(null);

        const response = await GET({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Todo not found" }, { status: 404 });
        expect(response).toEqual({ error: "Todo not found" });
    });

    it("returns the todo if it exists", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        const mockTodo = { id: 1, title: "Sample Todo" };
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(mockTodo);

        const response = await GET({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith(mockTodo);
        expect(response).toEqual(mockTodo);
    });

    it("returns 500 if an internal server error occurs", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        (useCases.getTodoById.execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

        const response = await GET({} as Request, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" }, { status: 500 });
        expect(response).toEqual({ error: "Internal Server Error" });
    });
});

// update todo

describe("PUT", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("returns 404 if the todo does not exist", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({ title: "Updated Todo" }),
        } as unknown as Request;
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(null);

        const response = await PUT(mockRequest, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Todo not found" }, { status: 404 });
        expect(response).toEqual({ error: "Todo not found" });
    });

    it("updates the todo and returns a success message", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({ title: "Updated Todo" }),
        } as unknown as Request;
        const mockTodo = { id: 1, title: "Sample Todo" };
        (useCases.getTodoById.execute as jest.Mock).mockResolvedValueOnce(mockTodo);
        (useCases.updateTodo.execute as jest.Mock).mockResolvedValueOnce(undefined);

        const response = await PUT(mockRequest, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(useCases.updateTodo.execute).toHaveBeenCalledWith({ id: 1, title: "Updated Todo" });
        expect(useCases.updateTodo.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ message: "Todo updated successfully" });
        expect(response).toEqual({ message: "Todo updated successfully" });
    });

    it("returns 500 if an internal server error occurs", async () => {
        const mockParams = Promise.resolve({ id: 1 });
        const mockRequest = {
            json: jest.fn().mockResolvedValueOnce({ title: "Updated Todo" }),
        } as unknown as Request;
        (useCases.getTodoById.execute as jest.Mock).mockRejectedValueOnce(new Error("Database error"));

        const response = await PUT(mockRequest, { params: mockParams });

        expect(useCases.getTodoById.execute).toHaveBeenCalledWith("1");
        expect(useCases.getTodoById.execute).toHaveBeenCalledTimes(1);
        expect(NextResponse.json).toHaveBeenCalledWith({ error: "Internal Server Error" }, { status: 500 });
        expect(response).toEqual({ error: "Internal Server Error" });
    });
});