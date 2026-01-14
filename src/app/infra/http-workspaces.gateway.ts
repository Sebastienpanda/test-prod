import { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Workspaces } from "@domain/models/kanban-workspaces.model";
import { environment } from "@environments/environment";

export class HttpWorkspacesGateway implements WorkspacesGateway {
    protected readonly _http = inject(HttpClient);

    findAll(): Observable<Workspaces[]> {
        return this._http.get<Workspaces[]>(`${environment.apiUrl}/workspaces`);
    }

    findOne(id: string): Observable<Workspaces> {
        return this._http.get<Workspaces>(`${environment.apiUrl}/workspaces/${id}`);
    }
}
