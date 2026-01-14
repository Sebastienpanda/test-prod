import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class WorkspaceStateService {
    readonly selectedWorkspaceId = signal<string | null>(null);

    selectWorkspace(id: string) {
        this.selectedWorkspaceId.set(id);
    }
}
