import * as z from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Please select a valid date",
    }),
    emailId: z.string().email("Invalid email address"),
    gender: z
      .enum(["male", "female", "others"])
      .refine((value) => !!value, { message: "Select a gender" }),
    role: z
      .enum(["astrologer", "coach", "listener"])
      .refine((value) => !!value, { message: "Select a role" }),
    languages: z.array(z.string()).nonempty("Select at least one language"),

    // Updated maritalStatus validation
    maritalStatus: z.string().min(1, "Select marital status"),

    skills: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    employed: z
      .enum(["yes", "no"])
      .refine((value) => !!value, { message: "Are you currently employed?" }),
    workingHours: z.string().min(1, "Select working hours"),
    description: z.string().min(1, "Description is required"),
    services: z.string().min(1, "Description is required"),
    fluteKnown: z.string().min(1, "Select flute known"),
    images: z
      .array(z.instanceof(File))
      .max(4, "Upload a maximum of 4 images")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.role === "astrologer") {
        return !!data.skills && data.skills.length > 0;
      }
      return true;
    },
    {
      message: "At least one skill is required for astrologers",
      path: ["skills"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "coach") {
        return (
          !!data.skills &&
          data.skills.length > 0 &&
          !!data.categories &&
          data.categories.length > 0
        );
      }
      return true;
    },
    {
      message: "Skills and categories are required for coaches",
      path: ["skills"],
    }
  );

export type FormData = z.infer<typeof formSchema>;
