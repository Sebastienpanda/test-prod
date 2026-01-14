import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-menu-item",
    template: `<ng-content />`,
    styles: `
        :host {
            align-items: center;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            transition: background-color 150ms ease-in-out;
            width: 100%;

            &:hover {
                background-color: var(--color-base-200);
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: "menuitem",
        tabindex: "0",
    },
})
export class MenuItem {}
