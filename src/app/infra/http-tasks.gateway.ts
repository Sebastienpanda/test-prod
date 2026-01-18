import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type {
    CreateTaskDto,
    ReorderTaskDto,
    TasksGateway,
    UpdateTaskDto,
} from "@domain/gateways/tasks.gateway";
import type { Task } from "@domain/models/task.model";
import { environment } from "@environments/environment";

export class HttpTasksGateway implements TasksGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/tasks`;

    getTask(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/${id}`);
    }

    createTask(dto: CreateTaskDto): Observable<Task> {
        return this.http.post<Task>(this.baseUrl, dto);
    }

    updateTask(id: string, dto: UpdateTaskDto): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/${id}`, dto);
    }

    reorderTask(id: string, dto: ReorderTaskDto): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/${id}/reorder`, dto);
    }
}
