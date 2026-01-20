import type { WorkspaceResponse } from "./workspace.model";
import type { CreateWorkspaceDto, UpdateWorkspaceDto } from "./workspace.zod";
import type { Observable } from "rxjs";

export interface WorkspacesGateway {
    getWorkspace(id: string): Observable<WorkspaceResponse>;
    createWorkspace(dto: CreateWorkspaceDto): Observable<WorkspaceResponse>;
    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<WorkspaceResponse>;
}
