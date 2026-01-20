// import type { Column } from "@domain/models/column.model";
// import type { Task } from "@domain/models/task.model";
// import type { Workspace } from "../../workspace/domain/workspace.model";
//
// type ColumnTransformer = (columns: Column[]) => Column[];
//
// function updateColumn(workspace: Workspace, transform: ColumnTransformer): Workspace {
//     return { ...workspace, columns: transform(workspace.columns) };
// }
//
// export function applyTaskCreated(workspace: Workspace, task: Task): Workspace {
//     const column = workspace.columns.find((c) => c.id === task.columnId);
//     if (!column) return workspace;
//
//     const taskExists = column.tasks.some((t) => t.id === task.id);
//     if (taskExists) return workspace;
//
//     return updateColumn(workspace, (columns) =>
//         columns.map((c) => (c.id === task.columnId ? { ...c, tasks: [...c.tasks, task] } : c)),
//     );
// }
//
// export function applyTaskUpdated(workspace: Workspace, task: Task): Workspace {
//     return updateColumn(workspace, (columns) =>
//         columns.map((c) => ({
//             ...c,
//             tasks: c.tasks.map((t) => (t.id === task.id ? task : t)),
//         })),
//     );
// }
//
// export function applyTaskReordered(workspace: Workspace, task: Task): Workspace {
//     const columnsWithoutTask = workspace.columns.map((c) => ({
//         ...c,
//         tasks: c.tasks.filter((t) => t.id !== task.id),
//     }));
//
//     return updateColumn(workspace, () =>
//         columnsWithoutTask.map((c) => {
//             if (c.id !== task.columnId) return c;
//
//             const tasks = [...c.tasks];
//             tasks.splice(task.order, 0, task);
//             return { ...c, tasks };
//         }),
//     );
// }
//
// export function applyTaskStatusChanged(workspace: Workspace, task: Task): Workspace {
//     const columnsWithoutTask = workspace.columns.map((c) => ({
//         ...c,
//         tasks: c.tasks.filter((t) => t.id !== task.id),
//     }));
//
//     return updateColumn(workspace, () =>
//         columnsWithoutTask.map((c) => (c.id === task.columnId ? { ...c, tasks: [...c.tasks, task] } : c)),
//     );
// }
//
// export function applyColumnCreated(workspace: Workspace, column: Column): Workspace {
//     if (workspace.id !== column.workspaceId) return workspace;
//
//     const columnExists = workspace.columns.some((c) => c.id === column.id);
//     if (columnExists) return workspace;
//
//     const newColumn = { ...column, tasks: column.tasks ?? [] };
//     return { ...workspace, columns: [...workspace.columns, newColumn] };
// }
//
// export function applyColumnUpdated(workspace: Workspace, column: Column): Workspace {
//     return updateColumn(workspace, (columns) =>
//         columns.map((c) => {
//             if (c.id === column.id) {
//                 // Préserver les tâches existantes
//                 return { ...column, tasks: c.tasks };
//             }
//             return c;
//         }),
//     );
// }
//
// export function applyColumnReordered(workspace: Workspace, column: Column): Workspace {
//     const existingColumn = workspace.columns.find((c) => c.id === column.id);
//     const columnWithTask = { ...column, tasks: existingColumn?.tasks ?? column.tasks };
//     const columnsWithoutTarget = workspace.columns.filter((c) => c.id !== column.id);
//     const columns = [...columnsWithoutTarget];
//     columns.splice(column.position, 0, columnWithTask);
//
//     return { ...workspace, columns };
// }
