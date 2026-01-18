import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type {
    CreateStatusDto,
    StatusesGateway,
    UpdateStatusDto,
} from "@domain/gateways/statuses.gateway";
import type { Status } from "@domain/models/status.model";
import { environment } from "@environments/environment";

export class HttpStatusesGateway implements StatusesGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/statuses`;

    getStatus(id: string): Observable<Status> {
        return this.http.get<Status>(`${this.baseUrl}/${id}`);
    }

    createStatus(dto: CreateStatusDto): Observable<Status> {
        return this.http.post<Status>(this.baseUrl, dto);
    }

    updateStatus(id: string, dto: UpdateStatusDto): Observable<Status> {
        return this.http.patch<Status>(`${this.baseUrl}/${id}`, dto);
    }

    deleteStatus(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}