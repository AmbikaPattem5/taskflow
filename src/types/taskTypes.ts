export type Status = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export interface TaskPayload {
    title: string,
    description: string,
    project: string[],
    status: Status, // Optional: "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE" (default: "TODO")
    priority: Priority, // Optional: "LOW" | "MEDIUM" | "HIGH" | "URGENT" (default: "MEDIUM")
    assignee: string, // Optional: User ObjectId or null
    dueDate: string // Optional: ISO date string or "YYYY-MM-DD"
}