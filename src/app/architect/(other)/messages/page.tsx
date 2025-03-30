import ConversationList from "@/components/common/conversation-list";
import MessageForm from "@/components/common/message-form";
import { getArchitectConversations } from "@/actions/architect/getArchitectConversations";
import { sendMessage } from "@/actions/sendMessage";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

export default async function ArchitectMessages() {
  const cookieStore = await cookies();

  const supabase = createSupabaseServerClient({
    getCookie: (name) => cookieStore.get(name)?.value,
    setCookie: (name, value, options) => {
      cookieStore.set(name, value, options);
    },
    deleteCookie: (name, options) => {
      cookieStore.set(name, "", { ...options, maxAge: 0 });
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <div>Please log in</div>;

  const conversations = await getArchitectConversations(user.id);
  const sampleConversation = conversations[0]; 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Architect Messages</h1>
      <ConversationList conversations={conversations} />
      {sampleConversation && (
        <MessageForm
          conversationId={sampleConversation.id}
          onSubmit={async (data) => {
            "use server";
            await sendMessage({
              conversationId: sampleConversation.id,
              senderId: user.id,
              receiverId:
                sampleConversation.otherUser === user.email
                  ? sampleConversation.id
                  : sampleConversation.otherUser,
              projectId: "sampleProjectId",
              content: data.content,
            });
          }}
        />
      )}
    </div>
  );
}
