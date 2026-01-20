import { InjectionToken } from "@angular/core";
import type { UserGateway } from "../domain/user.gateway";

export const USER_GATEWAY = new InjectionToken<UserGateway>("UserGateway");
