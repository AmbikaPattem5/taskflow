import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Name must be at least 2 characters.")
        .max(50, "Name cannot exceed 50 characters."),

    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .trim()
        .refine(
            (value) => {
                if (!value) return true;
                return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(value);
            },
            "Please enter a valid phone number"
        ),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        ),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),

    termsAccepted: z
        .boolean()
        .refine(
            (value) => value === true,
            "You must accept the Terms of Service and Privacy Policy"
        ),

})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );

export type RegisterFormData = z.infer<typeof registerSchema>;