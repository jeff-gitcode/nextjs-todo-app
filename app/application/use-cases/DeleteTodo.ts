import { ITodoRepository } from "../interfaces/ITodoRepository";

export class DeleteTodo {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(id: string) {
        await this.repository.deleteTodo(id);
    }
}