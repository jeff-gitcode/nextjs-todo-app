
import { eq } from "drizzle-orm";
import { drizzleDb } from "../db";
import { todos } from "../schema";
import { ITodoRepository } from "@/application/interfaces/ITodoRepository";
import { Todo } from "@/domain/entities/Todo";
import { PGlite } from "@electric-sql/pglite";

export class TodoRepositoryPGLite implements ITodoRepository {
    constructor() {

        // drizzleDb.execute("CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL);");
    }

    async addTodo(todo: { title: string }) {
        await drizzleDb.insert(todos).values(todo);
    }

    async getTodos() {
        try {
            const result = await drizzleDb.select().from(todos);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
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