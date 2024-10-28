import { WebSocket } from "ws";
import { sendMessage } from "./server.js";

export const players = {};

export function handleRegistration(ws, data) {
  const { id, name } = data;
  if (!players[id]) {
    players[id] = { id, name, roomId: null, ships: [], hits: [] };
    sendMessage(ws, "reg", { success: true, playerId: id });
  } else {
    sendMessage(ws, "reg", { error: "Player already registered" });
  }
}
