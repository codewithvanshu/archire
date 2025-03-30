import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Proposal {
  id: string;
  projectTitle: string;
  architectName?: string;
  estimatedCost: number;
  status: string;
}

interface ProposalListProps {
  proposals: Proposal[];
}

export default function ProposalList({ proposals }: ProposalListProps) {
  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <CardTitle>{proposal.projectTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Architect:</strong> {proposal.architectName || "N/A"}</p>
            <p><strong>Estimated Cost:</strong> ${proposal.estimatedCost.toLocaleString()}</p>
            <p><strong>Status:</strong> {proposal.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}