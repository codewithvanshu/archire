"use server";
import { prisma } from "@/lib/prisma";

// Define the ContractData type
interface ContractData {
  contract: {
    id: string;
    projectTitle: string;
    clientName: string;
    terms: string;
    startDate: string;
    endDate: string;
    status: string;
  } | null;
  payments: {
    id: string;
    date: string;
    amount: number;
    status: string;
    userId: string;
  }[];
}

export async function getArchitectContractData(contractId: string): Promise<ContractData> {
  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    select: {
      id: true,
      project: { select: { title: true } },
      client: { select: { name: true } },
      terms: true,
      startDate: true,
      endDate: true,
      status: true,
    },
  });
  const payments = await prisma.payment.findMany({
    where: { contractId },
    select: {
      id: true,
      date: true,
      amount: true,
      status: true,
      userId: true,
    },
  });
  return {
    contract: contract
      ? {
          id: contract.id,
          projectTitle: contract.project.title,
          clientName: contract.client.name || "Unknown",
          terms: contract.terms,
          startDate: contract.startDate.toISOString(),
          endDate: contract.endDate.toISOString(),
          status: contract.status,
        }
      : null,
    payments: payments.map((p) => ({
      id: p.id,
      date: p.date.toISOString(), 
      amount: p.amount,
      status: p.status,
      userId: p.userId,
    })),
  };
}