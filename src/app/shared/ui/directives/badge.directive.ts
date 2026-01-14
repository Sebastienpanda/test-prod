import { Directive, input } from "@angular/core";

type Variant = "primary" | "secondary" | "outline";

@Directive({
    selector: "[appBadge]",
    host: {
        class: "badge",
        "[class]": "variant()",
    },
})
export class BadgeDirective {
    readonly variant = input<Variant>();
}
