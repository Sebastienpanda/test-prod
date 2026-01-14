import type { Observable } from "rxjs";
import type { Columns } from "@domain/models/kanban-columns.model";

export type ReorderColumnDto = {
    newPosition: number;
};

export interface ColumnsGateway {
    reorder(columnId: string, dto: ReorderColumnDto): Observable<Columns>;
}