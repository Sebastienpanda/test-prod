import { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";
import { Observable } from "rxjs";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

export class WorkspacesUseCase {
    constructor(private readonly _gateway: WorkspacesGateway) {}

    findAll(): Observable<Workspaces[]> {
        return this._gateway.findAll();
    }

    findOne(id: string): Observable<Workspaces> {
        return this._gateway.findOne(id);
    }
}
