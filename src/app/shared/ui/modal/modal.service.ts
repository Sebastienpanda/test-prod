import { inject, Injectable, signal } from "@angular/core";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { CreateTaskDto } from "@domain/gateways/tasks.gateway";
import { TasksUseCase } from "@domain/use-cases/tasks.use-case";
import { TASKS_GATEWAY } from "@application/tokens";

@Injectable({
    providedIn: "root",
})
export class ModalService {
    private readonly tasksUseCase = new TasksUseCase(inject(TASKS_GATEWAY));

    readonly isOpen = signal(false);
    readonly selectedItem = signal<Tasks | null>(null);
    readonly onTaskCreated = signal<Tasks | null>(null);

    openModal(item: Tasks): void {
        this.selectedItem.set(item);
        this.isOpen.set(true);
    }

    closeModal(): void {
        this.isOpen.set(false);
        this.selectedItem.set(null);
    }

    createTask(task: CreateTaskDto): Observable<Tasks> {
        return this.tasksUseCase.create(task).pipe(tap((createdTask) => this.onTaskCreated.set(createdTask)));
    }

    updateTask(task: Tasks): Observable<Tasks> {
        return this.tasksUseCase.update(task).pipe(tap((updatedTask) => this.selectedItem.set(updatedTask)));
    }
}
