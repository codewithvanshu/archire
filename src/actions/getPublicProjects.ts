"use server";

import { prisma } from "@/lib/prisma";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
}

export async function getPublicProjects(searchQuery: string = "", filter: string = ""): Promise<Project[]> {
  return await prisma.project.findMany({
    where: {
      status: "OPEN",
      title: { contains: searchQuery, mode: "insensitive" },
      category: filter || undefined,
    },
    select: {
      id: true,
      title: true,
      description: true,
      budget: true,
      category: true,
    },
  });
}