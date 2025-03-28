import { AddTodo } from "./AddTodo";
import { ITodoRepository } from "app/application/interfaces/ITodoRepository";
import { Todo } from "app/domain/entities/Todo";

describe("AddTodo", () => {
    let mockRepository: jest.Mocked<ITodoRepository>;
    let addTodoUseCase: AddTodo;

    beforeEach(() => {
        // Mock the repository
        mockRepository = {
            addTodo: jest.fn(),
            getTodos: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
            getTodoById: jest.fn()
        };

        // Create an instance of AddTodo with the mocked repository
        addTodoUseCase = new AddTodo(mockRepository);
    });

    it("calls repository.addTodo with the correct todo", async () => {
        const todo: Todo = { id: "1", title: "Test Todo" };

        await addTodoUseCase.execute(todo);

        expect(mockRepository.addTodo).toHaveBeenCalledWith(todo);
        expect(mockRepository.addTodo).toHaveBeenCalledTimes(1);
    });

    it("throws an error if repository.addTodo fails", async () => {
        const todo: Todo = { id: "1", title: "Test Todo" };
        const error = new Error("Failed to add todo");

        mockRepository.addTodo.mockRejectedValueOnce(error);

        await expect(addTodoUseCase.execute(todo)).rejects.toThrow("Failed to add todo");
        expect(mockRepository.addTodo).toHaveBeenCalledWith(todo);
        expect(mockRepository.addTodo).toHaveBeenCalledTimes(1);
    });
});