import { Injectable, signal } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { toast } from "ngx-sonner";

export type ErrorType = "http" | "socket" | "unknown";

export type AppError = {
    type: ErrorType;
    message: string;
    status?: number;
    timestamp: Date;
};

@Injectable({ providedIn: "root" })
export class ErrorService {
    readonly lastError = signal<AppError | null>(null);
    readonly errors = signal<AppError[]>([]);

    handleHttpError(error: HttpErrorResponse): void {
        const appError = this.createError("http", this.getHttpErrorMessage(error), error.status);
        this.addError(appError);
        toast.error("Erreur réseau", { description: appError.message });
    }

    handleSocketError(error: Error | string): void {
        const message = typeof error === "string" ? error : error.message;
        const appError = this.createError("socket", message);
        this.addError(appError);
        toast.error("Erreur de connexion", { description: message });
    }

    clearErrors(): void {
        this.errors.set([]);
        this.lastError.set(null);
    }

    private createError(type: ErrorType, message: string, status?: number): AppError {
        return { type, message, status, timestamp: new Date() };
    }

    private addError(error: AppError): void {
        this.lastError.set(error);
        this.errors.update((errors) => [...errors.slice(-9), error]);
    }

    private getHttpErrorMessage(error: HttpErrorResponse): string {
        if (error.status === 0) {
            return "Impossible de contacter le serveur";
        }

        const messages: Record<number, string> = {
            400: "Requête invalide",
            401: "Non autorisé",
            403: "Accès refusé",
            404: "Ressource introuvable",
            408: "Délai d'attente dépassé",
            429: "Trop de requêtes",
            500: "Erreur serveur",
            502: "Passerelle incorrecte",
            503: "Service indisponible",
            504: "Délai de passerelle dépassé",
        };

        return messages[error.status] ?? `Erreur ${error.status}`;
    }
}