import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Category name is required" })
    .max(50, {
      message: "Category name be at most 50 characters.",
    }),
});

export const menuSchema = z.object({
  name: z.string().trim().min(1, { message: "Menu name is required" }).max(50, {
    message: "Menu name be at most 50 characters.",
  }),
  description: z.string().trim().optional(),
  price: z.coerce
    .number()
    .int()
    .positive({ message: "Menu price must be greater than 0" }),
  imageUrl: z
    .string()
    .trim()
    .min(1, { message: "Menu image is required" })
    .url(),
  categoryId: z.string().trim().uuid().optional(),
});
