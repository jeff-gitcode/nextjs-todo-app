import { IUserRepository } from "@/application/interfaces/IUserRepository";
import bcrypt from "bcrypt";

export class SignUp {
    constructor(private readonly repository: IUserRepository) { }

    async execute({ email, password }: { email: string; password: string }) {
        const existingUser = await this.repository.findByEmail(email);
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.repository.create({ email, password: hashedPassword });
    }
}