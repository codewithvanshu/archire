"use server";

import { prisma } from "@/lib/prisma";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  category: string;
  requirements: string;
}

export async function getProjectDetails(projectId: string): Promise<Project | null> {
  return await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      title: true,
      description: true,
      budget: true,
      timeline: true,
      category: true,
      requirements: true,
    },
  });
}