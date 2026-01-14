import { computed, effect, Injectable, signal } from "@angular/core";

type ThemMode = "light" | "dark";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    readonly isDark = signal<boolean>(false);

    readonly theme = computed<ThemMode>(() => (this.isDark() ? "dark" : "light"));

    private mediaQuery?: MediaQueryList;

    constructor() {
        this.initTheme();
        this.listenToSystemTheme();
        this.syncThemeWithDOM();
    }

    toggle(): void {
        this.isDark.update((v) => !v);
    }

    private initTheme(): void {
        const saved = localStorage.getItem("theme");
        const systemDark = globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

        const initial = saved ? saved === "dark" : systemDark;
        this.isDark.set(initial);
    }

    private listenToSystemTheme(): void {
        this.mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

        const listener = (event: MediaQueryListEvent) => {
            if (!localStorage.getItem("theme")) {
                this.isDark.set(event.matches);
            }
        };

        this.mediaQuery.addEventListener("change", listener);

        effect((onCleanup) => {
            onCleanup(() => {
                this.mediaQuery?.removeEventListener("change", listener);
            });
        });
    }

    private syncThemeWithDOM() {
        effect(() => {
            const dark = this.isDark();
            const root = document.documentElement;

            root.classList.add("theme-transition");

            root.dataset["theme"] = dark ? "dark" : "light";
            root.classList.toggle("dark", dark);

            localStorage.setItem("theme", dark ? "dark" : "light");
        });
    }
}
