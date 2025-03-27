import ApiService from "@/infrastructure/services/ApiService";
import { Todo } from "@/domain/entities/Todo";

export class TodoApiService extends ApiService<Todo> {
    constructor() {
        super('http://localhost:3000/api/todos'); // Replace with your actual API URL
    }

    // You can add Todo-specific methods here if needed
}