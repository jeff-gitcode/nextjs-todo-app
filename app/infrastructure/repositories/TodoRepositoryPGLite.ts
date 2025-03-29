
import { eq } from "drizzle-orm";
import { drizzleDb } from "../db";
import { todos } from "../schema";
import { ITodoRepository } from "@/application/interfaces/ITodoRepository";
import { Todo } from "@/domain/entities/Todo";

export class TodoRepository implements ITodoRepository {
    constructor() {
        // drizzleDb.createTable(todos).ifNotExists().run();
    }

    async addTodo(todo: { title: string }) {
        await drizzleDb.insert(todos).values(todo);
    }

    async getTodos() {
        return await drizzleDb.select().from(todos);
    }

    async getTodoById(id: number): Promise<Todo | null> {
        const result = await drizzleDb.select().from(todos).where(eq(todos.id, id));
        return result.length > 0 ? result.at(-1) as Todo : null;
    }

    async deleteTodo(id: number) {
        await drizzleDb.delete(todos).where(eq(todos.id, id));
    }

    async updateTodo(todo: Todo) {
        const { id, title } = todo;
        await drizzleDb.update(todos).set({ title }).where(eq(todos.id, id));
    }
}