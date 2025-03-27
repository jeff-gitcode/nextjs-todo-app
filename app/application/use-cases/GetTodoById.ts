import { ITodoRepository } from "../interfaces/ITodoRepository";

// get todo by id
export class GetTodoById {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(id: string) {
        console.log('GetTodoById.execute()', id);
        return await this.repository.getTodoById(id);
    }
}   