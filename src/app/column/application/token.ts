import { InjectionToken } from "@angular/core";
import type { ColumnGateway } from "../domain/column.gateway";

export const COLUMN_GATEWAY = new InjectionToken<ColumnGateway>("ColumnGateway");
