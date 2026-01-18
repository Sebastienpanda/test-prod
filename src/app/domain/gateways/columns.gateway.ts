import type { Observable } from "rxjs";
import type { Column } from "@domain/models/column.model";

export type CreateColumnDto = {
    name: string;
    workspaceId: string;
};

export type UpdateColumnDto = {
    name: string;
};

export type ReorderColumnDto = {
    newPosition: number;
};

export interface ColumnsGateway {
    getColumn(id: string): Observable<Column>;
    createColumn(dto: CreateColumnDto): Observable<Column>;
    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column>;
    reorderColumn(id: string, dto: ReorderColumnDto): Observable<Column>;
}