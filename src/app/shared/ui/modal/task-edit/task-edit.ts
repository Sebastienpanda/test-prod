import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { STATUS_OPTIONS, type Status, type Tasks } from "@domain/models/kanban-tasks.model";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { LucideAngularModule, TextAlignStart } from "lucide-angular";

@Component({
    selector: "app-task-edit",
    templateUrl: "./task-edit.html",
    styleUrl: "./task-edit.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, LucideAngularModule, ButtonDirective],
})
export class TaskEdit implements OnInit {
    readonly task = input.required<Tasks>();
    readonly saveTask = output<Tasks>();
    readonly cancelEdit = output<void>();

    protected readonly DescriptionIcon = TextAlignStart;
    protected readonly statusOptions = STATUS_OPTIONS;

    private readonly fb = inject(FormBuilder);
    protected readonly form = this.fb.nonNullable.group({
        title: [""],
        description: [""],
        status: ["todo" as Status],
    });

    ngOnInit(): void {
        const task = this.task();
        this.form.patchValue({
            title: task.title,
            description: task.description,
            status: task.status,
        });
    }

    protected onSave(): void {
        if (this.form.valid) {
            this.saveTask.emit({
                ...this.task(),
                ...this.form.getRawValue(),
                updatedAt: new Date().toISOString(),
            });
        }
    }

    protected onCancel(): void {
        this.cancelEdit.emit();
    }
}
