import { Routes } from '@angular/router';
import kanbanRouter from '@application/kanban.router';

export const routes: Routes = [...kanbanRouter, {
    path: "signin",
    loadComponent: () => import("@application/signin/signin")
}];
