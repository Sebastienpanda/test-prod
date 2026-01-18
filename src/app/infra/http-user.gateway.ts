import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type {
    CreateColumnDto,
    CreateStatusDto,
    CreateTaskDto,
    CreateWorkspaceDto,
    ReorderColumnDto,
    ReorderTaskDto,
    UpdateStatusDto,
    UserGateway,
} from "@domain/gateways/user.gateway";
import type { UserData } from "@domain/models/user-data.model";
import type { Workspace } from "@domain/models/workspace.model";
import type { Column } from "@domain/models/column.model";
import type { Task } from "@domain/models/task.model";
import type { Status } from "@domain/models/status.model";
import { environment } from "@environments/environment";

export class HttpUserGateway implements UserGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiUrl;

    getUserData(): Observable<UserData> {
        return this.http.get<UserData>(`${this.baseUrl}/user/me`);
    }

    createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace> {
        return this.http.post<Workspace>(`${this.baseUrl}/workspaces`, dto);
    }

    createColumn(dto: CreateColumnDto): Observable<Column> {
        return this.http.post<Column>(`${this.baseUrl}/board-columns`, dto);
    }

    reorderColumn(columnId: string, dto: ReorderColumnDto): Observable<Column> {
        return this.http.patch<Column>(`${this.baseUrl}/board-columns/${columnId}/reorder`, dto);
    }

    createTask(task: CreateTaskDto): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
    }

    updateTask(task: Task): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/tasks/${task.id}`, task);
    }

    reorderTask(taskId: string, dto: ReorderTaskDto): Observable<Task> {
        return this.http.patch<Task>(`${this.baseUrl}/tasks/${taskId}/reorder`, dto);
    }

    createStatus(dto: CreateStatusDto): Observable<Status> {
        return this.http.post<Status>(`${this.baseUrl}/statuses`, dto);
    }

    updateStatus(statusId: string, dto: UpdateStatusDto): Observable<Status> {
        return this.http.patch<Status>(`${this.baseUrl}/statuses/${statusId}`, dto);
    }

    deleteStatus(statusId: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/statuses/${statusId}`);
    }
}
