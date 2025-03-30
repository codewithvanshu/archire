"use server";
import { prisma } from "@/lib/prisma";

// Define or import the Conversation type
interface Conversation {
  id: string;
  otherUser: string;
  lastMessage: string | null;
}

export async function getArchitectConversations(architectId: string): Promise<Conversation[]> {
  const conversations = await prisma.conversation.findMany({
    where: { OR: [{ senderId: architectId }, { receiverId: architectId }] },
    select: {
      id: true,
      sender: { select: { name: true } },
      receiver: { select: { name: true } },
      lastMessage: true,
      senderId: true, // Explicitly select senderId
      receiverId: true, // Explicitly select receiverId
    },
  });
  return conversations.map((c) => ({
    id: c.id,
    otherUser: c.senderId === architectId ? c.receiver.name || "Unknown" : c.sender.name || "Unknown",
    lastMessage: c.lastMessage,
  }));
}