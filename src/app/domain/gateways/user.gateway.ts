import type { Observable } from "rxjs";
import type { UserData } from "@domain/models/user-data.model";
import type { Workspace } from "@domain/models/workspace.model";
import type { Column } from "@domain/models/column.model";
import type { Task } from "@domain/models/task.model";
import type { Status } from "@domain/models/status.model";

// DTOs Workspace
export type CreateWorkspaceDto = {
  name: string;
};

// DTOs Column
export type CreateColumnDto = {
  name: string;
  workspaceId: string;
};

export type ReorderColumnDto = {
  newPosition: number;
};

// DTOs Task
export type CreateTaskDto = Omit<Task, "id" | "createdAt" | "updatedAt" | "order">;

export type ReorderTaskDto = {
  newOrder: number;
  newColumnId?: string | null;
};

// DTOs Status
export type CreateStatusDto = {
  name: string;
  color: string;
  workspaceId: string;
};

export type UpdateStatusDto = {
  name?: string;
  color?: string;
};

export interface UserGateway {
  // Lecture globale
  getUserData(): Observable<UserData>;

  // Mutations Workspace
  createWorkspace(dto: CreateWorkspaceDto): Observable<Workspace>;

  // Mutations Column
  createColumn(dto: CreateColumnDto): Observable<Column>;
  reorderColumn(columnId: string, dto: ReorderColumnDto): Observable<Column>;

  // Mutations Task
  createTask(task: CreateTaskDto): Observable<Task>;
  updateTask(task: Task): Observable<Task>;
  reorderTask(taskId: string, dto: ReorderTaskDto): Observable<Task>;

  // Mutations Status
  createStatus(dto: CreateStatusDto): Observable<Status>;
  updateStatus(statusId: string, dto: UpdateStatusDto): Observable<Status>;
  deleteStatus(statusId: string): Observable<void>;
}
