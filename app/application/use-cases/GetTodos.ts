import { ITodoRepository } from "../interfaces/ITodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class GetTodos {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(): Promise<Todo[]> {
        return await this.repository.getTodos();
    }
}