import { players } from "./handleRegistration.js";
import { rooms } from "./handleCreateRoom.js";
import { sendMessage } from "./server.js";

export const games = {};

export function handleAddUserToRoom(ws, data) {
  const { roomId, playerId } = data;

  if (!rooms[roomId] || rooms[roomId].players.length >= 2) {
    return sendMessage(ws, "add_user_to_room", {
      error: "Room is full or does not exist"
    });
  }

  rooms[roomId].players.push(playerId);
  players[playerId].roomId = roomId;

  if (rooms[roomId].players.length === 2) {
    startGame(roomId);
  }
}

function startGame(roomId) {
  const game = {
    roomId,
    currentPlayerIndex: 0,
    board: {
      [rooms[roomId].players[0]]: players[rooms[roomId].players[0]],
      [rooms[roomId].players[1]]: players[rooms[roomId].players[1]]
    }
  };
  games[roomId] = game;

  const clients = getClientsInRoom(roomId);
  clients.forEach((client) => {
    sendMessage(client, "start_game", { roomId, game });
  });
}

function getClientsInRoom(roomId) {
  return [];
}
