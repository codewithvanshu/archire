"use server";

import { prisma } from "@/lib/prisma";

export async function updateProfile(
  userId: string,
  data: { name: string; bio: string; contactInfo: string }
) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
}