// import { inject, Injectable, signal } from "@angular/core";
// import type { Observable } from "rxjs";
// import { tap } from "rxjs";
// import type { Task } from "@domain/models/task.model";
// import type { CreateTaskDto } from "@domain/gateways/user.gateway";
// import { USER_GATEWAY } from "@application/tokens";
//
// @Injectable({
//     providedIn: "root",
// })
// export class ModalService {
//     private readonly userGateway = inject(USER_GATEWAY);
//
//     readonly isOpen = signal(false);
//     readonly selectedItem = signal<Task | null>(null);
//     readonly onTaskCreated = signal<Task | null>(null);
//
//     openModal(item: Task): void {
//         this.selectedItem.set(item);
//         this.isOpen.set(true);
//     }
//
//     closeModal(): void {
//         this.isOpen.set(false);
//         this.selectedItem.set(null);
//     }
//
//     createTask(task: CreateTaskDto): Observable<Task> {
//         return this.userGateway.createTask(task).pipe(tap((createdTask) => this.onTaskCreated.set(createdTask)));
//     }
//
//     updateTask(task: Task): Observable<Task> {
//         return this.userGateway.updateTask(task).pipe(tap((updatedTask) => this.selectedItem.set(updatedTask)));
//     }
// }
