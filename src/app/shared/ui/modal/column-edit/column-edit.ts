// import {
//     ChangeDetectionStrategy,
//     Component,
//     DestroyRef,
//     effect,
//     inject,
//     input,
//     output,
//     viewChild,
// } from "@angular/core";
// import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
// import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
// import { map, startWith } from "rxjs";
// import * as z from "zod/mini";
// import { ColumnsUseCase } from "@domain/use-cases/columns.use-case";
// import { ButtonDirective } from "@shared/ui/directives/button.directive";
// import { zodFieldValidator } from "@shared/validators/zod.validator";
// import { FormError } from "@shared/ui/form-error/form-error";
// import { Modal } from "../modal";
//
// const columnNameSchema = z
//     .string()
//     .check(z.minLength(1, "Le nom est obligatoire"));
//
// @Component({
//     selector: "app-column-edit",
//     templateUrl: "./column-edit.html",
//     styleUrl: "./column-edit.css",
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     imports: [Modal, ReactiveFormsModule, ButtonDirective, FormError],
// })
// export class ColumnEdit {
//     readonly columnId = input.required<string>();
//     readonly columnName = input.required<string>();
//     readonly closed = output<void>();
//
//     private readonly columnsUseCase = inject(ColumnsUseCase);
//     private readonly destroyRef = inject(DestroyRef);
//     private readonly fb = inject(FormBuilder);
//
//     protected readonly form = this.fb.nonNullable.group({
//         name: ["", [zodFieldValidator(columnNameSchema)]],
//     });
//
//     protected readonly isInvalid = toSignal(
//         this.form.statusChanges.pipe(
//             startWith(this.form.status),
//             map(() => this.form.invalid),
//         ),
//         { initialValue: true },
//     );
//
//     private readonly modal = viewChild.required<Modal>("modal");
//
//     constructor() {
//         effect(() => {
//             this.open();
//         });
//     }
//
//     open(): void {
//         this.form.reset({ name: this.columnName() });
//         this.form.updateValueAndValidity();
//         this.modal().open();
//     }
//
//     close(): void {
//         this.modal().close();
//     }
//
//     protected onUpdate(): void {
//         this.form.markAllAsTouched();
//
//         if (this.form.valid) {
//             const formValue = this.form.getRawValue();
//             this.columnsUseCase
//                 .updateColumn(this.columnId(), { name: formValue.name.trim() })
//                 .pipe(takeUntilDestroyed(this.destroyRef))
//                 .subscribe(() => {
//                     this.close();
//                 });
//         }
//     }
//
//     protected onModalClosed(): void {
//         this.closed.emit();
//     }
// }
