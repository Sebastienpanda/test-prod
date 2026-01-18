import { Task } from "@domain/models/task.model";

export type Column = {
  id: string;
  name: string;
  workspaceId: string;
  userId?: string;
  position: number;
  createdAt: string;
  updatedAt?: string | null;
  tasks: Task[];
};
