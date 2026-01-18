import * as z from "zod/mini";

export const taskTitleSchema = z
    .string()
    .check(z.minLength(5, "Le titre doit contenir au moins 5 caractères"));

export const taskDescriptionSchema = z
    .string()
    .check(z.minLength(1, "La description est obligatoire"));

export const createTaskSchema = z.object({
    title: taskTitleSchema,
    description: taskDescriptionSchema,
    statusId: z.string(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
