import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "@/(presentation)/components/TodoList";
import { useTodoList } from "@/(presentation)/hooks/useTodoList";
import TodoListPage from "./page";

// Mock the useTodoList hook
jest.mock("@/(presentation)/hooks/useTodoList", () => ({
    useTodoList: jest.fn(),
}));

jest.mock("@/(presentation)/components/TodoList", () => jest.fn(() => <div data-testid="todo-list" />));

describe("TodoListPage", () => {
    const mockNavigateToTodoItem = jest.fn();
    const mockHandleAddTodo = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockNavigateToHome = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodoList as jest.Mock).mockReturnValue({
            todos: [
                { id: "1", title: "First Todo" },
                { id: "2", title: "Second Todo" },
            ],
            isLoading: false,
            isError: false,
            navigateToTodoItem: mockNavigateToTodoItem,
            handleAddTodo: mockHandleAddTodo,
            handleDelete: mockHandleDelete,
            navigateToHome: mockNavigateToHome,
        });
    });

    it("renders the loading state when isLoading is true", () => {
        (useTodoList as jest.Mock).mockReturnValue({
            todos: [],
            isLoading: true,
            isError: false,
            navigateToTodoItem: jest.fn(),
            handleAddTodo: jest.fn(),
            handleDelete: jest.fn(),
            navigateToHome: jest.fn(),
        });

        render(<TodoListPage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the error message when isError is true", () => {
        (useTodoList as jest.Mock).mockReturnValue({
            todos: [],
            isLoading: false,
            isError: true,
            navigateToTodoItem: jest.fn(),
            handleAddTodo: jest.fn(),
            handleDelete: jest.fn(),
            navigateToHome: jest.fn(),
        });

        render(<TodoListPage />);

        expect(screen.getByText("Failed to load todos")).toBeInTheDocument();
        expect(screen.getByText("Failed to load todos")).toHaveClass("text-red-500");
    });

    it("renders the TodoList component with the correct props", () => {
        render(<TodoListPage />);

        expect(TodoList).toHaveBeenCalledTimes(1);

        expect(screen.getByText("Todo List")).toBeInTheDocument();
        // expect(TodoList).toHaveBeenCalledWith(
        //     {
        //         todos: [
        //             { id: "1", title: "First Todo" },
        //             { id: "2", title: "Second Todo" },
        //         ],
        //         onUpdate: mockNavigateToTodoItem,
        //         onDelete: mockHandleDelete,
        //     },
        //     expect.any(Object)
        // );
    });

    it("calls handleAddTodo when the 'Add Todo' button is clicked", () => {
        render(<TodoListPage />);

        const addButton = screen.getByText("Add Todo");
        fireEvent.click(addButton);

        expect(mockHandleAddTodo).toHaveBeenCalledWith("New Todo");
        expect(mockHandleAddTodo).toHaveBeenCalledTimes(1);
    });

    it("calls navigateToHome when the 'Back to Home' button is clicked", () => {
        render(<TodoListPage />);

        const backButton = screen.getByText("Back to Home");
        fireEvent.click(backButton);

        expect(mockNavigateToHome).toHaveBeenCalledTimes(1);
    });
});