import { Player, startGame, submitAnswer } from "@/gameLogic";
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
  updatePlayer,
} from "@/gameLogic/lobby";
import {
  User,
  addUser,
  removeUser,
  removeUserSocket,
  updateSocket,
  updateUser,
} from "@/gameLogic/users";
import { verifyLobby, verifyUsername } from "@/utils/verify";
import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      socket.on("disconnect", () => {
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
      socket.on(
        "update_player",
        (playerId: string, lobbyId: string, e: any) => {
          const updatedLobby = updatePlayer(playerId, lobbyId, e);
          if (updatedLobby) {
            io.to(lobbyId).emit("update_lobby_res", updatedLobby);
          }
        }
      );
      socket.on(
        "submit_answer",
        (lobbyId: string, playerId: string, answer: string) => {
          const updatedLobby = submitAnswer(lobbyId, playerId, answer);
          if (updatedLobby) {
            io.to(lobbyId).emit("update_lobby_res", updatedLobby);
          }
        }
      );
      socket.on("update_user", (playerId: string, e: any) => {
        const user = updateUser(playerId, e);

        if (user) {
          io.to(socket.id).emit("add_user_res", user);
        }
      });
      socket.on("start_game", async (lobbyId: string) => {
        const updatedLobby = await startGame(lobbyId, io);

        if (updatedLobby) {
          updatedLobby.users.forEach((user) => {
            user && io.to(user.socketId).emit("add_user_res", user);
          });

          io.to(lobbyId).emit("update_lobby_res", updatedLobby);
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

        if (user) {
          io.to(socket.id).emit("add_user_res", user);
        }
      });

      socket.on("add_user", (username: string) => {
        let verifyMsg = verifyUsername(username);
        io.to(socket.id).emit("username_msg", verifyMsg);
        if (verifyMsg === "Great choice") {
          io.to(socket.id).emit("add_user_res", addUser(socket.id, username));
        }
      });
      socket.on("join_lobby", (user: User, id: string) => {
        //make sure join also works for rejoin and updates socket
        const lobby = joinLobby(user, id);
        if (lobby) {
          socket.join(lobby.id);
          io.to(lobby.id).emit("enter_lobby_res", lobby);
        } else {
          io.to(socket.id).emit("enter_lobby_res", null);
        }
      });
      socket.on("get_lobbies", () => {
        let publicLobbies = lobbies.filter((lobby) => lobby.public === true);
        io.to(socket.id).emit("get_lobbies_res", publicLobbies);
      });
      socket.on("leave_lobby", (userId: string, socketId: string) => {
        const oldLobby = removeUserFromLobby(userId);
        const userSocket = io.sockets.sockets.get(socketId);
        if (oldLobby && userSocket) {
          userSocket.leave(oldLobby.id);
          io.to(oldLobby.id).emit("update_lobby_res", oldLobby);
          io.to(socketId).emit("leave_lobby_res");
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
