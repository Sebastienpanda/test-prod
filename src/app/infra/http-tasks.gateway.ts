import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { CreateTaskDto, TasksGateway } from "@domain/gateways/tasks.gateway";
import { environment } from "@environments/environment";

export class HttpTasksGateway implements TasksGateway {
    private readonly http = inject(HttpClient);

    create(task: CreateTaskDto): Observable<Tasks> {
        return this.http.post<Tasks>(`${environment.apiUrl}/tasks`, task);
    }

    update(task: Tasks): Observable<Tasks> {
        return this.http.patch<Tasks>(`${environment.apiUrl}/tasks/${task.id}`, task);
    }
}
