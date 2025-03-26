import { Todo } from "app/domain/entities/Todo";
import { TodoId } from "app/domain/value-objects/TodoId";

export interface ITodoRepository {
    addTodo(todo: Todo): Promise<void>;
    getTodos(): Promise<Todo[]>;
    deleteTodo(id: TodoId): Promise<void>;
}