import { WebSocket } from "ws";
import { players, Player } from "./handleRegistration";
import { rooms } from "./handleCreateRoom";
import { sendMessage } from "./server";

interface Game {
  roomId: string;
  currentPlayerIndex: number;
  board: Record<string, Player>;
}

export const games: Record<string, Game> = {};

export function handleAddUserToRoom(
  ws: WebSocket,
  data: { roomId: string; playerId: string }
) {
  const { roomId, playerId } = data;

  if (rooms[roomId] && rooms[roomId].players.length < 2) {
    rooms[roomId].players.push(playerId);
    players[playerId].roomId = roomId;

    if (rooms[roomId].players.length === 2) {
      startGame(roomId);
    }
  } else {
    sendMessage(ws, "add_user_to_room", {
      error: "Room is full or does not exist"
    });
  }
}

function startGame(roomId: string) {
  const game: Game = {
    roomId,
    currentPlayerIndex: 0,
    board: {
      [rooms[roomId].players[0]]: players[rooms[roomId].players[0]],
      [rooms[roomId].players[1]]: players[rooms[roomId].players[1]]
    }
  };
  games[roomId] = game;

  const clients: WebSocket[] = getClientsInRoom(roomId);
  clients.forEach((client) => {
    sendMessage(client, "start_game", { roomId, game });
  });
}

function getClientsInRoom(roomId: string): WebSocket[] {
  return [];
}
