import { NextResponse } from "next/server";
import { useCases } from "@/(presentation)/di";
import { Todo } from "@/domain/entities/Todo";

// Get all todos
export async function GET(): Promise<Response> {
    const todos = await useCases.getTodos.execute();
    return NextResponse.json(todos);
}

// Add a new todo
export async function POST(req: Request): Promise<Response> {
    const { title } = await req.json();
    await useCases.addTodo.execute(new Todo("", title));
    return NextResponse.json({ message: "Todo added successfully" });
}