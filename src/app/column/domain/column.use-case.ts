import type { ColumnGateway } from "./column.gateway";
import type { Observable } from "rxjs";
import type { Column } from "./column.model";
import type { CreateColumnDto, UpdateColumnDto } from "../infra/column.zod";

export class ColumnUseCase {
    constructor(private readonly _gateway: ColumnGateway) {}

    getColumn(id: string): Observable<Column> {
        return this._gateway.getColumn(id);
    }

    createColumn(dto: CreateColumnDto): Observable<Column> {
        return this._gateway.createColumn(dto);
    }

    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column> {
        return this._gateway.updateColumn(id, dto);
    }
}
