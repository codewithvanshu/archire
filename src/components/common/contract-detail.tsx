interface Contract {
  id: string;
  projectTitle: string;
  architectName?: string;
  clientName?: string;
  terms: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface ContractDetailsProps {
  contract: Contract;
}

export default function ContractDetails({ contract }: ContractDetailsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{contract.projectTitle}</h1>
      {contract.architectName && <p><strong>Architect:</strong> {contract.architectName}</p>}
      {contract.clientName && <p><strong>Client:</strong> {contract.clientName}</p>}
      <p><strong>Terms:</strong> {contract.terms}</p>
      <p><strong>Start Date:</strong> {new Date(contract.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(contract.endDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {contract.status}</p>
    </div>
  );
}