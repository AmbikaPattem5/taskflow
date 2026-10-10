import { z } from "zod";

export const inviteMemberSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name must be at least 2 characters.")
        .max(50, "Name cannot exceed 50 characters."),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    role: z.enum(["ADMIN", "MANAGER", "MEMBER"], {
        error: "Please select a valid role.",
    }),


})