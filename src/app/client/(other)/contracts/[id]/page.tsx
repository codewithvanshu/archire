import ContractDetails from "@/components/common/contract-detail";
import PaymentHistory from "@/components/common/payment-history";
import { getClientContractData } from "@/actions/client/getClientContractData";
import { notFound } from "next/navigation";

// Define the props type explicitly to match Next.js expectations
interface ArchitectContractDetailProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ClientContractDetail({
  params,
}: ArchitectContractDetailProps) {
  if (!params?.id) {
    notFound();
  }

  try {
    const { contract, payments } = await getClientContractData(params.id);

    if (!contract) {
      return <div className="p-4 text-red-500">Contract not found.</div>;
    }

    return (
      <div className="p-4">
        <ContractDetails contract={contract} />
        <PaymentHistory payments={payments} />
      </div>
    );
  } catch {
    return (
      <div className="p-4 text-red-500">Error loading contract details.</div>
    );
  }
}

// Optional: Metadata for SEO (if needed)
export const metadata = {
  title: "Architect Contract Details",
  description: "View contract details and payment history for architects.",
};
