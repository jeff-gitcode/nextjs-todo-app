
// Define the IUserRepository interface
export interface IUserRepository {
    findByEmail(email: string): Promise<{ id: number; email: string; password: string } | null>;
    create(user: { email: string; password: string }): Promise<void>;
}