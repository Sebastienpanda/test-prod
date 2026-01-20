import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import type { Observable } from "rxjs";
import type { TaskGateway } from "../domain/task.gateway";
import type { CreateTaskDto, ReorderTaskDto, UpdateTaskDTO } from "./task.zod";
import type { Task } from "../domain/task.model";

export class HttpTaskGateway implements TaskGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiUrl;

    createTask(task: CreateTaskDto): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
    }

    getTask(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
    }

    reorderTask(taskId: string, dto: ReorderTaskDto): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/tasks/${taskId}/reorder`, dto);
    }

    updateTask(id: string, dto: UpdateTaskDTO): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/tasks/${id}`, dto);
    }
}
