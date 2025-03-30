import { NextResponse } from "next/server";
import { useCases } from "@/(presentation)/di";

export async function POST(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);
    console.log("pathname", pathname);

    if (pathname.endsWith("/register")) {
        const { email, password } = await req.json();

        try {
            await useCases.signUp.execute({ email, password });
            return NextResponse.json({ message: "User created successfully" }, { status: 201 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
    }

    if (pathname.endsWith("/sign-in")) {
        const { email, password } = await req.json();

        try {
            const user = await useCases.signIn.execute({ email, password });
            return NextResponse.json({ message: "Sign-in successful", user }, { status: 200 });
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
    }

    return NextResponse.json({ error: "Invalid route" }, { status: 404 });
}