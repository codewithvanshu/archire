import ContractDetails from "@/components/common/contract-detail";
import PaymentHistory from "@/components/common/payment-history";
import { getClientContractData } from "@/actions/client/getClientContractData";

export default async function ClientContractDetail({
  params,
}: {
  params: { id: string };
}) {
  
  const { contract, payments } = await getClientContractData(params.id);

  if (!contract) return <div>Contract not found</div>;

  return (
    <div className="p-4">
      <ContractDetails contract={contract} />
      <PaymentHistory payments={payments} />
    </div>
  );
}
