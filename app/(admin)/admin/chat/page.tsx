import { getConversations, getUnreadCounts } from "./actions";
import { AdminChatClient } from "@/components/admin/AdminChatClient";

export default async function ChatPage() {
  const [conversations, unread] = await Promise.all([
    getConversations(),
    getUnreadCounts(),
  ]);

  const serialized = conversations.map((c) => ({
    id:           c.id,
    status:       c.status,
    lastMessageAt: c.lastMessageAt?.toISOString() ?? c.createdAt.toISOString(),
    createdAt:    c.createdAt.toISOString(),
    bookingRef:   c.booking?.bookingRef ?? null,
    tourTitle:    c.booking?.tour.title ?? "General inquiry",
    customerName: c.customer?.name ?? c.customer?.email ?? "Customer",
    customerEmail: c.customer?.email ?? null,
    lastMessage:  c.messages[0]
      ? {
          content:    c.messages[0].content,
          senderRole: c.messages[0].senderRole,
          createdAt:  c.messages[0].createdAt.toISOString(),
          isRead:     c.messages[0].isRead,
        }
      : null,
    unreadCount: unread[c.id] ?? 0,
  }));

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      <div className="px-1 py-4 shrink-0">
        <h1 className="text-2xl font-bold text-[#111111]">Chat</h1>
        <p className="text-sm text-[#7A746D] mt-0.5">Support conversations with customers.</p>
      </div>
      <div className="flex-1 min-h-0">
        <AdminChatClient conversations={serialized} />
      </div>
    </div>
  );
}
