import { AddTodo } from "@/application/use-cases/AddTodo";
import { GetTodos } from "@/application/use-cases/GetTodos";
import { DeleteTodo } from "@/application/use-cases/DeleteTodo";
import { GetTodoById } from "@/application/use-cases/GetTodoById";
import { UpdateTodo } from "@/application/use-cases/UpdateTodo";
import { TodoRepositoryPostgres } from '@/infrastructure/repositories/TodoRepositoryPostgres';
import { SignUp } from "@/application/use-cases/auth/SignUp";
import { SignIn } from "@/application/use-cases/auth/SignIn";
import { UserRepositoryPostgres } from "@/infrastructure/repositories/UserRepositoryPostgres";

// Instantiate the repository (Infrastructure Layer)
const repository = new TodoRepositoryPostgres();
const userRepository = new UserRepositoryPostgres();

// Instantiate use cases (Application Layer)
export const useCases = {
    addTodo: new AddTodo(repository),
    getTodos: new GetTodos(repository),
    getTodoById: new GetTodoById(repository),
    updateTodo: new UpdateTodo(repository),
    deleteTodo: new DeleteTodo(repository),

    signUp: new SignUp(userRepository),
    signIn: new SignIn(userRepository),
};
