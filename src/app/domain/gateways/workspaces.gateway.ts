import type { Observable } from "rxjs";
import type { Workspace } from "@domain/models/workspace.model";

export type CreateWorkspaceDto = {
    name: string;
};

export type UpdateWorkspaceDto = {
    name: string;
};

export interface WorkspacesGateway {
    getWorkspace(id: string): Observable<Workspace>;
    createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace>;
    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<Workspace>;
}
