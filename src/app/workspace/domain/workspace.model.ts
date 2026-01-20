import type { Column } from "@column/domain/column.model";
import type { Statut } from "@statut/domain/statut.model";

export type Workspace = {
    id: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt?: string | null;
    statuses: Statut[];
    columns: Column[];
};

export type WorkspaceResponse = Omit<Workspace, "statuses" | "columns">;
