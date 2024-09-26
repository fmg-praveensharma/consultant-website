import * as z from "zod";

export const otpSchema = z.object({
  // Define the OTP field as a string and ensure it is valid
  otp: z
    .string()
    .min(6, "OTP must be at least 6 digits")
    .max(6, "OTP must be exactly 6 digits")
    .regex(/^[0-9]+$/, "OTP must contain only numbers"),
});

export type OtpFormData = z.infer<typeof otpSchema>;
