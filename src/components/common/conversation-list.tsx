import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Conversation {
  id: string;
  otherUser: string;
  lastMessage: string | null;
}

interface ConversationListProps {
  conversations: Conversation[];
}

export default function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Card key={conversation.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/conversations/${conversation.id}`} className="hover:underline">
                {conversation.otherUser}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{conversation.lastMessage}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}