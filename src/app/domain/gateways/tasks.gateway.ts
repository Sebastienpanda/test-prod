import type { Observable } from "rxjs";
import type { Tasks } from "@domain/models/kanban-tasks.model";

export type CreateTaskDto = Omit<Tasks, "id" | "createdAt" | "updatedAt" | "order">;

export type ReorderTaskDto = {
    newOrder: number;
    newColumnId?: string;
};

export interface TasksGateway {
    create(task: CreateTaskDto): Observable<Tasks>;
    update(task: Tasks): Observable<Tasks>;
    reorder(taskId: string, dto: ReorderTaskDto): Observable<Tasks>;
}
