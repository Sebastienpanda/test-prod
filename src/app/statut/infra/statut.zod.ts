import { z } from "zod/mini";

const StatutNameSchema = z
    .string()
    .check(z.normalize("NFC"), z.trim(), z.minLength(4, "Le nom doit contenir au moins 4 caractères"));

export const createStatutSchema = z.object({
    name: StatutNameSchema,
    color: z._default(z.enum(["blue", "orange", "green", "red", "purple", "pink", "yellow", "gray"]), "blue"),
    workspaceId: z.uuid("L'ID du workspace doit être valide"),
});

export type CreateStatutDto = z.infer<typeof createStatutSchema>;

export const updateStatutSchema = z.object({
    name: z.optional(StatutNameSchema),
    color: z.optional(z.enum(["blue", "orange", "green", "red", "purple", "pink", "yellow", "gray"])),
    workspaceId: z.optional(z.uuid("L'ID du workspace doit être valide")),
});

export type UpdateStatutDto = z.infer<typeof updateStatutSchema>;
