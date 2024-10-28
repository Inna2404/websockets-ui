import { WebSocket } from "ws";
import { players } from "./handleRegistration";
import { sendMessage } from "./server";

export function handleAddShipts(
  ws: WebSocket,
  data: { playerId: string; ships: number[][] }
) {
  const { playerId, ships } = data;

  if (players[playerId]) {
    players[playerId].ships = ships;
    sendMessage(ws, "add_ships", { success: true });
  } else {
    sendMessage(ws, "add_ships", { error: "Player not found" });
  }
}
