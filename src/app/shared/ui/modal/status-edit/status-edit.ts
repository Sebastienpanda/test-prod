// import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, output, signal } from "@angular/core";
// import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
// import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// import { Check, LucideAngularModule, X } from "lucide-angular";
// import { Status } from "@domain/models/status.model";
// import { USER_GATEWAY } from "@application/tokens";
// import { FormError } from "@shared/ui/form-error/form-error";
// import { getColorByHex, STATUS_COLORS, StatusColor } from "@shared/constants/status-colors";
// import { ThemeService } from "@shared/theme.service";
//
// @Component({
//     selector: "app-status-edit",
//     templateUrl: "./status-edit.html",
//     styleUrl: "./status-edit.css",
//     imports: [ReactiveFormsModule, LucideAngularModule, FormError],
//     changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class StatusEdit {
//     readonly status = input<Status | null>(null);
//     readonly closed = output<void>();
//
//     protected readonly XIcon = X;
//     protected readonly CheckIcon = Check;
//     protected readonly colors = STATUS_COLORS;
//     protected readonly themeService = inject(ThemeService);
//     protected readonly selectedColorKey = signal<string>('blue');
//     protected readonly isSubmitting = signal(false);
//
//     protected readonly form = new FormGroup({
//         name: new FormControl<string>('', {
//             nonNullable: true,
//             validators: [Validators.required, Validators.minLength(2)],
//         }),
//         color: new FormControl<string>('', {
//             nonNullable: true,
//             validators: [Validators.required],
//         }),
//     });
//
//     private readonly userGateway = inject(USER_GATEWAY);
//     private readonly destroyRef = inject(DestroyRef);
//
//     constructor() {
//         effect(() => {
//             const currentStatus = this.status();
//             if (currentStatus) {
//                 this.form.patchValue({
//                     name: currentStatus.name,
//                     color: currentStatus.color,
//                 });
//
//                 const colorMatch = getColorByHex(currentStatus.color);
//                 if (colorMatch) {
//                     this.selectedColorKey.set(colorMatch.key);
//                 }
//             }
//         });
//     }
//
//     selectColor(color: StatusColor): void {
//         this.selectedColorKey.set(color.key);
//         const colorValue = this.themeService.isDark() ? color.dark : color.light;
//         this.form.patchValue({color: colorValue});
//     }
//
//     onSubmit(): void {
//         if (this.form.invalid) return;
//
//         const currentStatus = this.status();
//         if (!currentStatus) return;
//
//         this.isSubmitting.set(true);
//
//         const formValue = this.form.getRawValue();
//
//         this.userGateway
//             .updateStatus(currentStatus.id, {
//                 name: formValue.name,
//                 color: formValue.color,
//             })
//             .pipe(takeUntilDestroyed(this.destroyRef))
//             .subscribe({
//                 next: () => {
//                     this.isSubmitting.set(false);
//                     this.close();
//                 },
//                 error: () => {
//                     this.isSubmitting.set(false);
//                 },
//             });
//     }
//
//     close(): void {
//         this.form.reset();
//         this.selectedColorKey.set('blue');
//         this.closed.emit();
//     }
// }
