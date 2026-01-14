import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule } from "lucide-angular";
import { Workspaces } from "@domain/models/kanban-workspaces.model";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { RouterLink } from "@angular/router";
import { InitialLettersPipe } from "@application/initial-letters-pipe";

@Component({
    selector: "app-aside",
    imports: [LucideAngularModule, RouterLink, InitialLettersPipe],
    templateUrl: "./aside.html",
    styleUrl: "./aside.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "aside-grid",
    },
})
export class Aside {
    readonly isAsideOpen = input.required<boolean>();
    readonly workspaces = input.required<Workspaces[]>();
    readonly toggleAside = output();

    protected readonly ArrowLeft = ArrowLeft;
    protected readonly ArrowRight = ArrowRight;

    private readonly workspaceState = inject(WorkspaceStateService);
    protected readonly selectedWorkspaceId = this.workspaceState.selectedWorkspaceId;

    onSelectWorkspace(workspaceId: string): void {
        this.workspaceState.selectWorkspace(workspaceId);
    }

    onToggleAside(): void {
        this.toggleAside.emit();
    }
}
