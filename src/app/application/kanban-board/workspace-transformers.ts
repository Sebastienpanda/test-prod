import { Columns } from "@domain/models/kanban-columns.model";
import { Tasks } from "@domain/models/kanban-tasks.model";
import { Workspaces } from "@domain/models/kanban-workspaces.model";

type ColumnTransformer = (columns: Columns[]) => Columns[];

function updateColumns(workspace: Workspaces, transform: ColumnTransformer): Workspaces {
    return { ...workspace, columns: transform(workspace.columns) };
}

export function applyTaskCreated(workspace: Workspaces, task: Tasks): Workspaces {
    const column = workspace.columns.find((c) => c.id === task.columnId);
    if (!column) return workspace;

    const taskExists = column.tasks.some((t) => t.id === task.id);
    if (taskExists) return workspace;

    return updateColumns(workspace, (columns) =>
        columns.map((c) => (c.id === task.columnId ? { ...c, tasks: [...c.tasks, task] } : c)),
    );
}

export function applyTaskUpdated(workspace: Workspaces, task: Tasks): Workspaces {
    return updateColumns(workspace, (columns) =>
        columns.map((c) => ({
            ...c,
            tasks: c.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
    );
}

export function applyTaskReordered(workspace: Workspaces, task: Tasks): Workspaces {
    const columnsWithoutTask = workspace.columns.map((c) => ({
        ...c,
        tasks: c.tasks.filter((t) => t.id !== task.id),
    }));

    return updateColumns(workspace, () =>
        columnsWithoutTask.map((c) => {
            if (c.id !== task.columnId) return c;

            const tasks = [...c.tasks];
            tasks.splice(task.order, 0, task);
            return { ...c, tasks };
        }),
    );
}

export function applyTaskStatusChanged(workspace: Workspaces, task: Tasks): Workspaces {
    const columnsWithoutTask = workspace.columns.map((c) => ({
        ...c,
        tasks: c.tasks.filter((t) => t.id !== task.id),
    }));

    return updateColumns(workspace, () =>
        columnsWithoutTask.map((c) => (c.id === task.columnId ? { ...c, tasks: [...c.tasks, task] } : c)),
    );
}

export function applyColumnReordered(workspace: Workspaces, column: Columns): Workspaces {
    const existingColumn = workspace.columns.find((c) => c.id === column.id);
    const columnWithTasks = { ...column, tasks: existingColumn?.tasks ?? column.tasks };
    const columnsWithoutTarget = workspace.columns.filter((c) => c.id !== column.id);
    const columns = [...columnsWithoutTarget];
    columns.splice(column.position, 0, columnWithTasks);

    return { ...workspace, columns };
}
