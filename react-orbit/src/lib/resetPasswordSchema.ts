import { z } from "zod";

export const resetPasswordSchema = z.object({
    email: z.email("Enter a valid email"),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;