// import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from "@angular/core";
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
// import { LucideAngularModule, ChevronDown, Check } from "lucide-angular";
// import { Status } from "@domain/models/status.model";
//
// @Component({
//     selector: "app-status-select",
//     templateUrl: "./status-select.html",
//     styleUrl: "./status-select.css",
//     imports: [LucideAngularModule],
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     providers: [
//         {
//             provide: NG_VALUE_ACCESSOR,
//             useExisting: forwardRef(() => StatusSelect),
//             multi: true,
//         },
//     ],
// })
// export class StatusSelect implements ControlValueAccessor {
//     readonly options = input.required<Status[]>();
//
//     protected readonly ChevronDownIcon = ChevronDown;
//     protected readonly CheckIcon = Check;
//
//     protected readonly value = signal<string>("");
//     protected readonly isOpen = signal(false);
//
//     protected readonly selectedStatus = computed(() => {
//         const currentValue = this.value();
//         return this.options().find((s) => s.id === currentValue);
//     });
//
//     private onChange: (value: string) => void = () => {};
//     private onTouched: () => void = () => {};
//
//     writeValue(value: string): void {
//         this.value.set(value);
//     }
//
//     registerOnChange(fn: (value: string) => void): void {
//         this.onChange = fn;
//     }
//
//     registerOnTouched(fn: () => void): void {
//         this.onTouched = fn;
//     }
//
//     toggleDropdown(): void {
//         this.isOpen.update((v) => !v);
//     }
//
//     closeDropdown(): void {
//         this.isOpen.set(false);
//         this.onTouched();
//     }
//
//     selectStatus(status: Status): void {
//         this.value.set(status.id);
//         this.onChange(status.id);
//         this.closeDropdown();
//     }
// }
