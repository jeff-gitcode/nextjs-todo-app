import { ITodoRepository } from "app/application/interfaces/ITodoRepository";
import { Todo } from "app/domain/entities/Todo";

export class TodoRepository implements ITodoRepository {
    private todos: Todo[] = [
        new Todo("1", "Todo 1"),
        new Todo("2", "Todo 2"),
        new Todo("3", "Todo 3"),
    ];
    private id: number = 1;

    async addTodo(todo: Todo): Promise<void> {
        // add todo
        const newId = this.id++;
        const newTodo = new Todo(newId.toString(), todo.title);
        console.log("Adding todo", newTodo);
        this.todos.push(newTodo);
    }

    async getTodos(): Promise<Todo[]> {
        return this.todos;
    }

    async getTodoById(todoId: string): Promise<Todo | null> {
        console.log("Getting todo by id", todoId);
        const todo = this.todos.find((todo) => todo.id === todoId);
        if (!todo) {
            return null;
        }

        return todo;
    }

    async deleteTodo(todoId: string): Promise<void> {
        this.todos = this.todos.filter((todo) => todo.id !== todoId);
    }

    async updateTodo(todo: Todo): Promise<void> {
        this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    }
}   