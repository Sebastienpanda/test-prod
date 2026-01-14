import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, signal } from "@angular/core";

@Component({
    selector: "app-context-menu",
    templateUrl: "./context-menu.html",
    styleUrl: "./context-menu.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: "context-menu",
    },
})
export class ContextMenu {
    protected readonly isOpen = signal(false);
    private readonly elementRef = inject(ElementRef);

    @HostListener("document:click", ["$event"])
    onClickOutside(event: MouseEvent): void {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen.set(false);
        }
    }

    toggle(): void {
        this.isOpen.update((v) => !v);
    }

    close(): void {
        this.isOpen.set(false);
    }
}
