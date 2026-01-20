import type { ColumnGateway } from "../domain/column.gateway";
import { inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import type { CreateColumnDto, ReorderColumnDto, UpdateColumnDto } from "./column.zod";
import type { Observable } from "rxjs";
import type { Column } from "../domain/column.model";

export class HttpColumnsGateway implements ColumnGateway {
    private readonly http = inject(HttpClient);

    private readonly baseUrl = environment.apiUrl;

    createColumn(dto: CreateColumnDto): Observable<Column> {
        return this.http.post<Column>(`${this.baseUrl}/board-columns`, dto);
    }

    getColumn(id: string): Observable<Column> {
        return this.http.get<Column>(`${this.baseUrl}/board-columns/${id}`);
    }

    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column> {
        return this.http.patch<Column>(`${this.baseUrl}/board-columns/${id}`, dto);
    }

    reorderColumn(columnId: string, dto: ReorderColumnDto): Observable<Column> {
        return this.http.patch<Column>(`${this.baseUrl}/board-columns/${columnId}/reorder`, dto);
    }
}
