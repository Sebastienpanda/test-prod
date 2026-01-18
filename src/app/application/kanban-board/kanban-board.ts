import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Aside } from "@shared/ui/aside/aside";
import { Header } from "@shared/ui/header/header";
import { Workspace } from "@application/workspaces/workspace";
import { USER_GATEWAY } from "@application/tokens";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { SocketService } from "@shared/services/socket.service";
import { ColumnCreate } from "@shared/ui/modal/column-create/column-create";
import { WorkspaceCreate } from "@shared/ui/modal/workspace-create/workspace-create";
import { StatusManage } from "@shared/ui/modal/status-manage/status-manage";
import type { UserData } from "@domain/models/user-data.model";
import {
    applyColumnCreated,
    applyColumnReordered,
    applyTaskCreated,
    applyTaskReordered,
    applyTaskStatusChanged,
    applyTaskUpdated,
} from "./workspace-transformers";

@Component({
    selector: "app-kanban-board",
    imports: [Aside, Header, Workspace, ColumnCreate, WorkspaceCreate, StatusManage],
    templateUrl: "./kanban-board.html",
    styleUrl: "./kanban-board.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard implements OnInit, OnDestroy {
    readonly asideOpen = signal(false);
    protected readonly showColumnCreate = signal(false);
    protected readonly showWorkspaceCreate = signal(false);
    protected readonly showStatusManage = signal(false);
    private readonly userGateway = inject(USER_GATEWAY);
    private readonly workspaceState = inject(WorkspaceStateService);
    private readonly socketService = inject(SocketService);
    protected readonly workspace = computed(() => {
        const workspaces = this.workspaces();
        const selectedId = this.workspaceState.selectedWorkspaceId();

        if (!selectedId) return null;

        let workspace = workspaces.find((w) => w.id === selectedId) ?? null;
        if (!workspace) return null;

        // Appliquer toutes les transformations socket
        const newTask = this.socketService.taskCreated();
        const updatedTask = this.socketService.taskUpdated();
        const reorderedTask = this.socketService.taskReordered();
        const statusChangedTask = this.socketService.taskStatusChanged();
        const newColumn = this.socketService.columnCreated();
        const reorderedColumn = this.socketService.columnReordered();

        if (newTask) workspace = applyTaskCreated(workspace, newTask);
        if (updatedTask) workspace = applyTaskUpdated(workspace, updatedTask);
        if (reorderedTask) workspace = applyTaskReordered(workspace, reorderedTask);
        if (statusChangedTask) workspace = applyTaskStatusChanged(workspace, statusChangedTask);
        if (newColumn) workspace = applyColumnCreated(workspace, newColumn);
        if (reorderedColumn) workspace = applyColumnReordered(workspace, reorderedColumn);

        return workspace;
    });
    protected readonly workspaceName = computed(() => this.workspace()?.name);
    private readonly baseUserData = signal<UserData | undefined>(undefined);
    protected readonly workspaces = computed(() => {
        const base = this.baseUserData()?.workspaces ?? [];
        const newWorkspace = this.socketService.workspaceCreated();

        if (!newWorkspace) return base;

        const exists = base.some((w) => w.id === newWorkspace.id);
        if (exists) return base;

        return [...base, newWorkspace];
    });

    constructor() {
        effect(() => {
            const workspaces = this.workspaces();
            const selectedId = this.workspaceState.selectedWorkspaceId();

            if (!selectedId && workspaces && workspaces.length > 0) {
                this.workspaceState.selectWorkspace(workspaces[0].id);
            }
        });
    }

    ngOnInit(): void {
        void this.socketService.connect();
        this.userGateway.getUserData().subscribe((data) => {
            this.baseUserData.set(data);
        });
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    toggleAside(): void {
        this.asideOpen.update((v) => !v);
    }

    openColumnCreate(): void {
        this.showColumnCreate.set(true);
    }

    closeColumnCreate(): void {
        this.showColumnCreate.set(false);
    }

    openWorkspaceCreate(): void {
        this.showWorkspaceCreate.set(true);
    }

    closeWorkspaceCreate(): void {
        this.showWorkspaceCreate.set(false);
    }

    openStatusManage(): void {
        this.showStatusManage.set(true);
    }

    closeStatusManage(): void {
        this.showStatusManage.set(false);
    }
}
