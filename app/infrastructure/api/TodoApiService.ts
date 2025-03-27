// import ApiService from "@/infrastructure/services/ApiService";
// import { Todo } from "@/domain/entities/Todo";

// export class TodoApiService extends ApiService {
//     constructor() {
//         super("https://api.example.com/todos"); // Replace with your actual API URL
//     }

//     async fetchTodos(): Promise<Todo[]> {
//         return this.request("/");
//     }

//     async fetchTodo(id: string): Promise<Todo> {
//         return this.request(`/${id}`);
//     }

//     async addTodo(todo: Todo): Promise<Todo> {
//         return this.request("/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(todo),
//         });
//     }

//     async deleteTodo(id: string): Promise<void> {
//         await this.request(`/${id}`, {
//             method: "DELETE",
//         });
//     }
// }