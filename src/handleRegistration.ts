import { WebSocket } from "ws";
import { sendMessage } from "./server";

export interface Player {
  id: string;
  name: string;
  roomId: string | null;
  ships: number[][];
  hits: number[][];
}

export const players: Record<string, Player> = {};

export function handleRegistration(
  ws: WebSocket,
  data: { id: string; name: string }
) {
  const { id, name } = data;
  if (!players[id]) {
    players[id] = { id, name, roomId: null, ships: [], hits: [] };
    sendMessage(ws, "reg", { succes: true, playerId: id });
  } else {
    sendMessage(ws, "reg", { error: "Player already registred" });
  }
}
