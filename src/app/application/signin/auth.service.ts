// auth.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { client } from '@shared/services/auth';

type User = {
    id: string;
    email: string;
}

type TokenInfo = {
    token: string;
    issuedAt: Date;
    expiresAt: Date;
    timeLeft: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // ✅ Signals pour le monitoring du token
    public readonly currentToken = signal<TokenInfo | null>(null);
    public readonly previousToken = signal<TokenInfo | null>(null);
    public readonly tokenRefreshed = signal<boolean>(false);
    private readonly userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor() {
        this.checkSession();
        this.startTokenMonitoring();
    }

    async sendOtp(email: string, type: 'sign-in') {
        const {error} = await client.emailOtp.sendVerificationOtp({
            email,
            type
        });

        if (error) {
            throw new Error(error.message);
        }
    }

    async verifyOtp(email: string, otp: string) {
        const {data, error} = await client.signIn.emailOtp({
            email,
            otp,
        });

        if (error) {
            throw new Error(error.message);
        }

        if (data?.user) {
            this.userSubject.next(data.user);
        }

        // Charger le token après connexion
        await this.updateTokenInfo();

        return data;
    }

    async signOut() {
        await client.signOut();
        this.userSubject.next(null);
        this.currentToken.set(null);
        this.previousToken.set(null);
    }

    async getToken(): Promise<string | null> {
        const {data} = await client.getSession();
        return data?.session?.token || null;
    }

    private async checkSession() {
        const {data} = await client.getSession();
        if (data?.user) {
            this.userSubject.next(data.user);
            await this.updateTokenInfo();
        }
    }

    // ✅ Monitoring du token toutes les secondes
    private startTokenMonitoring() {
        interval(1000).subscribe(async () => {
            await this.updateTokenInfo();
        });
    }

    private async updateTokenInfo() {
        try {
            const token = await this.getToken();

            if (!token) {
                this.currentToken.set(null);
                return;
            }

            const payload = this.decodeToken(token);
            const issuedAt = new Date(payload.iat * 1000);
            const expiresAt = new Date(payload.exp * 1000);
            const timeLeft = Math.max(0, Math.floor((payload.exp * 1000 - Date.now()) / 1000));

            const newTokenInfo: TokenInfo = {
                token,
                issuedAt,
                expiresAt,
                timeLeft
            };

            const current = this.currentToken();

            // ✅ Détecter si le token a changé
            if (current && current.token !== token) {
                console.log('🔄 Token refreshed automatically!');
                console.log('Previous token expires:', current.expiresAt);
                console.log('New token expires:', expiresAt);

                this.previousToken.set(current);
                this.tokenRefreshed.set(true);

                // Reset l'indicateur après 2 secondes
                setTimeout(() => {
                    this.tokenRefreshed.set(false);
                }, 2000);
            }

            this.currentToken.set(newTokenInfo);
        } catch (error) {
            console.error('[Auth] Token update error:', error);
        }
    }

    private decodeToken(token: string): any {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return {};
        }
    }
}
