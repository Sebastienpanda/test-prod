import type { Observable } from "rxjs";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { CreateTaskDto, TasksGateway } from "@domain/gateways/tasks.gateway";

export class TasksUseCase {
    constructor(private readonly gateway: TasksGateway) {}

    create(task: CreateTaskDto): Observable<Tasks> {
        return this.gateway.create(task);
    }

    update(task: Tasks): Observable<Tasks> {
        return this.gateway.update(task);
    }
}
