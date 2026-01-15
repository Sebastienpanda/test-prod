import { Injectable } from "@angular/core";
import { toast } from "ngx-sonner";

const STATUS_LABELS: Record<string, string> = {
    todo: "À faire",
    in_progress: "En cours",
    done: "Terminé",
};

@Injectable({ providedIn: "root" })
export class NotificationService {
    success(message: string): void {
        toast.success(message);
    }

    error(message: string): void {
        toast.error(message);
    }

    info(message: string): void {
        toast.info(message);
    }

    taskCreated(title: string): void {
        toast.success("Tâche créée", { description: title });
    }

    taskUpdated(title: string): void {
        toast.success("Tâche modifiée", { description: title });
    }

    taskMoved(title: string): void {
        toast.info("Tâche déplacée", { description: title });
    }

    taskStatusChanged(title: string, newStatus: string): void {
        const label = STATUS_LABELS[newStatus] ?? newStatus;
        toast.info("Statut modifié", { description: `${title} → ${label}` });
    }

    columnMoved(name: string): void {
        toast.info("Colonne déplacée", { description: name });
    }
}
