
import { z } from "zod";

export const registerSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Enter an Valid email"),
    password: z.string().min(8, "Password must be atleast 8 Character")
});

export type RegisterFormData = z.infer<typeof registerSchema>;