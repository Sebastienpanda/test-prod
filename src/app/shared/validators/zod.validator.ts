import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import type * as z from "zod/mini";

export function zodValidator<T extends z.ZodMiniType>(schema: T, field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = schema.safeParse({ [field]: control.value });

        if (result.success) {
            return null;
        }

        const fieldErrors = result.error.issues
            .filter((issue) => issue.path[0] === field)
            .map((issue) => issue.message);

        if (fieldErrors.length === 0) {
            return null;
        }

        return { zod: fieldErrors };
    };
}

export function zodFieldValidator(schema: z.ZodMiniType): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = schema.safeParse(control.value);

        if (result.success) {
            return null;
        }

        const messages = result.error.issues.map((issue) => issue.message);
        return { zod: messages };
    };
}