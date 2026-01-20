import { InjectionToken } from "@angular/core";
import type { StatutGateway } from "../domain/statut.gateway";

export const STATUT_GATEWAY = new InjectionToken<StatutGateway>("StatutGateway");
