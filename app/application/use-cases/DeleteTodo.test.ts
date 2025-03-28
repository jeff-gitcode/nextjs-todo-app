import { DeleteTodo } from "./DeleteTodo";
import { ITodoRepository } from "../interfaces/ITodoRepository";

describe("DeleteTodo", () => {
    let mockRepository: jest.Mocked<ITodoRepository>;
    let deleteTodoUseCase: DeleteTodo;

    beforeEach(() => {
        // Mock the repository
        mockRepository = {
            addTodo: jest.fn(),
            getTodos: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
            getTodoById: jest.fn(),
        };

        // Create an instance of DeleteTodo with the mocked repository
        deleteTodoUseCase = new DeleteTodo(mockRepository);
    });

    it("calls repository.deleteTodo with the correct id", async () => {
        const todoId = "123";

        await deleteTodoUseCase.execute(todoId);

        expect(mockRepository.deleteTodo).toHaveBeenCalledWith(todoId);
        expect(mockRepository.deleteTodo).toHaveBeenCalledTimes(1);
    });

    it("throws an error if repository.deleteTodo fails", async () => {
        const todoId = "123";
        const error = new Error("Failed to delete todo");

        mockRepository.deleteTodo.mockRejectedValueOnce(error);

        await expect(deleteTodoUseCase.execute(todoId)).rejects.toThrow("Failed to delete todo");
        expect(mockRepository.deleteTodo).toHaveBeenCalledWith(todoId);
        expect(mockRepository.deleteTodo).toHaveBeenCalledTimes(1);
    });
});