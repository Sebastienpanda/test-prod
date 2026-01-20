import type { WorkspacesGateway } from "../domain/workspaces.gateway";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import type { CreateWorkspaceDto, UpdateWorkspaceDto } from "../domain/workspace.zod";
import type { Observable } from "rxjs";
import type { Workspace } from "../domain/workspace.model";

export class HttpWorkspaceGateway implements WorkspacesGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiUrl;

    createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace> {
        return this.http.post<Workspace>(`${this.baseUrl}/workspaces`, dto);
    }

    getWorkspace(id: string): Observable<Workspace> {
        return this.http.get<Workspace>(`${this.baseUrl}/workspaces/${id}`);
    }

    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<Workspace> {
        return this.http.patch<Workspace>(`${this.baseUrl}/workspaces/${id}`, dto);
    }
}
