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
    .number({ message: "Menu price must be a number" })
    .positive({ message: "Menu price must be greater than 0" }),
  image: z
    .instanceof(File, { message: "Menu image is required" })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPEG, PNG, and WEBP files are allowed",
      },
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image must be smaller than 5MB",
    }),
  categoryId: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine(
      (val) => val === undefined || z.string().uuid().safeParse(val).success,
      {
        message: "Invalid category ID",
      },
    ),
});
