import type { TaskGateway } from "./task.gateway";
import type { Observable } from "rxjs";
import type { Task } from "./task.model";
import type { CreateTaskDto, ReorderTaskDto, UpdateTaskDTO } from "../infra/task.zod";

export class TaskUseCase {
    constructor(private readonly _gateway: TaskGateway) {}

    getTask(id: string): Observable<Task> {
        return this._gateway.getTask(id);
    }
    createTask(dto: CreateTaskDto): Observable<Task> {
        return this._gateway.createTask(dto);
    }
    updateTask(id: string, dto: UpdateTaskDTO): Observable<Task> {
        return this._gateway.updateTask(id, dto);
    }
    reorderTask(id: string, dto: ReorderTaskDto): Observable<Task> {
        return this._gateway.reorderTask(id, dto);
    }
}
