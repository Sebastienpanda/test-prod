import type { Observable } from "rxjs";
import type { Task } from "./task.model";
import type { CreateTaskDto, ReorderTaskDto, UpdateTaskDTO } from "../infra/task.zod";

export interface TaskGateway {
    getTask(id: string): Observable<Task>;
    createTask(dto: CreateTaskDto): Observable<Task>;
    updateTask(id: string, dto: UpdateTaskDTO): Observable<Task>;
    reorderTask(id: string, dto: ReorderTaskDto): Observable<Task>;
}
