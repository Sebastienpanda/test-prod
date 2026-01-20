// import type { OnDestroy } from "@angular/core";
// import { inject, Injectable, signal } from "@angular/core";
// import type { Socket } from "socket.io-client";
// import { io } from "socket.io-client";
// import { ErrorService } from "./error.service";
// import { NotificationService } from "./notification.service";
// import type { Task } from "../../task/domain/task.model";
// import type { Column } from "../../column/domain/column.model";
// import type { Workspace } from "../../application/workspaces/workspace";
// import { AuthService } from "../../application/signin/auth.service";
// import { environment } from "@environments/environment";
//
// const MAX_RECONNECT_ATTEMPTS = 5;
// const RECONNECT_DELAY_MS = 1000;
// const RECONNECT_DELAY_MAX_MS = 30000;
//
// @Injectable({ providedIn: "root" })
// export class SocketService implements OnDestroy {
//     readonly taskCreated = signal<Task | null>(null);
//     readonly taskUpdated = signal<Task | null>(null);
//     readonly taskReordered = signal<Task | null>(null);
//     readonly taskStatusChanged = signal<Task | null>(null);
//     readonly columnCreated = signal<Column | null>(null);
//     readonly columnUpdated = signal<Column | null>(null);
//     readonly columnReordered = signal<Column | null>(null);
//     readonly workspaceCreated = signal<Workspace | null>(null);
//     readonly workspaceUpdated = signal<Workspace | null>(null);
//     readonly isConnected = signal(false);
//     readonly reconnectAttempt = signal(0);
//     private readonly errorService = inject(ErrorService);
//     private readonly notificationService = inject(NotificationService);
//     private readonly authService = inject(AuthService);
//     private socket: Socket | null = null;
//     private isConnecting = false;
//
//     async connect(): Promise<void> {
//         // Ignorer si déjà connecté ou connexion en cours
//         if (this.socket?.connected || this.isConnecting) {
//             return;
//         }
//
//         this.isConnecting = true;
//         this.cleanupSocket();
//
//         const token = await this.authService.getToken();
//
//         this.socket = io(environment.socketUrl, {
//             transports: ["websocket", "polling"],
//             reconnection: true,
//             reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
//             reconnectionDelay: RECONNECT_DELAY_MS,
//             reconnectionDelayMax: RECONNECT_DELAY_MAX_MS,
//             auth: {
//                 token,
//             },
//         });
//
//         this.setupConnectionHandlers();
//         this.setupEventHandlers();
//     }
//
//     disconnect(): void {
//         this.cleanupSocket();
//         this.isConnected.set(false);
//         this.reconnectAttempt.set(0);
//         this.isConnecting = false;
//     }
//
//     resetWorkspaceEvents(): void {
//         this.taskCreated.set(null);
//         this.taskUpdated.set(null);
//         this.taskReordered.set(null);
//         this.taskStatusChanged.set(null);
//         this.columnCreated.set(null);
//         this.columnReordered.set(null);
//     }
//
//     ngOnDestroy(): void {
//         this.disconnect();
//     }
//
//     private cleanupSocket(): void {
//         if (this.socket) {
//             this.socket.removeAllListeners();
//             this.socket.io.removeAllListeners();
//             this.socket.disconnect();
//             this.socket = null;
//         }
//     }
//
//     private setupConnectionHandlers(): void {
//         if (!this.socket) return;
//
//         // Nettoyer les anciens listeners de connexion
//         this.socket.off("connect");
//         this.socket.off("disconnect");
//         this.socket.off("connect_error");
//         this.socket.io.off("reconnect_attempt");
//         this.socket.io.off("reconnect_failed");
//         this.socket.io.off("reconnect");
//
//         this.socket.on("connect", () => {
//             this.isConnected.set(true);
//             this.reconnectAttempt.set(0);
//             this.isConnecting = false;
//         });
//
//         this.socket.on("disconnect", (reason) => {
//             this.isConnected.set(false);
//             if (reason === "io server disconnect") {
//                 this.socket?.connect();
//             }
//         });
//
//         this.socket.on("connect_error", (error) => {
//             this.errorService.handleSocketError(error);
//             this.isConnecting = false;
//         });
//
//         this.socket.io.on("reconnect_attempt", (attempt) => {
//             this.reconnectAttempt.set(attempt);
//         });
//
//         this.socket.io.on("reconnect_failed", () => {
//             this.errorService.handleSocketError("Reconnexion échouée après plusieurs tentatives");
//         });
//
//         this.socket.io.on("reconnect", () => {
//             this.reconnectAttempt.set(0);
//         });
//     }
//
//     private setupEventHandlers(): void {
//         if (!this.socket) return;
//
//         // Nettoyer tous les anciens listeners d'événements
//         this.socket.off("task:created");
//         this.socket.off("task:updated");
//         this.socket.off("task:reordered");
//         this.socket.off("task:status-changed");
//         this.socket.off("column:created");
//         this.socket.off("column:updated");
//         this.socket.off("column:reordered");
//         this.socket.off("workspace:created");
//         this.socket.off("workspace:updated");
//
//         this.socket.on("task:created", (task: Task) => {
//             this.taskCreated.set(task);
//             this.notificationService.taskCreated(task.title);
//         });
//
//         this.socket.on("task:updated", (task: Task) => {
//             this.taskUpdated.set(task);
//             this.notificationService.taskUpdated(task.title);
//         });
//
//         this.socket.on("task:reordered", (task: Task) => {
//             this.taskReordered.set(task);
//             this.notificationService.taskMoved(task.title);
//         });
//
//         this.socket.on("task:status-changed", (data: { task: Task; oldStatus: string; newStatus: string }) => {
//             this.taskStatusChanged.set(data.task);
//             this.notificationService.taskStatusChanged(data.task.title, data.newStatus);
//         });
//
//         this.socket.on("column:created", (column: Column) => {
//             this.columnCreated.set(column);
//             this.notificationService.columnCreated(column.name);
//         });
//
//         this.socket.on("column:updated", (column: Column) => {
//             this.columnUpdated.set(column);
//             this.notificationService.columnUpdated(column.name);
//         });
//
//         this.socket.on("column:reordered", (column: Column) => {
//             this.columnReordered.set(column);
//             this.notificationService.columnMoved(column.name);
//         });
//
//         this.socket.on("workspace:created", (workspace: Workspace) => {
//             this.workspaceCreated.set(workspace);
//             this.notificationService.workspaceCreated(workspace.name);
//         });
//
//         this.socket.on("workspace:updated", (workspace: Workspace) => {
//             this.workspaceUpdated.set(workspace);
//             this.notificationService.workspaceUpdated(workspace.name);
//         });
//     }
// }
