import { z } from "zod/mini";

export const createColumnSchema = z.object({
    name: z
        .string()
        .check(
            z.normalize("NFC"),
            z.trim(),
            z.minLength(4, "Le nom de la colonne doit contenir au moins" + " 4 caractères"),
        ),
});

export type CreateColumnDto = z.infer<typeof createColumnSchema>;

export const updateColumnSchema = z.object({
    name: z
        .string()
        .check(
            z.normalize("NFC"),
            z.trim(),
            z.minLength(4, "Le nom de la colonne doit contenir au moins" + " 4 caractères"),
        ),
});

export type UpdateColumnDto = z.infer<typeof updateColumnSchema>;

export const reorderColumnSchema = z.object({
    newPosition: z.number().check(z.int(), z.minimum(0, "La position doit être un nombre positif")),
});

export type ReorderColumnDto = z.infer<typeof reorderColumnSchema>;
