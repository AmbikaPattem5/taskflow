import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Project name must be at least 2 characters.")
        .max(100, "Project name cannot exceed 100 characters."),
    description: z
        .string()
        .trim()
        .max(1000, "Description cannot exceed 1000 characters.").optional(),
    status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED"]).default("ACTIVE"),
    priority: z
        .enum(["LOW", "MEDIUM", "HIGH", "URGENT"])
        .default("MEDIUM"),
    startDate: z.string().optional().nullable(),
    dueDate: z.string().optional().nullable(),


})

export const addMemberSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    role: z.enum(["ADMIN", "MANAGER", "MEMBER"], {
        message: "Please select a valid role",
    }),
});