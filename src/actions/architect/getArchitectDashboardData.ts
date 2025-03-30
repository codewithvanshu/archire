"use server";

import { prisma } from "@/lib/prisma";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
}

interface Proposal {
  id: string;
  projectTitle: string;
  estimatedCost: number;
  status: string;
}

interface ArchitectDashboardData {
  appliedProjects: Project[];
  proposals: Proposal[];
}

export async function getArchitectDashboardData(architectId: string): Promise<ArchitectDashboardData> {
  const proposals = await prisma.proposal.findMany({
    where: { architectId },
    include: {
      project: {
        select: { id: true, title: true, description: true, budget: true, category: true },
      },
    },
  });
  const appliedProjects = proposals.map((p) => p.project);
  return {
    appliedProjects,
    proposals: proposals.map((p) => ({
      id: p.id,
      projectTitle: p.project.title,
      estimatedCost: p.estimatedCost,
      status: p.status,
    })),
  };
}