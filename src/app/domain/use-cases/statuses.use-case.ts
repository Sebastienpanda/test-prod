import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { Status } from "@domain/models/status.model";
import type {
    CreateStatusDto,
    StatusesGateway,
    UpdateStatusDto,
} from "@domain/gateways/statuses.gateway";
import { STATUSES_GATEWAY } from "@application/tokens";

@Injectable({
    providedIn: "root",
})
export class StatusesUseCase {
    private readonly gateway = inject(STATUSES_GATEWAY);

    getStatus(id: string): Observable<Status> {
        return this.gateway.getStatus(id);
    }

    createStatus(dto: CreateStatusDto): Observable<Status> {
        return this.gateway.createStatus(dto).pipe(
            tap((status) => console.log("[StatusesUseCase] Status created:", status)),
        );
    }

    updateStatus(id: string, dto: UpdateStatusDto): Observable<Status> {
        return this.gateway.updateStatus(id, dto).pipe(
            tap((status) => console.log("[StatusesUseCase] Status updated:", status)),
        );
    }

    deleteStatus(id: string): Observable<void> {
        return this.gateway.deleteStatus(id).pipe(
            tap(() => console.log("[StatusesUseCase] Status deleted:", id)),
        );
    }
}