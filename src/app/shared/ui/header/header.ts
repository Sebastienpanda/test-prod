import { Component, inject, input, output } from "@angular/core";
import { LucideAngularModule, Moon, Plus, Sun, Tags } from "lucide-angular";
import { ThemeService } from "../../theme.service";
import { ButtonDirective } from "@shared/ui/directives/button.directive";

@Component({
    selector: "app-header",
    imports: [LucideAngularModule, ButtonDirective],
    templateUrl: "./header.html",
    styleUrl: "./header.css",
    host: {
        class: "header-grid",
    },
})
export class Header {
    readonly workspaceName = input<string>();
    readonly createColumn = output<void>();
    readonly manageStatus = output<void>();

    protected readonly themeService = inject(ThemeService);
    protected readonly Sun = Sun;
    protected readonly Moon = Moon;
    protected readonly Plus = Plus;
    protected readonly TagsIcon = Tags;

    onCreateColumn(): void {
        this.createColumn.emit();
    }

    onManageStatus(): void {
        this.manageStatus.emit();
    }
}
