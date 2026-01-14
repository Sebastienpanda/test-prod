import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, output } from "@angular/core";
import { STATUS_OPTIONS, type Tasks } from "@domain/models/kanban-tasks.model";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { Calendar, Clock, LucideAngularModule, Pencil, TextAlignStart } from "lucide-angular";

@Component({
    selector: "app-task-view",
    templateUrl: "./task-view.html",
    styleUrl: "./task-view.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DatePipe, LucideAngularModule, ButtonDirective],
})
export class TaskView {
    readonly task = input.required<Tasks>();
    readonly edit = output<void>();

    protected readonly EditIcon = Pencil;
    protected readonly CalendarIcon = Calendar;
    protected readonly ClockIcon = Clock;
    protected readonly DescriptionIcon = TextAlignStart;

    protected readonly statusLabel = computed(() => {
        const status = this.task().status;
        return STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
    });

    protected onEdit(): void {
        this.edit.emit();
    }
}
