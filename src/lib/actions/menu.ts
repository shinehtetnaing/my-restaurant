"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { menuSchema } from "../validations";

export const getMenus = async (page = 1, pageSize = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const menus = await prisma.menu.findMany({
      skip,
      take: pageSize,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.category.count();

    const totalPage = Math.ceil(totalCount / pageSize);

    return {
      success: true,
      message: "Menus fetched successfully",
      data: JSON.parse(JSON.stringify(menus)),
      page: totalPage,
    };
  } catch (error) {
    console.error("Error fetching menus:", error);
    return {
      success: false,
      message: "Failed to fetch menus",
    };
  }
};

export const createMenu = async (params: z.infer<typeof menuSchema>) => {
  const parsed = menuSchema.safeParse(params);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }

  const { name, description, price, imageUrl, categoryId } = parsed.data;

  try {
    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });

    revalidatePath("/admin/menu");

    return {
      success: true,
      message: "Menu created successfully",
      data: JSON.parse(JSON.stringify(menu)),
    };
  } catch (error) {
    console.error("Error creating menu:", error);
    return {
      success: false,
      message: "Failed to create menu",
    };
  }
};
