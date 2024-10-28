import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { handleRegistration } from "./handleRegistration";
import { handleCreateRoom } from "./handleCreateRoom";
import { handleAddUserToRoom } from "./handleAddUserToRoom";
import { handleAddShipts } from "./handleAddShipts";
import { handleAttack } from "./handleAttack";
import { handleFinish } from "./handleFinish";
import { HTTP_PORT } from "../index";

dotenv.config();
const PORT = process.env.PORT || HTTP_PORT;
const wss = new WebSocketServer({ port: Number(PORT) });

export function sendMessage(ws: WebSocket, type: string, data: any) {
  ws.send(JSON.stringify({ type, data }));
}

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message.toString());

    switch (type) {
      case "reg":
        handleRegistration(ws, data);
        break;
      case "create_room":
        handleCreateRoom(ws, data);
        break;

      case "add_user_to_room":
        handleAddUserToRoom(ws, data);
        break;

      case "add_shipts":
        handleAddShipts(ws, data);
        break;

      case "attack":
        handleAttack(ws, data);
        break;
      case "finish":
        handleFinish(ws, data);
        break;
      default:
        sendMessage(ws, "error", { message: "Unknown command" });
    }
  });
});
console.log(`WebSocket server start at port ${PORT}`);
