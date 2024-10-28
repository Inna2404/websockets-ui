import { players } from "./handleRegistration";
import { sendMessage } from "./server.js";

export const rooms = {};

export function handleCreateRoom(ws, data) {
  const { roomId, playerId } = data;

  if (!rooms[roomId]) {
    rooms[roomId] = { id: roomId, players: [playerId] };
    players[playerId].roomId = roomId;
    sendMessage(ws, "create_room", { success: true, roomId });
  } else {
    sendMessage(ws, "create_room", { error: "Room already exists" });
  }
}
