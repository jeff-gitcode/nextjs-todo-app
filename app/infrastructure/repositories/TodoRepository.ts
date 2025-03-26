import { ITodoRepository } from "app/application/interfaces/ITodoRepository";
import { Todo } from "app/domain/entities/Todo";
import { TodoId } from "app/domain/value-objects/TodoId";

export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = [];

    async addTodo(todo: Todo): Promise<void> {
        this.todos.push(todo);
    }

    async getTodos(): Promise<Todo[]> {
        return this.todos;
    }

    async deleteTodo(todoId: TodoId): Promise<void> {
        this.todos = this.todos.filter((todo) => todo.id !== todoId.getValue());
    }
}