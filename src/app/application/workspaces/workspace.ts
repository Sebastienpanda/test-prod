import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, input, signal, viewChild } from "@angular/core";
import { CdkScrollable } from "@angular/cdk/overlay";
import { Ellipsis, LucideAngularModule, Plus } from "lucide-angular";
import type { Columns } from "@domain/models/kanban-columns.model";
import type { Tasks } from "@domain/models/kanban-tasks.model";
import type { Workspaces } from "@domain/models/kanban-workspaces.model";
import { BadgeDirective } from "@shared/ui/directives/badge.directive";
import { ContextMenu } from "@shared/ui/context-menu/context-menu";
import { MenuItem } from "@shared/ui/context-menu/menu-item";
import { TaskDetail } from "@shared/ui/modal/task-detail/task-detail";
import { TaskCreate } from "@shared/ui/modal/task-create/task-create";

@Component({
    selector: "app-workspace",
    templateUrl: "./workspace.html",
    styleUrl: "./workspace.css",
    imports: [
        CdkScrollable,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        BadgeDirective,
        LucideAngularModule,
        ContextMenu,
        MenuItem,
        TaskDetail,
        TaskCreate,
    ],
    host: {
        class: "kanban-grid",
    },
})
export class Workspace {
    readonly workspaces = input.required<Workspaces>();

    protected readonly connectedLists = computed(() =>
        this.workspaces().columns.map((_, index) => `tasks-list-${index}`),
    );

    protected readonly Ellipsis = Ellipsis;
    protected readonly PlusIcon = Plus;

    protected readonly selectedTask = signal<Tasks | null>(null);
    protected readonly selectedColumnId = signal<string | null>(null);

    private readonly taskDetailModal = viewChild<TaskDetail>("taskDetailModal");
    private readonly taskCreateModal = viewChild<TaskCreate>("taskCreateModal");

    dropColumn(event: CdkDragDrop<Columns[]>): void {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    drop(event: CdkDragDrop<Tasks[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

    openTaskDetail(task: Tasks): void {
        this.selectedTask.set(task);
    }

    openTaskCreate(columnId: string): void {
        this.selectedColumnId.set(columnId);
    }

    protected onTaskDetailClosed(): void {
        this.selectedTask.set(null);
    }

    protected onTaskCreateClosed(): void {
        this.selectedColumnId.set(null);
    }
}
