import { InjectionToken } from "@angular/core";
import type { TasksGateway } from "@domain/gateways/tasks.gateway";
import type { WorkspacesGateway } from "@domain/gateways/workspaces.gateway";

export const FIND_ONE_WORKSPACE_GATEWAY = new InjectionToken<WorkspacesGateway>("FindOneWorkspaceGateway");
export const ALL_WORKSPACES_GATEWAY = new InjectionToken<WorkspacesGateway>("FindAllWorkspacesGateway");
export const TASKS_GATEWAY = new InjectionToken<TasksGateway>("TasksGateway");
