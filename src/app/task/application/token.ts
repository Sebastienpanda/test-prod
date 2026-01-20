import { InjectionToken } from "@angular/core";
import type { TaskGateway } from "../domain/task.gateway";

export const TASK_GATEWAY = new InjectionToken<TaskGateway>("TaskGateway");
