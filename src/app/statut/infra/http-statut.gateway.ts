import { inject } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type { CreateStatutDto, UpdateStatutDto } from "./statut.zod";
import type { StatutGateway } from "../domain/statut.gateway";
import type { Statut } from "../domain/statut.model";

export class HttpStatutGateway implements StatutGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = environment.apiUrl;

    createStatut(dto: CreateStatutDto): Observable<Statut> {
        return this.http.post<Statut>(`${this.baseUrl}/statuses`, dto);
    }

    getStatut(id: string): Observable<Statut> {
        return this.http.get<Statut>(`${this.baseUrl}/statuses/${id}`);
    }

    updateStatut(statusId: string, dto: UpdateStatutDto): Observable<Statut> {
        return this.http.patch<Statut>(`${this.baseUrl}/statuses/${statusId}`, dto);
    }
}
