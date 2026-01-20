import type { Observable } from "rxjs";
import type { CreateColumnDto, ReorderColumnDto, UpdateColumnDto } from "../infra/column.zod";
import type { Column } from "./column.model";

export interface ColumnGateway {
    getColumn(id: string): Observable<Column>;
    createColumn(dto: CreateColumnDto): Observable<Column>;
    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column>;
    reorderColumn(id: string, dto: ReorderColumnDto): Observable<Column>;
}
