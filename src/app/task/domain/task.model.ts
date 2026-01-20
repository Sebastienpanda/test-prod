export type Task = {
    id: string;
    title: string;
    description: string;
    statusId?: string | null;
    columnId: string;
    userId: string;
    order: number;
    createdAt: string;
    updatedAt?: string | null;
};
