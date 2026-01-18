import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { LucideAngularModule, X } from "lucide-angular";
import { StatusList } from "@shared/ui/status-list/status-list";

@Component({
    selector: "app-status-manage",
    templateUrl: "./status-manage.html",
    styleUrl: "./status-manage.css",
    imports: [LucideAngularModule, StatusList],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusManage {
    readonly workspaceId = input<string | null>(null);
    readonly closed = output<void>();

    protected readonly XIcon = X;

    close(): void {
        this.closed.emit();
    }
}