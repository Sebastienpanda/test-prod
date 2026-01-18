import type { Observable } from "rxjs";
import type { Task } from "@domain/models/task.model";

export type CreateTaskDto = {
    title: string;
    description: string;
    statusId: string;
    columnId: string;
};

export type UpdateTaskDto = {
    title?: string;
    description?: string;
    statusId?: string;
    columnId?: string;
};

export type ReorderTaskDto = {
    newOrder: number;
    newColumnId?: string;
};

export interface TasksGateway {
    getTask(id: string): Observable<Task>;
    createTask(dto: CreateTaskDto): Observable<Task>;
    updateTask(id: string, dto: UpdateTaskDto): Observable<Task>;
    reorderTask(id: string, dto: ReorderTaskDto): Observable<Task>;
}