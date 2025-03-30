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
  architectName: string;
  estimatedCost: number;
  status: string;
}

interface ClientDashboardData {
  projects: Project[];
  proposals: Proposal[];
}

export async function getClientDashboardData(clientId: string): Promise<ClientDashboardData> {
  const projects = await prisma.project.findMany({
    where: { clientId },
    select: {
      id: true,
      title: true,
      description: true,
      budget: true,
      category: true,
    },
  });
  const proposals = await prisma.proposal.findMany({
    where: { project: { clientId } },
    select: {
      id: true,
      project: { select: { title: true } },
      architect: { select: { name: true } },
      estimatedCost: true,
      status: true,
    },
  });
  return {
    projects,
    proposals: proposals.map((p) => ({
      id: p.id,
      projectTitle: p.project.title,
      architectName: p.architect.name || "Unknown",
      estimatedCost: p.estimatedCost,
      status: p.status,
    })),
  };
}