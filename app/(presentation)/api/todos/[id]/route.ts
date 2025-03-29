import { NextResponse } from "next/server";
import { useCases } from "@/(presentation)/di";

// delete todo
export async function DELETE(req: Request, { params }: { params: Promise<{ id: number }> }): Promise<Response> {
    const { id } = await params;
    try {
        const todo = await useCases.getTodoById.execute(id); // Check if the todo exists
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        await useCases.deleteTodo.execute(id);
        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// get todo by id
export async function GET(req: Request, { params }: { params: Promise<{ id: number }> }): Promise<Response> {
    const { id } = await params;
    try {
        const todo = await useCases.getTodoById.execute(id);
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// update todo
export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }): Promise<Response> {
    const { id } = await params;
    const { title } = await req.json();
    try {
        const todo = await useCases.getTodoById.execute(id); // Check if the todo exists
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        await useCases.updateTodo.execute({ id, title });
        return NextResponse.json({ message: "Todo updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}