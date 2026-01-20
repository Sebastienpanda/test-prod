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
            font-size: 0.875rem;
            gap: 0.625rem;
            padding: 0.5rem 0.75rem;
            transition: background-color 150ms ease-in-out;
            width: 100%;
            color: var(--color-base-content);

            &:hover {
                background-color: var(--color-base-200);
            }

            &:active {
                background-color: var(--color-base-300);
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
