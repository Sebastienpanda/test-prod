import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type {
    CreateWorkspaceDto,
    UpdateWorkspaceDto,
    WorkspacesGateway,
} from "@domain/gateways/workspaces.gateway";
import type { Workspace } from "@domain/models/workspace.model";
import { environment } from "@environments/environment";

export class HttpWorkspacesGateway implements WorkspacesGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/workspaces`;

    getWorkspace(id: string): Observable<Workspace> {
        return this.http.get<Workspace>(`${this.baseUrl}/${id}`);
    }

    createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace> {
        return this.http.post<Workspace>(this.baseUrl, dto);
    }

    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<Workspace> {
        return this.http.patch<Workspace>(`${this.baseUrl}/${id}`, dto);
    }
}
