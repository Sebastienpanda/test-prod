import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Pencil, LucideAngularModule } from "lucide-angular";
import { Status } from "@domain/models/status.model";
import { USER_GATEWAY } from "@application/tokens";
import { StatusEdit } from "@shared/ui/modal/status-edit/status-edit";

@Component({
    selector: "app-status-list",
    templateUrl: "./status-list.html",
    styleUrl: "./status-list.css",
    imports: [LucideAngularModule, StatusEdit],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusList {
    readonly workspaceId = input.required<string>();

    protected readonly PencilIcon = Pencil;
    protected readonly statuses = signal<Status[]>([]);
    protected readonly selectedStatus = signal<Status | null>(null);

    private readonly userGateway = inject(USER_GATEWAY);
    private readonly destroyRef = inject(DestroyRef);

    constructor() {
        effect(() => {
            const wsId = this.workspaceId();
            if (wsId) {
                this.loadStatuses(wsId);
            }
        });
    }

    private loadStatuses(workspaceId: string): void {
        this.userGateway
            .getUserData()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((userData) => {
                const workspace = userData.workspaces.find((w) => w.id === workspaceId);
                const statuses = workspace?.statuses ?? [];
                this.statuses.set(statuses);
            });
    }

    openEdit(status: Status): void {
        this.selectedStatus.set(status);
    }

    closeEdit(): void {
        this.selectedStatus.set(null);
        const wsId = this.workspaceId();
        if (wsId) {
            this.loadStatuses(wsId);
        }
    }
}