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
