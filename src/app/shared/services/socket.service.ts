import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { io, Socket } from "socket.io-client";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { Columns } from "@domain/models/kanban-columns.model";
import { environment } from "../../../environments/environment";
import { ErrorService } from "./error.service";
import { NotificationService } from "./notification.service";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY_MS = 1000;
const RECONNECT_DELAY_MAX_MS = 30000;

@Injectable({ providedIn: "root" })
export class SocketService implements OnDestroy {
    private readonly errorService = inject(ErrorService);
    private readonly notificationService = inject(NotificationService);
    private socket: Socket | null = null;

    readonly taskCreated = signal<Tasks | null>(null);
    readonly taskUpdated = signal<Tasks | null>(null);
    readonly taskReordered = signal<Tasks | null>(null);
    readonly taskStatusChanged = signal<Tasks | null>(null);
    readonly columnReordered = signal<Columns | null>(null);
    readonly isConnected = signal(false);
    readonly reconnectAttempt = signal(0);

    connect(): void {
        if (this.socket?.connected) {
            return;
        }

        this.socket = io(environment.socketUrl, {
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
            reconnectionDelay: RECONNECT_DELAY_MS,
            reconnectionDelayMax: RECONNECT_DELAY_MAX_MS,
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

        this.socket.on("task:created", (task: Tasks) => {
            this.taskCreated.set(task);
            this.notificationService.taskCreated(task.title);
        });

        this.socket.on("task:updated", (task: Tasks) => {
            this.taskUpdated.set(task);
            this.notificationService.taskUpdated(task.title);
        });

        this.socket.on("task:reordered", (task: Tasks) => {
            this.taskReordered.set(task);
            this.notificationService.taskMoved(task.title);
        });

        this.socket.on("task:status-changed", (data: { task: Tasks; oldStatus: string; newStatus: string }) => {
            this.taskStatusChanged.set(data.task);
            this.notificationService.taskStatusChanged(data.task.title, data.newStatus);
        });

        this.socket.on("column:reordered", (column: Columns) => {
            this.columnReordered.set(column);
            this.notificationService.columnMoved(column.name);
        });
    }
}