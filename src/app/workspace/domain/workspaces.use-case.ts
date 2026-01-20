import type { WorkspacesGateway } from "./workspaces.gateway";
import type { Observable } from "rxjs";
import type { WorkspaceResponse } from "./workspace.model";
import type { CreateWorkspaceDto, UpdateWorkspaceDto } from "./workspace.zod";

export class WorkspacesUseCase {
    constructor(private readonly _gateway: WorkspacesGateway) {}

    getWorkspace(id: string): Observable<WorkspaceResponse> {
        return this._gateway.getWorkspace(id);
    }

    createWorkspace(dto: CreateWorkspaceDto): Observable<WorkspaceResponse> {
        return this._gateway.createWorkspace(dto);
    }

    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<WorkspaceResponse> {
        return this._gateway.updateWorkspace(id, dto);
    }
}
