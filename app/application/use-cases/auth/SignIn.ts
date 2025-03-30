import { IUserRepository } from "@/application/interfaces/IUserRepository";
import bcrypt from "bcrypt";

export class SignIn {
    constructor(private readonly repository: IUserRepository) { }

    async execute({ email, password }: { email: string; password: string }) {
        const user = await this.repository.findByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return { id: user.id, email: user.email };
    }
}