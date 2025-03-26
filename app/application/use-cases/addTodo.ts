import { Todo } from "app/domain/entities/Todo";
import { ITodoRepository } from "app/application/interfaces/ITodoRepository";

export const addTodo = async (repository: ITodoRepository, title: string): Promise<void> => {
    const todo = new Todo(Date.now().toString(), title);
    await repository.addTodo(todo);
};