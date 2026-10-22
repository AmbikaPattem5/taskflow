export type Status = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface TaskPayload {
    title: string;
    project: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    assignee: string;
    dueDate?: string | null;
}