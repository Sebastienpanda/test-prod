import type { Observable } from "rxjs";
import type { Statut } from "./statut.model";
import type { StatutGateway } from "./statut.gateway";
import type { CreateStatutDto, UpdateStatutDto } from "../infra/statut.zod";

export class StatutUseCase {
    constructor(private readonly _gateway: StatutGateway) {}

    getStatut(id: string): Observable<Statut> {
        return this._gateway.getStatut(id);
    }

    createStatut(dto: CreateStatutDto): Observable<Statut> {
        return this._gateway.createStatut(dto);
    }

    updateStatut(id: string, dto: UpdateStatutDto): Observable<Statut> {
        return this._gateway.updateStatut(id, dto);
    }
}
