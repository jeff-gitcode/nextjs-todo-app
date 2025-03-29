// import { verifyToken } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export async function middleware(req: Request) {
//     const token = req.headers.get("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     try {
//         const payload = await verifyToken(token, );
//         console.log("JWT Payload:", payload);
//         return NextResponse.next();
//     } catch (error) {
//         return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
// }