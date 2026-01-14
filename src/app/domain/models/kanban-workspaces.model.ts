import { Columns } from "@domain/models/kanban-columns.model";

export type Workspaces = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt?: string | null;
    columns: Columns[];
};
