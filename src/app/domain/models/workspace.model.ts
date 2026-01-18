import { Column } from "@domain/models/column.model";
import { Status } from "@domain/models/status.model";

export type Workspace = {
  id: string;
  name: string;
  userId?: string;
  createdAt: string;
  updatedAt?: string | null;
  statuses: Status[];
  columns: Column[];
};
