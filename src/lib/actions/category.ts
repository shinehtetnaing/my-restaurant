"use server";

import prisma from "@/lib/prisma";
import { categorySchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const getCategories = async (page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const categories = await prisma.category.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    const counts = await prisma.menu.groupBy({
      by: ["categoryId"],
      _count: { _all: true },
    });

    const totalCount = await prisma.category.count();

    const totalPage = Math.ceil(totalCount / pageSize);

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
      page: totalPage,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      message: "Failed to fetch categories",
    };
  }
};

export const getCategory = async (id: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { menus: true },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      data: JSON.parse(JSON.stringify(category)),
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    return {
      success: false,
      message: "Failed to fetch category",
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

export const deleteCategory = async (
  id: string,
): Promise<{
  success: boolean;
  message: string;
  data?: unknown;
}> => {
  try {
    // throw new Error("simulated error"); // Simulate an error for testing

    const excitingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!excitingCategory) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    const category = await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/admin/category");

    return {
      success: true,
      message: "Category deleted successfully",
      data: JSON.parse(JSON.stringify(category)),
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      message: "Failed to delete category",
    };
  }
};
