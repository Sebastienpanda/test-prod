import { inject, Injectable, signal } from "@angular/core";
import { SocketService } from "./services/socket.service";

@Injectable({
    providedIn: "root",
})
export class WorkspaceStateService {
    readonly selectedWorkspaceId = signal<string | null>(null);
    private readonly socketService = inject(SocketService);

    selectWorkspace(id: string) {
        this.selectedWorkspaceId.set(id);
        this.socketService.resetWorkspaceEvents();
    }
}
