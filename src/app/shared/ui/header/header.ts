import { Component, inject } from "@angular/core";
import { LucideAngularModule, Moon, Sun } from "lucide-angular";
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
    protected readonly themeService = inject(ThemeService);
    protected readonly Sun = Sun;
    protected readonly Moon = Moon;
}
