import { z } from "zod/mini";

export const createTaskSchema = z.object({
    title: z
        .string()
        .check(z.normalize("NFC"), z.trim(), z.minLength(5, "Le titre doit contenir au moins 5 caractères")),
    description: z.string().check(z.normalize("NFC"), z.trim(), z.minLength(1, "La description est obligatoire")),
    statusId: z.optional(z.uuid("L'ID du statut doit être un UUID valide")),
    columnId: z.uuid("L'ID de la colonne doit être un UUID valide"),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
    title: z.optional(
        z.string().check(z.normalize("NFC"), z.trim(), z.minLength(5, "Le titre doit contenir au moins 5 caractères")),
    ),
    description: z.optional(
        z.string().check(z.normalize("NFC"), z.trim(), z.minLength(1, "La description est obligatoire")),
    ),
    statusId: z.optional(z.uuid("L'ID du statut doit être un UUID valide")),
    columnId: z.optional(z.uuid("L'ID de la colonne doit être un UUID valide")),
});

export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;

export const reorderTaskSchema = z.object({
    newOrder: z.number().check(z.int(), z.minimum(0, "La position doit être un nombre positif")),
    newColumnId: z.optional(z.uuid("L'ID de la colonne doit être un UUID valide")),
});

export type ReorderTaskDto = z.infer<typeof reorderTaskSchema>;
