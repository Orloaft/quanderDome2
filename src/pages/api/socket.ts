import { createLobby, lobbies } from "@/gameLogic/lobbyController";
import {
  User,
  addUser,
  removeUser,
  removeUserSocket,
  updateSocket,
} from "@/gameLogic/playersController";
import { verifyLobby, verifyUsername } from "@/utils/verify";
import { Server } from "Socket.IO";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
        removeUserSocket(socket.id);
      });
      socket.on("remove_user", (id: string) => {
        removeUser(id);
      });
      socket.on("reconnect_user", (id: string) => {
        console.log("reconnecting");
        const user = updateSocket(id, socket.id);
        user && io.to(socket.id).emit("add_user_res", user);
      });
      socket.on("add_user", (username: string) => {
        let verifyMsg = verifyUsername(username);
        io.to(socket.id).emit("username_msg", verifyMsg);
        if (verifyMsg === "Great choice") {
          console.log("adding user");
          io.to(socket.id).emit("add_user_res", addUser(socket.id, username));
        }
      });
      socket.on("get_lobbies", () => {
        io.to(socket.id).emit("get_lobbies_res", lobbies);
      });
      socket.on("create_lobby", (name: string, host: User) => {
        console.log(host);
        const verifyMsg: string = verifyLobby(name);
        io.to(socket.id).emit("create_lobby_message", verifyMsg);
        if (verifyMsg === "Great choice") {
          io.to(socket.id).emit("create_lobby_res", createLobby(host, name));
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
