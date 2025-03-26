export default class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.example.com/todos'; // Replace with your actual API URL
    }

    async fetchTodos(): Promise<any> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        return response.json();
    }

    async addTodo(todo: any): Promise<any> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        return response.json();
    }

    async deleteTodo(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }
    }
}