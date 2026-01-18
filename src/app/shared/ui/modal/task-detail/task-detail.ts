import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    output,
    signal,
    viewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import type { Task } from "@domain/models/task.model";
import type { Status } from "@domain/models/status.model";
import { Modal } from "../modal";
import { TaskView } from "../task-view/task-view";
import { TaskEdit } from "../task-edit/task-edit";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-task-detail",
    template: `
        <app-modal #modal (closed)="onModalClosed()">
            @if (task(); as currentTask) {
                @if (isEditMode()) {
                    <app-task-edit [task]="currentTask" [statusOptions]="statusOptions()" (saveTask)="onSave($event)" (cancelEdit)="onCancelEdit()" />
                } @else {
                    <app-task-view [task]="currentTask" [statusOptions]="statusOptions()" (edit)="onEdit()" />
                    <footer class="footer">
                        <button (click)="close()" appBtn type="button" variant="primary">Fermer</button>
                    </footer>
                }
            }
        </app-modal>
    `,
    styles: `
        .footer {
            border-top: 1px solid var(--color-base-200);
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            padding-top: 1rem;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Modal, TaskView, TaskEdit, ButtonDirective],
})
export class TaskDetail {
    readonly task = input.required<Task>();
    readonly statusOptions = input.required<Status[]>();
    readonly closed = output<void>();
    protected readonly isEditMode = signal(false);
    private readonly modalService = inject(ModalService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly modal = viewChild.required<Modal>("modal");

    constructor() {
        effect(() => {
            this.open();
        });
    }

    open(): void {
        this.modal().open();
    }

    close(): void {
        this.modal().close();
    }

    protected onEdit(): void {
        this.isEditMode.set(true);
    }

    protected onSave(task: Task): void {
        this.modalService
            .updateTask(task)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.isEditMode.set(false));
    }

    protected onCancelEdit(): void {
        this.isEditMode.set(false);
    }

    protected onModalClosed(): void {
        this.isEditMode.set(false);
        this.closed.emit();
    }
}
