import * as z from "zod";

export const mobileSchema = z.object({
  // Define the mobile number field as a string and ensure it is valid
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number must be at most 15 digits")
    .regex(/^[0-9]+$/, "Mobile number must contain only numbers"),
});

export type MobileFormData = z.infer<typeof mobileSchema>;
