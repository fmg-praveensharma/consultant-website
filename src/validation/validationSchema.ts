import * as z from "zod";

export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, "Last name is required"),
    description: z.string().min(1, "Description  is required"),
    dateOfBirth: z.string().min(1),
    email: z.string().email("Invalid email address"),
    gender: z.number().min(1).max(3, {
      message: "Gender must be between 1 (Male), 2 (Female), or 3 (Others)",
    }),
    maritalStatus: z.number().min(1).max(4, {
      message:
        "Status must be between 1 (Single), 2 (Married), 3 (Divorced) or 4 (Widowed)",
    }),
    languages: z.array(z.string()).nonempty("Select at least one language"),
    role: z.number().min(1).max(3, {
      message: "Select a consultant type",
    }),
    skills: z
      .array(z.number())
      .max(3, "You can select up to 3 skills")
      .optional(),
    categories: z
      .array(z.number())
      .max(3, "You can select up to 3 categories")
      .optional(),
    fluteKnown: z.string().min(1, "Select flute known"),
  })
  .refine(
    (data) => {
      if (data.role === 1 || data.role === 2) {
        return data.skills && data.skills.length > 0;
      }
      return true;
    },
    {
      message: "Skills are required",
      path: ["skills"],
    }
  )
  .refine(
    (data) => {
      if (data.role === 2) {
        return data.categories && data.categories.length > 0;
      }
      return true;
    },
    {
      message: "Categories are required",
      path: ["categories"],
    }
  );

export type FormData = z.infer<typeof formSchema>;
