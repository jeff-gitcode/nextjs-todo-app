// File: TodoItem.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/domain/schemas/todoSchema";

describe("TodoItem Component", () => {
  const renderWithForm = (defaultValues = { id: "", title: "" }, onSubmit = jest.fn()) => {
    const form = useForm({
      resolver: zodResolver(todoSchema),
      defaultValues,
    });

    return render(
      <FormProvider {...form}>
        <TodoItem todo={defaultValues} onSubmit={onSubmit} />
      </FormProvider>
    );
  };

  it("renders the title input field", () => {
    renderWithForm();

    const titleInput = screen.getByPlaceholderText("Enter title");
    expect(titleInput).toBeInTheDocument();
  });

  it("displays the correct button text for creating a todo", () => {
    renderWithForm();

    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("displays the correct button text for updating a todo", () => {
    renderWithForm({ id: "1", title: "Sample Todo" });

    const submitButton = screen.getByRole("button", { name: /update/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("calls onSubmit with the correct data when the form is submitted", async () => {
    const onSubmit = jest.fn();
    renderWithForm({ id: "", title: "" }, onSubmit);

    const titleInput = screen.getByPlaceholderText("Enter title");
    const submitButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(titleInput, { target: { value: "New Todo" } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(
      { id: "", title: "New Todo" },
      expect.anything()
    );
  });

  it("validates the title field and shows an error message if empty", async () => {
    renderWithForm();

    const submitButton = screen.getByRole("button", { name: /create/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Title is required");
    expect(errorMessage).toBeInTheDocument();
  });
});