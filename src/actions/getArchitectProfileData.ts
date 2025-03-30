"use server";

import { prisma } from "@/lib/prisma";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string | null;
}

interface ArchitectProfileData {
  portfolio: PortfolioItem[];
  reviews: Review[];
}

export async function getArchitectProfileData(architectId: string): Promise<ArchitectProfileData> {
  const portfolio = await prisma.portfolioItem.findMany({
    where: { architectId },
  });
  const reviews = await prisma.review.findMany({
    where: { architectId },
    select: {
      id: true,
      client: { select: { name: true } },
      rating: true,
      comment: true,
    },
  });
  return {
    portfolio,
    reviews: reviews.map((r) => ({
      id: r.id,
      reviewerName: r.client.name || "Anonymous",
      rating: r.rating,
      comment: r.comment,
    })),
  };
}