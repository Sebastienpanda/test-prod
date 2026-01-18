import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import type { Observable } from "rxjs";
import type {
    ColumnsGateway,
    CreateColumnDto,
    ReorderColumnDto,
    UpdateColumnDto,
} from "@domain/gateways/columns.gateway";
import type { Column } from "@domain/models/column.model";
import { environment } from "@environments/environment";

export class HttpColumnsGateway implements ColumnsGateway {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiUrl}/board-columns`;

    getColumn(id: string): Observable<Column> {
        return this.http.get<Column>(`${this.baseUrl}/${id}`);
    }

    createColumn(dto: CreateColumnDto): Observable<Column> {
        return this.http.post<Column>(this.baseUrl, dto);
    }

    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column> {
        return this.http.patch<Column>(`${this.baseUrl}/${id}`, dto);
    }

    reorderColumn(id: string, dto: ReorderColumnDto): Observable<Column> {
        return this.http.patch<Column>(`${this.baseUrl}/${id}/reorder`, dto);
    }
}
