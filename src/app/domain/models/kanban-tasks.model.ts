export type Status = "todo" | "in_progress" | "done";

export type StatusOption = {
    readonly value: Status;
    readonly label: string;
};

export const STATUS_OPTIONS: readonly StatusOption[] = [
    { value: "todo", label: "À faire" },
    { value: "in_progress", label: "En cours" },
    { value: "done", label: "Terminé" },
];

const COLUMN_NAME_TO_STATUS: Record<string, Status> = {
    "À faire": "todo",
    "En cours": "in_progress",
    "Terminé": "done",
};

export function getStatusFromColumnName(columnName: string): Status {
    return COLUMN_NAME_TO_STATUS[columnName] ?? "todo";
}

export type Tasks = {
    id: string;
    title: string;
    description: string;
    status: Status;
    columnId: string;
    order: number;
    createdAt: string;
    updatedAt?: string | null;
};
