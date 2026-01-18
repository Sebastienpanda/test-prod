// signin.component.ts
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@application/signin/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

type AuthForm = {
    email: FormControl<string>;
}

type OtpForm = {
    otp: FormControl<string>;
}

@Component({
    selector: "app-signin",
    templateUrl: "./signin.html",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
})
export default class Signin {
    protected readonly emailForm = new FormGroup<AuthForm>({
        email: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email]
        })
    });

    protected readonly otpForm = new FormGroup<OtpForm>({
        otp: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required, Validators.minLength(6)]
        })
    });

    protected readonly otpSent = signal<boolean>(false);
    protected readonly authService = inject(AuthService);
    // ✅ Computed pour formater le temps restant
    protected readonly timeLeftFormatted = computed(() => {
        const token = this.authService.currentToken();
        if (!token) return 'N/A';

        const minutes = Math.floor(token.timeLeft / 60);
        const seconds = token.timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });
    // ✅ Computed pour le statut du token
    protected readonly tokenStatus = computed(() => {
        const token = this.authService.currentToken();
        if (!token) return 'none';
        if (token.timeLeft < 60) return 'critical';
        if (token.timeLeft < 300) return 'warning';
        return 'ok';
    });
    private readonly router = inject(Router);

    // ✅ Effect pour logger les changements de token
    constructor() {
        effect(() => {
            const refreshed = this.authService.tokenRefreshed();
            if (refreshed) {
                console.log('✨ Token auto-refresh détecté dans le composant!');
            }
        });
    }

    async sendOtp() {
        if (this.emailForm.invalid) return;

        try {
            const email = this.emailForm.value.email!;
            await this.authService.sendOtp(email, 'sign-in');
            this.otpSent.set(true);
        } catch (err: any) {
            console.error(err);
        }
    }

    async verifyOtp() {
        if (this.otpForm.invalid) return;

        try {
            const email = this.emailForm.value.email!;
            const otp = this.otpForm.value.otp!;

            await this.authService.verifyOtp(email, otp);
            this.router.navigate(['/']);
        } catch (err: any) {
            console.error(err);
        }
    }

    resetForm() {
        this.otpSent.set(false);
        this.otpForm.reset();
    }

    // ✅ Raccourcir le token pour l'affichage
    protected formatToken(token: string | undefined): string {
        if (!token) return 'N/A';
        return token.substring(0, 20) + '...' + token.substring(token.length - 20);
    }
}
