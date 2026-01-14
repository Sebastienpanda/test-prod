import { Directive, input } from "@angular/core";

type Variant = "primary" | "secondary" | "outline" | "circle";

@Directive({
    selector: "[appBtn]",
    host: {
        class: "btn",
        "[class]": "variant()",
    },
})
export class ButtonDirective {
    readonly variant = input<Variant>();
}
