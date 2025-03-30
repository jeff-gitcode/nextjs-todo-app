import { IUserRepository } from "@/application/interfaces/IUserRepository";
import { drizzleDb } from "@/infrastructure/db";
import { users } from "@/infrastructure/schema";
import { eq } from "drizzle-orm";

export class UserRepositoryPostgres implements IUserRepository {
    async findByEmail(email: string) {
        const result = await drizzleDb.select().from(users).where(eq(users.email, email));
        return result.length > 0 ? result[0] : null;
    }

    async create({ email, password }: { email: string; password: string }) {
        await drizzleDb.insert(users).values({ email, password });
    }
}