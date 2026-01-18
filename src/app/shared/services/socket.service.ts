import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { io, Socket } from "socket.io-client";
import type { Task } from "@domain/models/task.model";
import type { Column } from "@domain/models/column.model";
import type { Workspace } from "@domain/models/workspace.model";
import { environment } from "../../../environments/environment";
import { ErrorService } from "./error.service";
import { NotificationService } from "./notification.service";
import { AuthService } from "@application/signin/auth.service";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 1000;
const RECONNECT_DELAY_MAX_MS = 30000;

@Injectable({providedIn: "root"})
export class SocketService implements OnDestroy {
    readonly taskCreated = signal<Task | null>(null);
    readonly taskUpdated = signal<Task | null>(null);
    readonly taskReordered = signal<Task | null>(null);
    readonly taskStatusChanged = signal<Task | null>(null);
    readonly columnCreated = signal<Column | null>(null);
    readonly columnReordered = signal<Column | null>(null);
    readonly workspaceCreated = signal<Workspace | null>(null);
    readonly isConnected = signal(false);
    readonly reconnectAttempt = signal(0);
    private readonly errorService = inject(ErrorService);
    private readonly notificationService = inject(NotificationService);
    private readonly authService = inject(AuthService);
    private socket: Socket | null = null;

    async connect(): Promise<void> {
        if (this.socket?.connected) {
            return;
        }

        const token = await this.authService.getToken();

        this.socket = io(environment.socketUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
            reconnectionDelay: RECONNECT_DELAY_MS,
            reconnectionDelayMax: RECONNECT_DELAY_MAX_MS,
            auth: {
                token
            }
        });

        this.setupConnectionHandlers();
        this.setupEventHandlers();
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected.set(false);
            this.reconnectAttempt.set(0);
        }
    }

    resetWorkspaceEvents(): void {
        this.taskCreated.set(null);
        this.taskUpdated.set(null);
        this.taskReordered.set(null);
        this.taskStatusChanged.set(null);
        this.columnCreated.set(null);
        this.columnReordered.set(null);
    }

    ngOnDestroy(): void {
        this.disconnect();
    }

    private setupConnectionHandlers(): void {
        if (!this.socket) return;

        this.socket.on("connect", () => {
            this.isConnected.set(true);
            this.reconnectAttempt.set(0);
        });

        this.socket.on("disconnect", (reason) => {
            this.isConnected.set(false);
            if (reason === "io server disconnect") {
                this.socket?.connect();
            }
        });

        this.socket.on("connect_error", (error) => {
            this.errorService.handleSocketError(error);
        });

        this.socket.io.on("reconnect_attempt", (attempt) => {
            this.reconnectAttempt.set(attempt);
        });

        this.socket.io.on("reconnect_failed", () => {
            this.errorService.handleSocketError("Reconnexion échouée après plusieurs tentatives");
        });

        this.socket.io.on("reconnect", () => {
            this.reconnectAttempt.set(0);
        });
    }

    private setupEventHandlers(): void {
        if (!this.socket) return;

        this.socket.on("task:created", (task: Task) => {
            this.taskCreated.set(task);
            this.notificationService.taskCreated(task.title);
        });

        this.socket.on("task:updated", (task: Task) => {
            this.taskUpdated.set(task);
            this.notificationService.taskUpdated(task.title);
        });

        this.socket.on("task:reordered", (task: Task) => {
            this.taskReordered.set(task);
            this.notificationService.taskMoved(task.title);
        });

        this.socket.on("task:status-changed", (data: { task: Task; oldStatus: string; newStatus: string }) => {
            this.taskStatusChanged.set(data.task);
            this.notificationService.taskStatusChanged(data.task.title, data.newStatus);
        });

        this.socket.on("column:created", (column: Column) => {
            this.columnCreated.set(column);
            this.notificationService.columnCreated(column.name);
        });

        this.socket.on("column:reordered", (column: Column) => {
            this.columnReordered.set(column);
            this.notificationService.columnMoved(column.name);
        });

        this.socket.on("workspace:created", (workspace: Workspace) => {
            this.workspaceCreated.set(workspace);
            this.notificationService.workspaceCreated(workspace.name);
        });
    }
}
