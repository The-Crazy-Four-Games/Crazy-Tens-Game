import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT ?? 3000);

const app = express();
app.use(cors());
app.use(express.json());

// HTTP route example
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Create ONE shared HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the same server
const io = new Server(server, {
  cors: { origin: "*" }, // dev only
});

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  socket.on("ping", () => {
    socket.emit("pong");
  });

  socket.on("disconnect", (reason) => {
    console.log("socket disconnected:", socket.id, reason);
  });
});

server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
