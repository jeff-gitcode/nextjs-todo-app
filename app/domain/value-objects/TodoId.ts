export class TodoId {
    private readonly value: string;

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid Todo ID');
        }
        this.value = value;
    }

    private isValid(value: string): boolean {
        return typeof value === 'string' && value.length > 0;
    }

    public getValue(): string {
        return this.value;
    }

    public equals(other: TodoId): boolean {
        return this.value === other.getValue();
    }
}