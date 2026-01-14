import { Injectable, signal, OnDestroy } from "@angular/core";
import { io, Socket } from "socket.io-client";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { Columns } from "@domain/models/kanban-columns.model";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class SocketService implements OnDestroy {
    private socket: Socket | null = null;

    readonly taskCreated = signal<Tasks | null>(null);
    readonly taskUpdated = signal<Tasks | null>(null);
    readonly taskReordered = signal<Tasks | null>(null);
    readonly taskStatusChanged = signal<Tasks | null>(null);
    readonly columnReordered = signal<Columns | null>(null);
    readonly isConnected = signal(false);

    connect(): void {
        if (this.socket?.connected) {
            return;
        }

        const socketUrl = environment.apiUrl.replace("/api", "");

        this.socket = io(socketUrl, {
            transports: ["websocket", "polling"],
        });

        this.socket.on("connect", () => {
            this.isConnected.set(true);
            console.log("Socket.IO connected");
        });

        this.socket.on("disconnect", () => {
            this.isConnected.set(false);
            console.log("Socket.IO disconnected");
        });

        this.socket.on("task:created", (task: Tasks) => {
            console.log("Task created via socket:", task);
            this.taskCreated.set(task);
        });

        this.socket.on("task:updated", (task: Tasks) => {
            console.log("Task updated via socket:", task);
            this.taskUpdated.set(task);
        });

        this.socket.on("task:reordered", (task: Tasks) => {
            console.log("Task reordered via socket:", task);
            this.taskReordered.set(task);
        });

        this.socket.on("task:status-changed", (data: { task: Tasks; oldStatus: string; newStatus: string }) => {
            console.log("Task status changed via socket:", data);
            this.taskStatusChanged.set(data.task);
        });

        this.socket.on("column:reordered", (column: Columns) => {
            console.log("Column reordered via socket:", column);
            this.columnReordered.set(column);
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected.set(false);
        }
    }

    ngOnDestroy(): void {
        this.disconnect();
    }
}
