import { sendMessage } from "./server";
import { games } from "./handleAddUserToRoom";

export function handleFinish(ws, data) {
  const { roomId, winnerId } = data;

  if (games[roomId]) {
    sendMessage(ws, "finish", { success: true, winnerId });
    delete games[roomId];
  } else {
    sendMessage(ws, "finish", { error: "Game not found" });
  }
}
