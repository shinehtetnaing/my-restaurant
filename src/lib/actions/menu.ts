import prisma from "../prisma";

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
