"use server";

import prisma from "@/lib/prisma";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { menuSchema } from "../validations";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

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

    const totalCount = await prisma.menu.count();

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

  const { name, description, price, image, categoryId } = parsed.data;

  if (!image) {
    return {
      success: false,
      message: "Menu image is required",
    };
  }

  if (image.size > 5 * 1024 * 1024) {
    return {
      success: false,
      message: "Image must be smaller than 5MB",
    };
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(image.type)) {
    return {
      success: false,
      message: "Only JPEG, PNG, and WEBP files are allowed",
    };
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const s3Params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `menu/${image.name}`,
    Body: buffer,
    ContentType: image.type,
  };

  const response = await s3.send(new PutObjectCommand(s3Params));

  if (response.$metadata.httpStatusCode !== 200) {
    return {
      success: false,
      message: "Failed to upload image",
    };
  }

  const s3Url = `https://${s3Params.Bucket}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${s3Params.Key}`;

  try {
    const menu = await prisma.menu.create({
      data: {
        name,
        description,
        price,
        imageUrl: s3Url,
        categoryId: categoryId ?? null,
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

export const deleteMenu = async (
  id: string,
): Promise<{
  success: boolean;
  message: string;
  data?: unknown;
}> => {
  try {
    const existingMenu = await prisma.menu.findUnique({
      where: { id },
    });

    if (!existingMenu) {
      return {
        success: false,
        message: "Menu not found",
      };
    }

    if (existingMenu.imageUrl) {
      const imageKey = existingMenu.imageUrl.split("/").pop();

      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `menu/${imageKey}`,
      };

      const deleteResponse = await s3.send(
        new DeleteObjectCommand(deleteParams),
      );

      if (deleteResponse.$metadata.httpStatusCode !== 204) {
        return {
          success: false,
          message: "Failed to delete image from S3",
        };
      }
    }

    const menu = await prisma.menu.delete({
      where: { id },
    });

    revalidatePath("/admin/menu");

    return {
      success: true,
      message: "Menu deleted successfully",
      data: JSON.parse(JSON.stringify(menu)),
    };
  } catch (error) {
    console.error("Error deleting menu:", error);
    return {
      success: false,
      message: "Failed to delete menu",
    };
  }
};
