"use server";

import { prisma } from "@/lib/prisma";

interface ProfileData {
  name: string;
  bio: string;
  contactInfo: string;
}

export async function getArchitectProfile(architectId: string): Promise<ProfileData | null> {
  const user = await prisma.user.findUnique({
    where: { id: architectId },
    select: { name: true, bio: true, contactInfo: true },
  });
  if (!user) return null;
  return {
    name: user.name || "",
    bio: user.bio || "",
    contactInfo: user.contactInfo || "",
  };
}