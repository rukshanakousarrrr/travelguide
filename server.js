import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev  = process.env.NODE_ENV !== "production";
const app  = next({ dev, turbopack: dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res));

  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: {
      origin: process.env.NEXTAUTH_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  // Store io on global so server actions can emit events
  global._io = io;

  io.on("connection", (socket) => {
    // Client joins a room named after the conversationId
    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("leave_conversation", (conversationId) => {
      socket.leave(conversationId);
    });
  });

  httpServer.listen(port, () => {
    console.log(
      `> Server ready at http://localhost:${port} [${dev ? "development" : "production"}]`
    );
  });
});
