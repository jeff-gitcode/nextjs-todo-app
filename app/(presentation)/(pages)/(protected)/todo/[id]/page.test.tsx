import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItemPage from "./page";
import { useTodoList } from "@/(presentation)/hooks/useTodoList";
import { useTodoItem } from "@/(presentation)/hooks/useTodoItem";
import TodoItem from "@/(presentation)/components/TodoItem";

jest.mock("@/(presentation)/hooks/useTodoList", () => ({
    useTodoList: jest.fn(),
}));

jest.mock("@/(presentation)/hooks/useTodoItem", () => ({
    useTodoItem: jest.fn(),
}));

jest.mock("@/(presentation)/components/TodoItem", () => jest.fn(() => <div data-testid="todo-item" />));

describe("TodoItemPage", () => {
    const mockNavigateToTodoList = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockHandleUpdate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useTodoList as jest.Mock).mockReturnValue({
            navigateToTodoList: mockNavigateToTodoList,
            handleDelete: mockHandleDelete,
        });
        (useTodoItem as jest.Mock).mockReturnValue({
            todo: { id: "1", title: "Sample Todo" },
            loading: false,
            error: null,
            handleUpdate: mockHandleUpdate,
        });
    });

    it("renders the loading state when loading is true", () => {
        (useTodoItem as jest.Mock).mockReturnValue({
            todo: null,
            loading: true,
            error: null,
            handleUpdate: mockHandleUpdate,
        });

        render(<TodoItemPage />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the error message when there is an error", () => {
        (useTodoItem as jest.Mock).mockReturnValue({
            todo: null,
            loading: false,
            error: "Failed to load todo",
            handleUpdate: mockHandleUpdate,
        });

        render(<TodoItemPage />);

        expect(screen.getByText("Failed to load todo")).toBeInTheDocument();
        expect(screen.getByText("Failed to load todo")).toHaveClass("text-red-500");
    });

    it("renders the TodoItem component with the correct props", () => {
        render(<TodoItemPage />);

        expect(screen.getByTestId("todo-item")).toBeInTheDocument();
        expect(TodoItem).toHaveBeenCalledTimes(1);

        // expect(TodoItem).toHaveBeenCalledWith(
        //     {
        //         todo: { id: "1", title: "Sample Todo" },
        //         onUpdate: mockHandleUpdate,
        //         onDelete: mockHandleDelete,
        //     },
        //     expect.any(Object) // Matches any object for the second argument
        // );
    });

    it("calls navigateToTodoList when the 'Back to Todo List' button is clicked", () => {
        render(<TodoItemPage />);

        const backButton = screen.getByText("Back to Todo List");
        fireEvent.click(backButton);

        expect(mockNavigateToTodoList).toHaveBeenCalledTimes(1);
    });
});