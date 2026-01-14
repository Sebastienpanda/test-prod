import { ChangeDetectionStrategy, Component, ElementRef, output, viewChild } from "@angular/core";
import { LucideAngularModule } from "lucide-angular";

@Component({
    selector: "app-modal",
    template: `
        <dialog #dialog (close)="onClose()" class="modal">
            <div class="content">
                <ng-content />
            </div>
            <form class="backdrop" method="dialog">
                <button aria-label="Fermer la modale" type="submit">close</button>
            </form>
        </dialog>
    `,
    styleUrl: "./modal.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LucideAngularModule],
})
export class Modal {
    readonly closed = output<void>();

    private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>("dialog");

    open(): void {
        this.dialog().nativeElement.showModal();
    }

    close(): void {
        this.dialog().nativeElement.close();
    }

    protected onClose(): void {
        this.closed.emit();
    }
}
