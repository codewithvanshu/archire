import { notFound } from "next/navigation"; // For 404 handling
import ContractDetails from "@/components/common/contract-detail";
import PaymentHistory from "@/components/common/payment-history";
import { getArchitectContractData } from "@/actions/architect/getArchitectContractData";

// Define the props type explicitly to match Next.js expectations
interface PageProps {
  params: { id: string };
}

export default async function ArchitectContractDetail({ params }: PageProps) {
  try {
    const { contract, payments } = await getArchitectContractData(params.id);

    if (!contract) {
      notFound(); // Use Next.js's notFound() for a proper 404 response
    }

    return (
      <div className="p-4">
        <ContractDetails contract={contract} />
        <PaymentHistory payments={payments} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching contract data:", error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>Failed to load contract details. Please try again later.</p>
      </div>
    );
  }
}

// Optional: Metadata for SEO (if needed)
export const metadata = {
  title: "Architect Contract Details",
  description: "View contract details and payment history for architects.",
};