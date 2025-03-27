import { Todo } from "@/domain/entities/Todo";
import { ITodoRepository } from "../interfaces/ITodoRepository";

export class UpdateTodo {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(todo: Todo): Promise<void> {
        await this.repository.updateTodo(todo);
    }
}