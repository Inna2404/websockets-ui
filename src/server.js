import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import express from "express";
import { handleRegistration } from "./handleRegistration";
import { handleCreateRoom } from "./handleCreateRoom";
import { handleAddUserToRoom } from "./handleAddUserToRoom";
import { handleAddShipts } from "./handleAddShipts";
import { handleAttack } from "./handleAttack";
import { handleFinish } from "./handleFinish";
import { HTTP_PORT } from "../index";

dotenv.config();
const PORT = process.env.PORT || HTTP_PORT;

const app = express();

app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`HTTP server started at http://localhost:${PORT}`);
});

export function sendMessage(ws, type, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, data }));
  } else {
    console.error("WebSocket is not open. Current state: ", ws.readyState);
  }
}
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New client connected");

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
  ws.onclose = () => {
    console.log("WebSocket connection closed");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error: ", error);
  };
});
console.log(`WebSocket server start at port ${PORT}`);
