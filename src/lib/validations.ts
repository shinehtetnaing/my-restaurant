import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }).max(50, {
    message: "Category name be at most 50 characters.",
  }),
});
