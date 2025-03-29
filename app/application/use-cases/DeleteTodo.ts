import { ITodoRepository } from "../interfaces/ITodoRepository";

export class DeleteTodo {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(id: number) {
        await this.repository.deleteTodo(id);
    }
}