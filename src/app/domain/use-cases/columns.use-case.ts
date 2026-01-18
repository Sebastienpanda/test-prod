import { inject, Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { tap } from "rxjs";
import type { Column } from "@domain/models/column.model";
import type {
    ColumnsGateway,
    CreateColumnDto,
    ReorderColumnDto,
    UpdateColumnDto,
} from "@domain/gateways/columns.gateway";
import { COLUMNS_GATEWAY } from "@application/tokens";

@Injectable({
    providedIn: "root",
})
export class ColumnsUseCase {
    private readonly gateway = inject(COLUMNS_GATEWAY);

    getColumn(id: string): Observable<Column> {
        return this.gateway.getColumn(id);
    }

    createColumn(dto: CreateColumnDto): Observable<Column> {
        return this.gateway.createColumn(dto).pipe(
            tap((column) => console.log("[ColumnsUseCase] Column created:", column)),
        );
    }

    updateColumn(id: string, dto: UpdateColumnDto): Observable<Column> {
        return this.gateway.updateColumn(id, dto).pipe(
            tap((column) => console.log("[ColumnsUseCase] Column updated:", column)),
        );
    }

    reorderColumn(id: string, dto: ReorderColumnDto): Observable<Column> {
        return this.gateway.reorderColumn(id, dto).pipe(
            tap((column) => console.log("[ColumnsUseCase] Column reordered:", column)),
        );
    }
}