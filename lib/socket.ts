import type { Server } from "socket.io";

// Extend global to hold the Socket.io server instance
declare global {
  // eslint-disable-next-line no-var
  var _io: Server | undefined;
}

/**
 * Returns the Socket.io server instance attached in server.js.
 * Call this from server actions to emit real-time events.
 */
export function getIO(): Server | null {
  return global._io ?? null;
}

/**
 * Emit a new message to all clients in a conversation room.
 */
export function emitNewMessage(
  conversationId: string,
  message: {
    id:         string;
    senderName: string;
    senderRole: string;
    content:    string;
    createdAt:  Date;
    isRead:     boolean;
  }
) {
  const io = getIO();
  if (!io) return;
  io.to(conversationId).emit("new_message", {
    ...message,
    createdAt: message.createdAt.toISOString(),
  });
}
