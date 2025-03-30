"use server";

import { prisma } from "@/lib/prisma";

export async function makePayment({
  contractId,
  userId,
  amount,
}: {
  contractId: string;
  userId: string;
  amount: number;
}) {
  return await prisma.payment.create({
    data: {
      contractId,
      userId,
      amount,
      status: "PENDING",
    },
  });
}