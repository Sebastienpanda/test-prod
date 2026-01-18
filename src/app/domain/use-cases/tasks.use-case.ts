import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { Task } from "@domain/models/task.model";
import type {
    CreateTaskDto,
    ReorderTaskDto,
    TasksGateway,
    UpdateTaskDto,
} from "@domain/gateways/tasks.gateway";
import { TASKS_GATEWAY } from "@application/tokens";

@Injectable({
    providedIn: "root",
})
export class TasksUseCase {
    private readonly gateway = inject(TASKS_GATEWAY);

    getTask(id: string): Observable<Task> {
        return this.gateway.getTask(id);
    }

    createTask(dto: CreateTaskDto): Observable<Task> {
        return this.gateway.createTask(dto).pipe(
            tap((task) => console.log("[TasksUseCase] Task created:", task)),
        );
    }

    updateTask(id: string, dto: UpdateTaskDto): Observable<Task> {
        return this.gateway.updateTask(id, dto).pipe(
            tap((task) => console.log("[TasksUseCase] Task updated:", task)),
        );
    }

    reorderTask(id: string, dto: ReorderTaskDto): Observable<Task> {
        return this.gateway.reorderTask(id, dto).pipe(
            tap((task) => console.log("[TasksUseCase] Task reordered:", task)),
        );
    }
}