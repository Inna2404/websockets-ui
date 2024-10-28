import { sendMessage } from "./server.js";
import { games } from "./handleAddUserToRoom.js";

export function handleAttack(ws, data) {
  const { roomId, attackerId, x, y } = data;
  const game = games[roomId];

  if (game) {
    const targetPlayerId =
      game.currentPlayerIndex === 0
        ? Object.keys(game.board)[1]
        : Object.keys(game.board)[0];
    const targetPlayer = game.board[targetPlayerId];

    const hit = targetPlayer.ships.some(
      (ship) => ship[0] === x && ship[1] === y
    );

    targetPlayer.hits.push([x, y]);

    if (hit) {
      sendMessage(ws, "attack", { status: "hit", x, y });
    } else {
      game.currentPlayerIndex = (game.currentPlayerIndex + 1) % 2;
      sendMessage(ws, "attack", { status: "miss", x, y });
    }
  } else {
    sendMessage(ws, "error", { message: "Game not found for room ID" });
  }
}
