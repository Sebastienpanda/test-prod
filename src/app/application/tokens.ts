import { InjectionToken } from "@angular/core";
import type { UserGateway } from "@domain/gateways/user.gateway";
import type { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";
import type { ColumnsGateway } from "@domain/gateways/columns.gateway";
import type { TasksGateway } from "@domain/gateways/tasks.gateway";
import type { StatusesGateway } from "@domain/gateways/statuses.gateway";

export const USER_GATEWAY = new InjectionToken<UserGateway>("UserGateway");
export const WORKSPACES_GATEWAY = new InjectionToken<WorkspacesGateway>("WorkspacesGateway");
export const COLUMNS_GATEWAY = new InjectionToken<ColumnsGateway>("ColumnsGateway");
export const TASKS_GATEWAY = new InjectionToken<TasksGateway>("TasksGateway");
export const STATUSES_GATEWAY = new InjectionToken<StatusesGateway>("StatusesGateway");
