import { Tasks } from "@domain/models/kanban-tasks.model";

export type Columns = {
    id: string;
    name: string;
    workspaceId: string;
    position: number;
    createdAt: string;
    updatedAt?: string | null;
    tasks: Tasks[];
};
