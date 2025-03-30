import ConversationList from "@/components/common/conversation-list";
import MessageForm from "@/components/common/message-form";
import { getClientConversations } from "@/actions/client/getClientConversations";
import { sendMessage } from "@/actions/sendMessage";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase-server";
export default async function ClientMessages() {
  const cookieStore = await  cookies();

  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => {
      cookieStore.set(name, value, options);
    },
    deleteCookie: (name, options) => {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Please log in</div>;

  const conversations = await getClientConversations(user.id);
  const sampleConversation = conversations[0]; // Simplified for demo

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Messages</h1>
      <ConversationList conversations={conversations} />
      {sampleConversation && (
        <MessageForm
          conversationId={sampleConversation.id}
          onSubmit={async (data) => {
            await sendMessage({
              conversationId: sampleConversation.id,
              senderId: user.id,
              receiverId: sampleConversation.otherUser === user.user_metadata.full_name ? sampleConversation.id : sampleConversation.otherUser,
              projectId: "sampleProjectId", 
              content: data.content,
            });
          }}
        />
      )}
    </div>
  );
}