import ContractDetails from "@/components/common/contract-detail";
import PaymentHistory from "@/components/common/payment-history";
import { getArchitectContractData } from "@/actions/architect/getArchitectContractData";

export default async function ArchitectContractDetail({
  params,
}: {
  params: { id?: string };
}) {
  if (!params?.id) {
    return (
      <div className="p-4 text-red-500">Error: Contract ID is missing.</div>
    );
  }

  try {
    const { contract, payments } = await getArchitectContractData(params.id);

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
