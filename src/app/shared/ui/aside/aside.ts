import { ChangeDetectionStrategy, Component, inject, input, output } from "@angular/core";
import { ArrowLeft, ArrowRight, LucideAngularModule, Plus } from "lucide-angular";
import type { Workspace } from "../../../workspace/domain/workspace.model";
import { WorkspaceStateService } from "@shared/workspace-state-service";
import { RouterLink } from "@angular/router";
import { InitialLettersPipe } from "../../../workspace/application/initial-letters-pipe";

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
    readonly workspaces = input.required<Workspace[]>();
    readonly toggleAside = output();
    readonly createWorkspace = output<void>();

    protected readonly ArrowLeft = ArrowLeft;
    protected readonly ArrowRight = ArrowRight;
    protected readonly Plus = Plus;

    private readonly workspaceState = inject(WorkspaceStateService);
    protected readonly selectedWorkspaceId = this.workspaceState.selectedWorkspaceId;

    onSelectWorkspace(workspaceId: string): void {
        this.workspaceState.selectWorkspace(workspaceId);
    }

    onToggleAside(): void {
        this.toggleAside.emit();
    }

    onCreateWorkspace(): void {
        this.createWorkspace.emit();
    }
}
