// import { DatePipe } from "@angular/common";
// import { ChangeDetectionStrategy, Component, computed, input, output } from "@angular/core";
// import type { Task } from "@domain/models/task.model";
// import type { Status } from "@domain/models/status.model";
// import { ButtonDirective } from "@shared/ui/directives/button.directive";
// import { Calendar, Clock, LucideAngularModule, Pencil, TextAlignStart } from "lucide-angular";
// import { getContrastTextColor } from "@shared/utils/color-contrast";
//
// @Component({
//     selector: "app-task-view",
//     templateUrl: "./task-view.html",
//     styleUrl: "./task-view.css",
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     imports: [DatePipe, LucideAngularModule, ButtonDirective],
// })
// export class TaskView {
//     readonly task = input.required<Task>();
//     readonly statusOptions = input.required<Status[]>();
//     readonly edit = output<void>();
//
//     protected readonly EditIcon = Pencil;
//     protected readonly CalendarIcon = Calendar;
//     protected readonly ClockIcon = Clock;
//     protected readonly DescriptionIcon = TextAlignStart;
//
//     protected readonly currentStatus = computed(() => {
//         const statusId = this.task().statusId;
//         return this.statusOptions().find((s) => s.id === statusId);
//     });
//
//     protected readonly statusLabel = computed(() => {
//         return this.currentStatus()?.name ?? "Sans statut";
//     });
//
//     protected readonly statusColor = computed(() => {
//         return this.currentStatus()?.color ?? "var(--color-base-200)";
//     });
//
//     protected readonly statusTextColor = computed(() => {
//         const bgColor = this.currentStatus()?.color;
//         return bgColor ? getContrastTextColor(bgColor) : "#000000";
//     });
//
//     protected onEdit(): void {
//         this.edit.emit();
//     }
// }
