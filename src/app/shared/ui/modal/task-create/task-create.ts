import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    effect,
    inject,
    input,
    output,
    viewChild,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { map, startWith } from "rxjs";
import { LucideAngularModule, TextAlignStart } from "lucide-angular";
import { taskDescriptionSchema, taskTitleSchema } from "@domain/validators/task.schema";
import type { Status } from "@domain/models/status.model";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { zodFieldValidator } from "@shared/validators/zod.validator";
import { FormError } from "@shared/ui/form-error/form-error";
import { StatusSelect } from "@shared/ui/status-select/status-select";
import { Modal } from "../modal";
import { ModalService } from "../modal.service";

@Component({
    selector: "app-task-create",
    template: `
        <app-modal #modal (closed)="onModalClosed()">
            <h2 class="title">Nouvelle tâche</h2>

            <form [formGroup]="form" class="form">
                <div class="field">
                    <label class="field-label" for="title">Titre</label>
                    <input
                        formControlName="title"
                        class="field-input"
                        id="title"
                        placeholder="Titre de la tâche"
                        type="text"
                    />
                    <app-form-error [control]="form.controls.title" />
                </div>

                <div class="field">
                    <label class="field-label" for="description">
                        <lucide-icon [img]="DescriptionIcon" size="16" />
                        Description
                    </label>
                    <textarea
                        formControlName="description"
                        class="field-textarea"
                        id="description"
                        placeholder="Ajouter une description..."
                        rows="4"
                    ></textarea>
                    <app-form-error [control]="form.controls.description" />
                </div>

                <div class="field">
                    <label class="field-label" for="statusId">Statut</label>
                    <app-status-select
                        formControlName="statusId"
                        [options]="statusOptions()"
                    ></app-status-select>
                </div>
            </form>

            <footer class="footer">
                <button (click)="close()" appBtn type="button">Annuler</button>
                <button (click)="onCreate()" [disabled]="isInvalid()" appBtn type="button" variant="primary">
                    Créer
                </button>
            </footer>
        </app-modal>
    `,
    styleUrl: "./task-create.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Modal, ReactiveFormsModule, LucideAngularModule, ButtonDirective, FormError, StatusSelect],
})
export class TaskCreate {
    readonly columnId = input.required<string>();
    readonly statusOptions = input.required<Status[]>();
    readonly initialStatusId = input.required<string>();
    readonly closed = output<void>();
    protected readonly DescriptionIcon = TextAlignStart;
    private readonly modalService = inject(ModalService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly fb = inject(FormBuilder);
    protected readonly form = this.fb.nonNullable.group({
        title: ["", [zodFieldValidator(taskTitleSchema)]],
        description: ["", [zodFieldValidator(taskDescriptionSchema)]],
        statusId: [""],
    });
    protected readonly isInvalid = toSignal(
        this.form.statusChanges.pipe(
            startWith(this.form.status),
            map(() => this.form.invalid),
        ),
        { initialValue: true },
    );
    private readonly modal = viewChild.required<Modal>("modal");

    constructor() {
        effect(() => {
            this.open();
        });
    }

    open(): void {
        this.form.reset({ title: "", description: "", statusId: this.initialStatusId() });
        this.form.updateValueAndValidity();
        this.modal().open();
    }

    close(): void {
        this.modal().close();
    }

    protected onCreate(): void {
        this.form.markAllAsTouched();

        if (this.form.valid) {
            const formValue = this.form.getRawValue();
            this.modalService
                .createTask({
                    title: formValue.title.trim(),
                    description: formValue.description.trim(),
                    statusId: formValue.statusId,
                    columnId: this.columnId(),
                })
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => this.close());
        }
    }

    protected onModalClosed(): void {
        this.closed.emit();
    }
}