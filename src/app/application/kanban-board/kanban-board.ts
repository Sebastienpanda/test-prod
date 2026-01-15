import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Aside } from "@shared/ui/aside/aside";
import { Header } from "@shared/ui/header/header";
import { Workspace } from "@application/workspaces/workspace";
import { WorkspacesUseCase } from "@domain/use-cases/workspaces.use-case";
import { ALL_WORKSPACES_GATEWAY, FIND_ONE_WORKSPACE_GATEWAY } from "@application/tokens";
import { AsyncPipe } from "@angular/common";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { of, switchMap } from "rxjs";
import { SocketService } from "@shared/services/socket.service";
import {
    applyColumnReordered,
    applyTaskCreated,
    applyTaskReordered,
    applyTaskStatusChanged,
    applyTaskUpdated,
} from "./workspace-transformers";

@Component({
    selector: "app-kanban-board",
    imports: [Aside, Header, Workspace, AsyncPipe],
    templateUrl: "./kanban-board.html",
    styleUrl: "./kanban-board.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard implements OnInit, OnDestroy {
    readonly asideOpen = signal(false);
    protected readonly workspaces$ = new WorkspacesUseCase(inject(ALL_WORKSPACES_GATEWAY)).findAll();
    private readonly findOneUseCase = new WorkspacesUseCase(inject(FIND_ONE_WORKSPACE_GATEWAY));
    private readonly workspaceState = inject(WorkspaceStateService);
    private readonly socketService = inject(SocketService);
    private readonly workspacesSignal = toSignal(this.workspaces$);

    private readonly workspace$ = toObservable(this.workspaceState.selectedWorkspaceId).pipe(
        switchMap((id) => (id ? this.findOneUseCase.findOne(id) : of(null))),
    );

    private readonly baseWorkspace = toSignal(this.workspace$);

    protected readonly workspace = computed(() => {
        const base = this.baseWorkspace();
        if (!base) return null;

        const newTask = this.socketService.taskCreated();
        const updatedTask = this.socketService.taskUpdated();
        const reorderedTask = this.socketService.taskReordered();
        const statusChangedTask = this.socketService.taskStatusChanged();
        const reorderedColumn = this.socketService.columnReordered();

        let result = base;
        if (newTask) result = applyTaskCreated(result, newTask);
        if (updatedTask) result = applyTaskUpdated(result, updatedTask);
        if (reorderedTask) result = applyTaskReordered(result, reorderedTask);
        if (statusChangedTask) result = applyTaskStatusChanged(result, statusChangedTask);
        if (reorderedColumn) result = applyColumnReordered(result, reorderedColumn);

        return result;
    });

    constructor() {
        effect(() => {
            const workspaces = this.workspacesSignal();
            const selectedId = this.workspaceState.selectedWorkspaceId();

            if (!selectedId && workspaces && workspaces.length > 0) {
                this.workspaceState.selectWorkspace(workspaces[0].id);
            }
        });
    }

    ngOnInit(): void {
        this.socketService.connect();
    }

    ngOnDestroy(): void {
        this.socketService.disconnect();
    }

    toggleAside() {
        this.asideOpen.update((v) => !v);
    }
}
