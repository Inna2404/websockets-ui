import { WebSocket } from "ws";
import { sendMessage } from "./server";
import { games } from "./handleAddUserToRoom";

export function handleFinish(
  ws: WebSocket,
  data: { roomId: string; winnerId: string }
) {
  const { roomId, winnerId } = data;

  if (games[roomId]) {
    sendMessage(ws, "finish", { success: true, winnerId });
    delete games[roomId];
  } else {
    sendMessage(ws, "finish", { error: "Game not found" });
  }
}
