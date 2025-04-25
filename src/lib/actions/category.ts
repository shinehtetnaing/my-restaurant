"use server";

import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const counts = await prisma.menu.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    });

    // Build a map of categoryId → count
    const countMap = counts.reduce<Record<string, number>>((map, row) => {
      map[row.categoryId] = row._count._all;
      return map;
    }, {});

    // Attach totalMenuCount to each category
    const result = categories.map((cat) => ({
      ...cat,
      total: countMap[cat.id] ?? 0,
    }));

    return {
      success: true,
      message: "Categories fetched successfully",
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
    };
  }
};

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
