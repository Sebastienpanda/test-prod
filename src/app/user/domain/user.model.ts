import type { Workspace } from "../../workspace/domain/workspace.model";

export type User = {
    workspaces: Workspace[];
};
