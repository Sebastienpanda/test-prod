import {
    CdkDrag,
    type CdkDragDrop,
    CdkDragHandle,
    CdkDropList,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, computed, DestroyRef, effect, inject, input, OnInit, output, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CdkScrollable } from "@angular/cdk/overlay";
import { Ellipsis, LucideAngularModule, Plus } from "lucide-angular";
import type { Column } from "@domain/models/column.model";
import type { Task } from "@domain/models/task.model";
import type { Workspace as WorkspaceModel } from "@domain/models/workspace.model";
import type { Status } from "@domain/models/status.model";
import { BadgeDirective } from "@shared/ui/directives/badge.directive";
import { ContextMenu } from "@shared/ui/context-menu/context-menu";
import { MenuItem } from "@shared/ui/context-menu/menu-item";
import { TaskDetail } from "@shared/ui/modal/task-detail/task-detail";
import { TaskCreate } from "@shared/ui/modal/task-create/task-create";
import { USER_GATEWAY } from "@application/tokens";
import { ButtonDirective } from "@shared/ui/directives/button.directive";
import { debounceTime, Subject } from 'rxjs';

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
        ButtonDirective,
    ],
    host: {
        class: "kanban-grid",
    },
})
export class Workspace implements OnInit {
    readonly workspace = input.required<WorkspaceModel>();
    readonly createColumn = output<void>();

    protected readonly hasNoColumns = computed(() => this.workspace().columns.length === 0);
    protected readonly columns = signal<Column[]>([]);
    protected readonly connectedLists = computed<string[]>(() =>
        this.columns().map(column => column.id)
    );
    protected readonly Ellipsis = Ellipsis;
    protected readonly PlusIcon = Plus;
    protected readonly selectedColumn = signal<Column | null>(null);

    // Statuses directement depuis workspace (plus besoin d'appel séparé)
    protected readonly statuses = computed(() => this.workspace().statuses);
    protected readonly initialStatusId = computed(() => {
        const statusList = this.statuses();
        return statusList.length > 0 ? statusList[0].id : "";
    });

    private reorderSubject = new Subject<{
        taskId: string;
        newOrder: number;
        newColumnId?: string;
    }>();
    private readonly userGateway = inject(USER_GATEWAY);
    private readonly destroyRef = inject(DestroyRef);
    private readonly selectedTaskId = signal<string | null>(null);
    protected readonly selectedTask = computed(() => {
        const taskId = this.selectedTaskId();
        if (!taskId) return null;

        for (const column of this.workspace().columns) {
            const task = column.tasks.find((t) => t.id === taskId);
            if (task) return task;
        }
        return null;
    });

    constructor() {
        // Mettre à jour les colonnes quand le workspace change
        effect(() => {
            const workspace = this.workspace();
            this.columns.set(structuredClone(workspace.columns));
        });
    }

    ngOnInit() {
        this.reorderSubject
            .pipe(debounceTime(250), takeUntilDestroyed(this.destroyRef))
            .subscribe(({taskId, newOrder, newColumnId}) => {
                this.userGateway
                    .reorderTask(taskId, {newOrder, newColumnId})
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe();
            });
    }

    dropColumn(event: CdkDragDrop<Column[]>): void {
        const column = event.item.data
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        this.userGateway
            .reorderColumn(column.id, {newPosition: event.currentIndex})
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }

        const task = event.item.data
        if (!task) return;

        const targetColumn = this.columns().find(
            c => c.tasks === event.container.data
        );

        this.reorderSubject.next({
            taskId: task.id,
            newOrder: event.currentIndex,
            ...(event.previousContainer !== event.container && {
                newColumnId: targetColumn?.id,
            }),
        });
    }

    openTaskDetail(task: Task): void {
        this.selectedTaskId.set(task.id);
    }

    openTaskCreate(column: Column): void {
        this.selectedColumn.set(column);
    }

    protected onTaskDetailClosed(): void {
        this.selectedTaskId.set(null);
    }

    protected onTaskCreateClosed(): void {
        this.selectedColumn.set(null);
    }

    protected onCreateColumn(): void {
        this.createColumn.emit();
    }
}
