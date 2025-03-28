import { UpdateTodo } from "./UpdateTodo";
import { ITodoRepository } from "../interfaces/ITodoRepository";

describe("UpdateTodo - Constructor", () => {
    let mockRepository: jest.Mocked<ITodoRepository>;

    beforeEach(() => {
        // Mock the repository
        mockRepository = {
            addTodo: jest.fn(),
            getTodos: jest.fn(),
            deleteTodo: jest.fn(),
            updateTodo: jest.fn(),
            getTodoById: jest.fn(),
        };
    });

    it("should create an instance of UpdateTodo with a valid repository", () => {
        const updateTodoUseCase = new UpdateTodo(mockRepository);

        expect(updateTodoUseCase).toBeInstanceOf(UpdateTodo);
    });

    it("should assign the repository correctly", () => {
        const updateTodoUseCase = new UpdateTodo(mockRepository);

        // Access the private repository property via a cast to any
        expect((updateTodoUseCase as any).repository).toBe(mockRepository);
    });
});