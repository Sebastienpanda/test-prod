import type { Observable } from "rxjs";
import type { Status } from "@domain/models/status.model";

export type CreateStatusDto = {
    name: string;
    color: string;
    workspaceId: string;
};

export type UpdateStatusDto = {
    name?: string;
    color?: string;
};

export interface StatusesGateway {
    getStatus(id: string): Observable<Status>;
    createStatus(dto: CreateStatusDto): Observable<Status>;
    updateStatus(id: string, dto: UpdateStatusDto): Observable<Status>;
    deleteStatus(id: string): Observable<void>;
}
