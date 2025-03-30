"use server";

import { prisma } from "@/lib/prisma";

export async function submitApplication({
  projectId,
  architectId,
  proposal,
  estimatedCost,
  proposedTimeline,
}: {
  projectId: string;
  architectId: string;
  proposal: string;
  estimatedCost: number;
  proposedTimeline: string;
}) {
  return await prisma.proposal.create({
    data: {
      projectId,
      architectId,
      description: proposal,
      estimatedCost,
      proposedTimeline,
      status: "PENDING",
    },
  });
}