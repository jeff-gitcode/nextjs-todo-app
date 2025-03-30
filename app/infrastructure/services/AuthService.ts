import { User } from "@clerk/nextjs/dist/types/server";
import ApiService from "./ApiService";

export class AuthService extends ApiService<User> {
    constructor() {
        super('http://localhost:3000/api/users'); // Replace with your actual API URL
    }

    // You can add User-specific methods here if needed
}