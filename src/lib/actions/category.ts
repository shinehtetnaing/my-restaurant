"use server";

import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const createCategory = async (params: CategoryParams) => {
  const parsed = categorySchema.safeParse(params);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  const { name } = parsed.data;

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    revalidatePath("/admin/category");

    return {
      success: true,
      message: "Category created successfully",
      data: JSON.parse(JSON.stringify(category)),
    };
  } catch (error) {
    console.error("Error creating category:", error);

    return {
      success: false,
      message: "Failed to create category",
    };
  }
};
