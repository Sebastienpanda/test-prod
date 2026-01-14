import type { Routes } from "@angular/router";
import { KanbanBoard } from "@application/kanban-board/kanban-board";

const routes: Routes = [
    {
        path: "",
        component: KanbanBoard,
    },
];

export default routes;
