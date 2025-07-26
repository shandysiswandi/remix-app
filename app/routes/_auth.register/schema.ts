import { z } from "zod";

export const schema = z.object({
  name: z.string().min(5),
  email: z.string().email("Please enter a valid email address."),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    ),
});
