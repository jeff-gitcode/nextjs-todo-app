import { ITodoRepository } from "app/application/interfaces/ITodoRepository";
import { Todo } from "app/domain/entities/Todo";

export class TodoRepositoryInMemo implements ITodoRepository {
    private todos: Todo[] = [
        new Todo(1, "Todo 1"),
        new Todo(2, "Todo 2"),
        new Todo(3, "Todo 3"),
    ];
    private id: number = 1;

    async addTodo(todo: Todo): Promise<void> {
        // add todo
        const newId = this.id++;
        const newTodo = new Todo(newId, todo.title);
        this.todos.push(newTodo);
    }

    async getTodos(): Promise<Todo[]> {
        return this.todos;
    }

    async getTodoById(id: number): Promise<Todo | null> {
        const todo = this.todos.find((todo) => todo.id === Number(id));
        if (!todo) {
            return null;
        }

        return todo;
    }

    async deleteTodo(id: number): Promise<void> {
        this.todos = this.todos.filter((todo) => todo.id !== Number(id));
    }

    async updateTodo(todo: Todo): Promise<void> {
        this.todos = this.todos.map((t) => (t.id === Number(todo.id) ? todo : t));
    }
}   