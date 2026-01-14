import type { Observable } from "rxjs";
import type { Columns } from "@domain/models/kanban-columns.model";
import type { ColumnsGateway, ReorderColumnDto } from "@domain/gateways/columns.gateway";

export class ColumnsUseCase {
    constructor(private readonly gateway: ColumnsGateway) {}

    reorder(columnId: string, dto: ReorderColumnDto): Observable<Columns> {
        return this.gateway.reorder(columnId, dto);
    }
}