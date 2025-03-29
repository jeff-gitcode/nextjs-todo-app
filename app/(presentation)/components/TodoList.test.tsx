// FILE: app/(presentation)/components/TodoList.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { Todo } from "../../domain/entities/Todo";

describe("TodoList Component", () => {
    const mockOnUpdate = jest.fn();
    const mockOnDelete = jest.fn();

    const mockTodos: Todo[] = [
        { id: 1, title: "First Todo" },
        { id: 2, title: "Second Todo" },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the TodoList component with the correct data", () => {
        render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

        // Check that the table headers are rendered
        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("Actions")).toBeInTheDocument();

        // Check that the todos are rendered
        mockTodos.forEach((todo) => {
            expect(screen.getByText(todo.id)).toBeInTheDocument();
            expect(screen.getByText(todo.title)).toBeInTheDocument();
        });
    });

    it("calls onUpdate with the correct id when the Update button is clicked", () => {
        render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

        const updateButtons = screen.getAllByText("Update");

        // Simulate clicking the Update button for the first todo
        fireEvent.click(updateButtons[0]);

        expect(mockOnUpdate).toHaveBeenCalledWith("1");
        expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    });

    it("calls onDelete with the correct id when the Delete button is clicked", () => {
        render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

        const deleteButtons = screen.getAllByText("Delete");

        // Simulate clicking the Delete button for the second todo
        fireEvent.click(deleteButtons[1]);

        expect(mockOnDelete).toHaveBeenCalledWith("2");
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    it("renders an empty state when no todos are provided", () => {
        render(<TodoList todos={[]} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

        // Check that no rows are rendered
        expect(screen.queryByText("ID")).toBeInTheDocument(); // Header should still be present
        expect(screen.queryByText("First Todo")).not.toBeInTheDocument();
        expect(screen.queryByText("Second Todo")).not.toBeInTheDocument();
    });
});