"use server";

import prisma from "@/lib/prisma";

export async function createUser(userData: CreateUserParams) {
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
      },
    });

    const newUser = JSON.parse(JSON.stringify(user));
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
