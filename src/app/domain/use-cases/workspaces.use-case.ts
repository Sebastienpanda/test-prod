import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { Workspace } from "@domain/models/workspace.model";
import type {
    CreateWorkspaceDto,
    UpdateWorkspaceDto,
    WorkspacesGateway,
} from "@domain/gateways/workspaces.gateway";
import { WORKSPACES_GATEWAY } from "@application/tokens";

@Injectable({
    providedIn: "root",
})
export class WorkspacesUseCase {
    private readonly gateway = inject(WORKSPACES_GATEWAY);

    getWorkspace(id: string): Observable<Workspace> {
        return this.gateway.getWorkspace(id);
    }

    createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace> {
        return this.gateway.createWorkspace(dto).pipe(
            tap((workspace) => console.log("[WorkspacesUseCase] Workspace created:", workspace)),
        );
    }

    updateWorkspace(id: string, dto: UpdateWorkspaceDto): Observable<Workspace> {
        return this.gateway.updateWorkspace(id, dto).pipe(
            tap((workspace) => console.log("[WorkspacesUseCase] Workspace updated:", workspace)),
        );
    }
}