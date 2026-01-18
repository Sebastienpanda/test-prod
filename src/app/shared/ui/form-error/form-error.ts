import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: "app-form-error",
  templateUrl: "./form-error.html",
  styleUrl: "./form-error.css"
})
export class FormError {
  control = input.required<AbstractControl>();

  getErrorMessages(): string[] {
    const control = this.control();

    if (!control?.errors) return [];

    const errors = control.errors;
    const messages: string[] = [];

    if (errors['zod']) {
      messages.push(...errors['zod']);
    }

    if (errors['required']) {
      messages.push('Ce champ est obligatoire');
    }

    if (errors['minlength']) {
      const { requiredLength } = errors['minlength'];
      messages.push(`Ce champ doit contenir au moins ${requiredLength} caractères`);
    }

    return messages;
  }
}
