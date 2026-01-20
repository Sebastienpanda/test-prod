import { InjectionToken } from "@angular/core";
import type { WorkspacesGateway } from "../domain/workspaces.gateway";

export const WORKSPACES_GATEWAY = new InjectionToken<WorkspacesGateway>("WorkspacesGateway");
