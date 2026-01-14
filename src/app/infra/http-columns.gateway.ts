import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type { Columns } from "@domain/models/kanban-columns.model";
import type { ColumnsGateway, ReorderColumnDto } from "@domain/gateways/columns.gateway";
import { environment } from "@environments/environment";

export class HttpColumnsGateway implements ColumnsGateway {
    private readonly http = inject(HttpClient);

    reorder(columnId: string, dto: ReorderColumnDto): Observable<Columns> {
        return this.http.patch<Columns>(`${environment.apiUrl}/board-columns/${columnId}/reorder`, dto);
    }
}