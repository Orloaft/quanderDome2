import { setLobbyData, setUserData } from "@/actions";
import { Player } from "@/gameLogic";
import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
import { store } from "@/store";
import { Socket } from "socket.io-client";
export const tearDownSocketEvents = (socket: Socket) => {
  socket.off("add_user_res");
  socket.off("leave_lobby_res");
  socket.off("enter_lobby_res");
  socket.off("update_lobby_res");
};
const handleSocketEvents = (socket: Socket): void => {
  socket.on("add_user_res", (user: User | Player) => {
    sessionStorage.setItem("userId", user.id);
    store.dispatch(setUserData(user));
  });
  socket.on("update_lobby_res", (lobby) => {
    if (lobby.isConcluded) {
      sessionStorage.removeItem("lobbyId");
    }
    const user: User | Player = lobby.users.find(
      (u: User | Player) => u.id === sessionStorage.getItem("userId")
    );
    if (user) {
      store.dispatch(setUserData(user));
    }
    store.dispatch(setLobbyData(lobby));
  });
  socket.on("leave_lobby_res", () => {
    sessionStorage.removeItem("lobbyId");
    store.dispatch(setLobbyData(null));
  });
  socket.on("enter_lobby_res", (lobby: Lobby) => {
    if (lobby) {
      sessionStorage.setItem("lobbyId", lobby.id);
      store.dispatch(setLobbyData(lobby));
    } else {
      sessionStorage.removeItem("lobbyId");
      store.dispatch(setLobbyData(lobby));
    }
  });
};

export default handleSocketEvents;
