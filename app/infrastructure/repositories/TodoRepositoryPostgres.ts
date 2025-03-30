import { eq } from "drizzle-orm";
import { drizzleDb } from "../db";
import { todos } from "../schema";
import { ITodoRepository } from "@/application/interfaces/ITodoRepository";
import { Todo } from "@/domain/entities/Todo";

export class TodoRepositoryPostgres implements ITodoRepository {
    async addTodo(todo: Todo) {
        await drizzleDb.insert(todos).values({ title: todo.title });
    }

    async getTodos() {
        return await drizzleDb.select().from(todos);
    }

    async getTodoById(id: number): Promise<Todo | null> {
        const result = await drizzleDb.select().from(todos).where(eq(todos.id, id));
        return result.length > 0 ? result[0] : null;
    }

    async deleteTodo(id: number) {
        await drizzleDb.delete(todos).where(eq(todos.id, id));
    }

    async updateTodo(todo: Todo) {
        const { id, title } = todo;
        await drizzleDb.update(todos).set({ title }).where(eq(todos.id, id));
    }
}