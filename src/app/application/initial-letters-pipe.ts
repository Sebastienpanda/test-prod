import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "initialLetters",
})
export class InitialLettersPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) {
            return "";
        }

        const words = value.split(" ");

        if (words.length === 1) {
            return value.slice(0, 2).toUpperCase();
        }

        return words
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }
}
