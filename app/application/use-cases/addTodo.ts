import { Todo } from "app/domain/entities/Todo";
import { ITodoRepository } from "app/application/interfaces/ITodoRepository";

export class AddTodo {
    constructor(private readonly repository: ITodoRepository) { }

    async execute(todo: Todo): Promise<void> {
        await this.repository.addTodo(todo);
    }
}