import { Lobby } from "@/gameLogic/lobbyController";
import { User } from "@/gameLogic/playersController";
import { Socket } from "socket.io-client";

const handleSocketEvents = (
  socket: Socket,
  setData: React.Dispatch<React.SetStateAction<any>>,
  data: any
): void => {
  socket.on("add_user_res", (user: User) => {
    sessionStorage.setItem("userId", user.id);
    setData({ ...data, user: user });
  });

  socket.on("create_lobby_res", (lobby: Lobby) => {
    setData({ ...data, lobby: lobby });
  });
};

export default handleSocketEvents;
