import ContractDetails from "@/components/common/contract-detail";
import PaymentHistory from "@/components/common/payment-history";
import { getArchitectContractData } from "@/actions/architect/getArchitectContractData";

export default async function ArchitectContractDetail({ params }: { params: { id: string } }) {
  const { contract, payments } = await getArchitectContractData(params.id);

  if (!contract) return <div>Contract not found</div>;

  return (
    <div className="p-4">
      <ContractDetails contract={contract} />
      <PaymentHistory payments={payments} />
    </div>
  );
}