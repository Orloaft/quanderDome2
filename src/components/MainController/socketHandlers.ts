import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
import { Socket } from "socket.io-client";
export const tearDownSocketEvents = (socket: Socket) => {
  socket.off("add_user_res");
  socket.off("leave_lobby_res");
  socket.off("enter_lobby_res");
  socket.off("update_lobby_res");
};
const handleSocketEvents = (
  socket: Socket,
  setData: React.Dispatch<React.SetStateAction<any>>,
  data: any
): void => {
  socket.on("add_user_res", (user: User) => {
    sessionStorage.setItem("userId", user.id);
    setData({ ...data, user: user });
  });
  socket.on("update_lobby_res", (lobby) => {
    setData({ ...data, lobby: lobby });
  });
  socket.on("leave_lobby_res", () => {
    sessionStorage.removeItem("lobbyId");
    setData({ ...data, lobby: null });
  });
  socket.on("enter_lobby_res", (lobby: Lobby) => {
    if (lobby) {
      sessionStorage.setItem("lobbyId", lobby.id);
      setData({ ...data, lobby: lobby });
    } else {
      sessionStorage.removeItem("lobbyId");
      setData({ ...data, lobby: lobby });
    }
  });
};

export default handleSocketEvents;
