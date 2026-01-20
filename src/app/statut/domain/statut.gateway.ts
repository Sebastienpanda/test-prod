import type { Observable } from "rxjs";
import type { Statut } from "./statut.model";
import type { CreateStatutDto, UpdateStatutDto } from "../infra/statut.zod";

export interface StatutGateway {
    getStatut(id: string): Observable<Statut>;
    createStatut(dto: CreateStatutDto): Observable<Statut>;
    updateStatut(id: string, dto: UpdateStatutDto): Observable<Statut>;
}
