import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: string;
  userId: string;
}

interface PaymentHistoryProps {
  payments: Payment[];
}

export default function PaymentHistory({ payments }: PaymentHistoryProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
            <TableCell>${payment.amount.toLocaleString()}</TableCell>
            <TableCell>{payment.status}</TableCell>
            <TableCell>{payment.userId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}