import { WebSocket } from "ws";
import { players } from "./handleRegistration";
import { sendMessage } from "./server";

export interface Room {
  id: string;
  players: string[];
}

export const rooms: Record<string, Room> = {};

export function handleCreateRoom(
  ws: WebSocket,
  data: { roomId: string; playerId: string }
) {
  const { roomId, playerId } = data;

  if (!rooms[roomId]) {
    rooms[roomId] = { id: roomId, players: [playerId] };
    players[playerId].roomId = roomId;
    sendMessage(ws, "create_room", { success: true, roomId });
  } else {
    sendMessage(ws, "create_room", { error: "Room already exists" });
  }
}
