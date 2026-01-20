// import { ChangeDetectionStrategy, Component, inject, input, OnInit, output } from "@angular/core";
// import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
// import type { Task } from "@domain/models/task.model";
// import type { Status } from "@domain/models/status.model";
// import { ButtonDirective } from "@shared/ui/directives/button.directive";
// import { LucideAngularModule, TextAlignStart } from "lucide-angular";
// import { StatusSelect } from "@shared/ui/status-select/status-select";
//
// @Component({
//     selector: "app-task-edit",
//     templateUrl: "./task-edit.html",
//     styleUrl: "./task-edit.css",
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     imports: [ReactiveFormsModule, LucideAngularModule, ButtonDirective, StatusSelect],
// })
// export class TaskEdit implements OnInit {
//     readonly task = input.required<Task>();
//     readonly statusOptions = input.required<Status[]>();
//     readonly saveTask = output<Task>();
//     readonly cancelEdit = output<void>();
//
//     protected readonly DescriptionIcon = TextAlignStart;
//
//     private readonly fb = inject(FormBuilder);
//     protected readonly form = this.fb.nonNullable.group({
//         title: [""],
//         description: [""],
//         statusId: [""],
//     });
//
//     ngOnInit(): void {
//         const task = this.task();
//         this.form.patchValue({
//             title: task.title,
//             description: task.description,
//             statusId: task.statusId,
//         });
//     }
//
//     protected onSave(): void {
//         if (this.form.valid) {
//             this.saveTask.emit({
//                 ...this.task(),
//                 ...this.form.getRawValue(),
//                 updatedAt: new Date().toISOString(),
//             });
//         }
//     }
//
//     protected onCancel(): void {
//         this.cancelEdit.emit();
//     }
// }
