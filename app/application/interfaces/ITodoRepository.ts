import { Todo } from "app/domain/entities/Todo";

export interface ITodoRepository {
    addTodo(todo: Todo): Promise<void>;
    getTodos(): Promise<Todo[]>;
    deleteTodo(id: string): Promise<void>;
    updateTodo(todo: Todo): Promise<void>;
    getTodoById(id: string): Promise<Todo | null>;
}