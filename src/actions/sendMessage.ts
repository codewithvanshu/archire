"use server";

import { prisma } from "@/lib/prisma";

export async function sendMessage({
  conversationId,
  senderId,
  receiverId,
  projectId,
  content,
}: {
  conversationId: string;
  senderId: string;
  receiverId: string;
  projectId: string;
  content: string;
}) {
  return await prisma.conversation.upsert({
    where: { id: conversationId },
    update: { lastMessage: content, timestamp: new Date() },
    create: {
      id: conversationId,
      senderId,
      receiverId,
      projectId,
      lastMessage: content,
    },
  });
}