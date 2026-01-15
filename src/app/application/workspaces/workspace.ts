import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, DestroyRef, inject, input, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CdkScrollable } from "@angular/cdk/overlay";
import { Ellipsis, LucideAngularModule, Plus } from "lucide-angular";
import type { Columns } from "@domain/models/kanban-columns.model";
import { getStatusFromColumnName, type Tasks } from "@domain/models/kanban-tasks.model";
import type { Workspaces } from "@domain/models/kanban-workspaces.model";
import { BadgeDirective } from "@shared/ui/directives/badge.directive";
import { ContextMenu } from "@shared/ui/context-menu/context-menu";
import { MenuItem } from "@shared/ui/context-menu/menu-item";
import { TaskDetail } from "@shared/ui/modal/task-detail/task-detail";
import { TaskCreate } from "@shared/ui/modal/task-create/task-create";
import { TasksUseCase } from "@domain/use-cases/tasks.use-case";
import { ColumnsUseCase } from "@domain/use-cases/columns.use-case";
import { COLUMNS_GATEWAY, TASKS_GATEWAY } from "@application/tokens";

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

    private readonly tasksUseCase = new TasksUseCase(inject(TASKS_GATEWAY));
    private readonly columnsUseCase = new ColumnsUseCase(inject(COLUMNS_GATEWAY));
    private readonly destroyRef = inject(DestroyRef);

    protected readonly connectedLists = computed(() =>
        this.workspaces().columns.map((_, index) => `tasks-list-${index}`),
    );

    protected readonly Ellipsis = Ellipsis;
    protected readonly PlusIcon = Plus;

    private readonly selectedTaskId = signal<string | null>(null);
    protected readonly selectedColumn = signal<Columns | null>(null);

    protected readonly selectedTask = computed(() => {
        const taskId = this.selectedTaskId();
        if (!taskId) return null;

        for (const column of this.workspaces().columns) {
            const task = column.tasks.find((t) => t.id === taskId);
            if (task) return task;
        }
        return null;
    });

    protected readonly initialStatus = computed(() => {
        const column = this.selectedColumn();
        return column ? getStatusFromColumnName(column.name) : "todo";
    });

    dropColumn(event: CdkDragDrop<Columns[]>): void {
        const column = event.container.data[event.previousIndex];
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        this.columnsUseCase
            .reorder(column.id, { newPosition: event.currentIndex })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    drop(event: CdkDragDrop<Tasks[]>): void {
        const task = event.previousContainer.data[event.previousIndex];
        const isSameColumn = event.previousContainer === event.container;

        if (isSameColumn) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }

        const columnIndex = parseInt(event.container.id.replace("tasks-list-", ""), 10);
        const targetColumn = this.workspaces().columns[columnIndex];

        this.tasksUseCase
            .reorder(task.id, {
                newOrder: event.currentIndex,
                newColumnId: isSameColumn ? undefined : targetColumn.id,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    openTaskDetail(task: Tasks): void {
        this.selectedTaskId.set(task.id);
    }

    openTaskCreate(column: Columns): void {
        this.selectedColumn.set(column);
    }

    protected onTaskDetailClosed(): void {
        this.selectedTaskId.set(null);
    }

    protected onTaskCreateClosed(): void {
        this.selectedColumn.set(null);
    }
}
