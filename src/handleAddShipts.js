import { players } from "./handleRegistration.js";
import { sendMessage } from "./server.js";

export function handleAddShipts(ws, data) {
  const { playerId, ships } = data;

  if (players[playerId]) {
    players[playerId].ships = ships;
    sendMessage(ws, "add_ships", { success: true });
  } else {
    sendMessage(ws, "add_ships", { error: "Player not found" });
  }
}
