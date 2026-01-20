import { z } from "zod/mini";

export const createWorkspaceSchema = z.object({
    name: z
        .string()
        .check(z.normalize("NFC"), z.trim(), z.minLength(5, "Le nom du workspace doit contenir au moins 5 caractères")),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;

export const updateWorkspaceSchema = z.object({
    name: z
        .string()
        .check(z.normalize("NFC"), z.trim(), z.minLength(5, "Le nom du workspace doit contenir au moins 5 caractères")),
});

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
