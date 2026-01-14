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
        const newTask = this.socketService.taskCreated();
        const updatedTask = this.socketService.taskUpdated();
        const reorderedTask = this.socketService.taskReordered();
        const statusChangedTask = this.socketService.taskStatusChanged();
        const reorderedColumn = this.socketService.columnReordered();

        if (!base) return null;

        let result = base;

        if (newTask) {
            const column = result.columns.find((c) => c.id === newTask.columnId);
            if (column) {
                const taskExists = column.tasks.some((t) => t.id === newTask.id);
                if (!taskExists) {
                    result = {
                        ...result,
                        columns: result.columns.map((c) =>
                            c.id === newTask.columnId ? { ...c, tasks: [...c.tasks, newTask] } : c,
                        ),
                    };
                }
            }
        }

        if (updatedTask) {
            result = {
                ...result,
                columns: result.columns.map((c) => ({
                    ...c,
                    tasks: c.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
                })),
            };
        }

        if (reorderedTask) {
            const columnsWithoutTask = result.columns.map((c) => ({
                ...c,
                tasks: c.tasks.filter((t) => t.id !== reorderedTask.id),
            }));

            result = {
                ...result,
                columns: columnsWithoutTask.map((c) => {
                    if (c.id !== reorderedTask.columnId) return c;

                    const tasks = [...c.tasks];
                    tasks.splice(reorderedTask.order, 0, reorderedTask);
                    return { ...c, tasks };
                }),
            };
        }

        if (statusChangedTask) {
            // Retirer la tâche de toutes les colonnes
            const columnsWithoutTask = result.columns.map((c) => ({
                ...c,
                tasks: c.tasks.filter((t) => t.id !== statusChangedTask.id),
            }));

            // Ajouter la tâche dans sa nouvelle colonne
            result = {
                ...result,
                columns: columnsWithoutTask.map((c) =>
                    c.id === statusChangedTask.columnId
                        ? { ...c, tasks: [...c.tasks, statusChangedTask] }
                        : c,
                ),
            };
        }

        if (reorderedColumn) {
            const existingColumn = result.columns.find((c) => c.id === reorderedColumn.id);
            const columnWithTasks = { ...reorderedColumn, tasks: existingColumn?.tasks ?? reorderedColumn.tasks };
            const columnsWithoutTarget = result.columns.filter((c) => c.id !== reorderedColumn.id);
            const columns = [...columnsWithoutTarget];
            columns.splice(reorderedColumn.position, 0, columnWithTasks);
            result = { ...result, columns };
        }

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
