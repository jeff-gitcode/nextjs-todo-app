export default class ApiService<T> {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl; // Base URL for the API
    }

    async getAll(): Promise<T[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch resources: ${response.statusText}`);
        }
        return response.json();
    }

    async getById(id: string): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch resource with ID ${id}: ${response.statusText}`);
        }
        return response.json();
    }

    async create(data: T): Promise<T> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to create resource: ${response.statusText}`);
        }
        return response.json();
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to update resource with ID ${id}: ${response.statusText}`);
        }
        return response.json();
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete resource with ID ${id}: ${response.statusText}`);
        }
    }
}