import { GetTodoById } from "./GetTodoById";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { Todo } from "app/domain/entities/Todo";

describe("GetTodoById", () => {
    let mockRepository: jest.Mocked<ITodoRepository>;
    let getTodoByIdUseCase: GetTodoById;

    beforeEach(() => {
        // Mock the repository
        mockRepository = {
            addTodo: jest.fn(),
            getTodos: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
            getTodoById: jest.fn(),
        };

        // Create an instance of GetTodoById with the mocked repository
        getTodoByIdUseCase = new GetTodoById(mockRepository);
    });

    it("calls repository.getTodoById with the correct id", async () => {
        const todoId = 123;

        await getTodoByIdUseCase.execute(todoId);

        expect(mockRepository.getTodoById).toHaveBeenCalledWith(todoId);
        expect(mockRepository.getTodoById).toHaveBeenCalledTimes(1);
    });

    it("returns the correct todo when repository.getTodoById resolves successfully", async () => {
        const todoId = 123;
        const mockTodo: Todo = { id: todoId, title: "Sample Todo" };

        mockRepository.getTodoById.mockResolvedValueOnce(mockTodo);

        const result = await getTodoByIdUseCase.execute(todoId);

        expect(result).toEqual(mockTodo);
        expect(mockRepository.getTodoById).toHaveBeenCalledWith(todoId);
        expect(mockRepository.getTodoById).toHaveBeenCalledTimes(1);
    });

    it("throws an error if repository.getTodoById fails", async () => {
        const todoId = 123;
        const error = new Error("Failed to fetch todo");

        mockRepository.getTodoById.mockRejectedValueOnce(error);

        await expect(getTodoByIdUseCase.execute(todoId)).rejects.toThrow("Failed to fetch todo");
        expect(mockRepository.getTodoById).toHaveBeenCalledWith(todoId);
        expect(mockRepository.getTodoById).toHaveBeenCalledTimes(1);
    });
});