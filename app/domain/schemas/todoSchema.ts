import { z } from "zod";

export const todoSchema = z.object({
    id: z.number().int(),
    title: z.string().min(1, "Title is required").max(100, "Title is too long"),
});

export type TodoFormValues = z.infer<typeof todoSchema>;