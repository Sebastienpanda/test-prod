import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class WorkspaceStateService {
    readonly selectedWorkspaceId = signal<string | null>(null);
    // private readonly socketService = inject(SocketService);

    selectWorkspace(id: string) {
        this.selectedWorkspaceId.set(id);
        // this.socketService.resetWorkspaceEvents();
    }
}
