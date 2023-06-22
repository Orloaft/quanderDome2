import {
  GameConfig,
  Lobby,
  createLobby,
  getUpdatedLobby,
  joinLobby,
  lobbies,
  removeUserFromLobby,
  sendLobbyMessage,
  updateConfig,
  updateSocketInLobby,
} from "@/gameLogic/lobby";
import {
  User,
  addUser,
  removeUser,
  removeUserSocket,
  updateSocket,
} from "@/gameLogic/users";
import { verifyLobby, verifyUsername } from "@/utils/verify";
import { Server } from "Socket.IO";
import { LanguageServiceMode } from "typescript";

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
        let lobby: Lobby | null = getUpdatedLobby(socket.id);
        if (lobby) {
          io.to(lobby.id).emit("update_lobby_res", lobby);
        }
      });
      socket.on("send_message", (lobbyId, username, message) => {
        let lobby = sendLobbyMessage(lobbyId, username, message);

        if (lobby) {
          io.to(lobby.id).emit("update_lobby_res", lobby);
        }
      });
      socket.on("update_config", (lobbyId: string, config: GameConfig) => {
        const updatedLobby = updateConfig(lobbyId, config);
        if (updatedLobby) {
          io.to(lobbyId).emit("update_lobby_res", updatedLobby);
        }
      });
      socket.on("remove_user", (id: string) => {
        removeUser(id);
      });
      socket.on("reconnect_user", (id: string) => {
        const user = updateSocket(id, socket.id);
        user && io.to(socket.id).emit("add_user_res", user);
        const lobby = updateSocketInLobby(id, socket.id);

        if (lobby) {
          socket.join(lobby.id);

          io.to(lobby.id).emit("update_lobby_res", lobby);
        }
      });
      socket.on("add_user", (username: string) => {
        let verifyMsg = verifyUsername(username);
        io.to(socket.id).emit("username_msg", verifyMsg);
        if (verifyMsg === "Great choice") {
          console.log("adding user");
          io.to(socket.id).emit("add_user_res", addUser(socket.id, username));
        }
      });
      socket.on("join_lobby", (user: User, id: string) => {
        const lobby = joinLobby(user, id);
        if (lobby) {
          socket.join(lobby.id);
          io.to(lobby.id).emit("enter_lobby_res", lobby);
        }
      });
      socket.on("get_lobbies", () => {
        io.to(socket.id).emit("get_lobbies_res", lobbies);
      });
      socket.on("leave_lobby", (userId: string) => {
        const oldLobby = removeUserFromLobby(userId);

        if (oldLobby) {
          socket.leave(oldLobby.id);
          io.to(oldLobby.id).emit("update_lobby_res", oldLobby);
          io.to(socket.id).emit("leave_lobby_res");
        }
      });
      socket.on("create_lobby", (name: string, host: User) => {
        const verifyMsg: string = verifyLobby(name);
        io.to(socket.id).emit("create_lobby_message", verifyMsg);
        if (verifyMsg === "Great choice") {
          let newLobby = createLobby(host, name);
          socket.join(newLobby.id);
          io.to(socket.id).emit("enter_lobby_res", newLobby);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
