import { ChangeDetectionStrategy, Component, effect, inject, signal } from "@angular/core";
import { Aside } from "@shared/ui/aside/aside";
import { Header } from "@shared/ui/header/header";
import { Workspace } from "@application/workspaces/workspace";
import { WorkspacesUseCase } from "@domain/use-cases/workspaces.use-case";
import { ALL_WORKSPACES_GATEWAY, FIND_ONE_WORKSPACE_GATEWAY } from "@application/tokens";
import { AsyncPipe } from "@angular/common";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { of, switchMap } from "rxjs";

@Component({
    selector: "app-kanban-board",
    imports: [Aside, Header, Workspace, AsyncPipe],
    templateUrl: "./kanban-board.html",
    styleUrl: "./kanban-board.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard {
    readonly asideOpen = signal(false);
    protected readonly workspaces$ = new WorkspacesUseCase(inject(ALL_WORKSPACES_GATEWAY)).findAll();
    private readonly findOneUseCase = new WorkspacesUseCase(inject(FIND_ONE_WORKSPACE_GATEWAY));
    private readonly workspaceState = inject(WorkspaceStateService);
    private readonly workspacesSignal = toSignal(this.workspaces$);
    protected readonly workspace$ = toObservable(this.workspaceState.selectedWorkspaceId).pipe(
        switchMap((id) => (id ? this.findOneUseCase.findOne(id) : of(null))),
    );

    constructor() {
        effect(() => {
            const workspaces = this.workspacesSignal();
            const selectedId = this.workspaceState.selectedWorkspaceId();

            if (!selectedId && workspaces && workspaces.length > 0) {
                this.workspaceState.selectWorkspace(workspaces[0].id);
            }
        });
    }

    toggleAside() {
        this.asideOpen.update((v) => !v);
    }
}
