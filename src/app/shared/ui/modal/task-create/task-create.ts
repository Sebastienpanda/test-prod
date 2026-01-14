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
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LucideAngularModule, TextAlignStart } from "lucide-angular";
import { type Status, STATUS_OPTIONS } from "@domain/models/kanban-tasks.model";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
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
                </div>

                <div class="field">
                    <label class="field-label" for="status">Statut</label>
                    <select formControlName="status" class="field-select" id="status">
                        @for (option of statusOptions; track option.value) {
                            <option [value]="option.value">{{ option.label }}</option>
                        }
                    </select>
                </div>
            </form>

            <footer class="footer">
                <button (click)="close()" appBtn type="button">Annuler</button>
                <button (click)="onCreate()" [disabled]="form.invalid" appBtn type="button" variant="primary">
                    Créer
                </button>
            </footer>
        </app-modal>
    `,
    styleUrl: "./task-create.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [Modal, ReactiveFormsModule, LucideAngularModule, ButtonDirective],
})
export class TaskCreate {
    readonly columnId = input.required<string>();
    readonly closed = output<void>();
    protected readonly DescriptionIcon = TextAlignStart;
    protected readonly statusOptions = STATUS_OPTIONS;
    private readonly modalService = inject(ModalService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly fb = inject(FormBuilder);
    protected readonly form = this.fb.nonNullable.group({
        title: ["", Validators.required],
        description: [""],
        status: ["todo" as Status],
    });
    private readonly modal = viewChild.required<Modal>("modal");

    constructor() {
        effect(() => {
            this.open();
        });
    }

    open(): void {
        this.form.reset({ title: "", description: "", status: "todo" });
        this.modal().open();
    }

    close(): void {
        this.modal().close();
    }

    protected onCreate(): void {
        if (this.form.valid) {
            const formValue = this.form.getRawValue();
            this.modalService
                .createTask({
                    ...formValue,
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
