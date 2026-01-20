export type StatutColorEnum = "blue" | "orange" | "green" | "red" | "purple" | "pink" | "yellow" | "gray";

export type Statut = {
    id: string;
    name: string;
    color: StatutColorEnum;
    workspaceId: string;
    userId: string;
    createdAt: string;
    updatedAt?: string | null;
};
