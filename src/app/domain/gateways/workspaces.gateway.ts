import { Observable } from "rxjs";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

export interface WorkspacesGateway {
    findAll(): Observable<Workspaces[]>;
    findOne(id: string): Observable<Workspaces>;
}
