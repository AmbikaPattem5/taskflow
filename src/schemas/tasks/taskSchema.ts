import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "Title name must be at least 5 characters"),
    project: z
        .string({ error: "Please select a project" })
        .trim()
        .min(1, "Please select a project"),
    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters.").optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).default("TODO"),
    priority: z
        .enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
        .default("MEDIUM"),
    assignee: z
        .string({ error: "Please select an assignee" })
        .trim()
        .min(1, "Please select an assignee"),
    DueDate: z.string().optional().nullable(),

}

)
