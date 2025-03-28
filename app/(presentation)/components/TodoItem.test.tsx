// FILE: TodoItem.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { useTodoItem } from "../hooks/useTodoItem";
import { Todo } from "@/domain/entities/Todo";
import { act } from "react";

// Mock the `useTodoItem` hook
jest.mock("../hooks/useTodoItem", () => ({
  useTodoItem: jest.fn(),
}));

describe("TodoItem Component", () => {
  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  const mockTodo: Todo = {
    id: "1",
    title: "Sample Todo",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoItem component with the correct fields", () => {
    (useTodoItem as jest.Mock).mockReturnValue({
      todo: mockTodo,
      loading: false,
      error: null,
    });

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample Todo")).toBeInTheDocument();
  });

  it("displays a loading message when loading is true", () => {
    (useTodoItem as jest.Mock).mockReturnValue({
      todo: { id: "", title: "" },
      loading: true,
      error: null,
    });

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when there is an error", () => {
    (useTodoItem as jest.Mock).mockReturnValue({
      todo: { id: "", title: "" },
      loading: false,
      error: "Failed to load todo",
    });

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);

    expect(screen.getByText("Failed to load todo")).toBeInTheDocument();
  });

  it("calls onUpdate with the correct arguments when the form is submitted", async () => {
    (useTodoItem as jest.Mock).mockReturnValue({
      todo: mockTodo,
      loading: false,
      error: null,
    });

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} />);

    const titleInput = screen.getByPlaceholderText("Enter title");

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Updated Todo" } });
    });

    const submitButton = screen.getByText("Update");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnUpdate).toHaveBeenCalledWith("1", "Updated Todo");
  });
});