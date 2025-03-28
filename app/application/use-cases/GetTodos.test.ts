import { GetTodos } from "./GetTodos";
import { ITodoRepository } from "../interfaces/ITodoRepository";
import { Todo } from "../../domain/entities/Todo";

describe("GetTodos", () => {
    let mockRepository: jest.Mocked<ITodoRepository>;
    let getTodosUseCase: GetTodos;

    beforeEach(() => {
        // Mock the repository
        mockRepository = {
            addTodo: jest.fn(),
            getTodos: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
            getTodoById: jest.fn(),
        };

        // Create an instance of GetTodos with the mocked repository
        getTodosUseCase = new GetTodos(mockRepository);
    });

    it("calls repository.getTodos", async () => {
        await getTodosUseCase.execute();

        expect(mockRepository.getTodos).toHaveBeenCalledTimes(1);
    });

    it("returns the correct list of todos when repository.getTodos resolves successfully", async () => {
        const mockTodos: Todo[] = [
            { id: "1", title: "First Todo" },
            { id: "2", title: "Second Todo" },
        ];

        mockRepository.getTodos.mockResolvedValueOnce(mockTodos);

        const result = await getTodosUseCase.execute();

        expect(result).toEqual(mockTodos);
        expect(mockRepository.getTodos).toHaveBeenCalledTimes(1);
    });

    it("throws an error if repository.getTodos fails", async () => {
        const error = new Error("Failed to fetch todos");

        mockRepository.getTodos.mockRejectedValueOnce(error);

        await expect(getTodosUseCase.execute()).rejects.toThrow("Failed to fetch todos");
        expect(mockRepository.getTodos).toHaveBeenCalledTimes(1);
    });
});