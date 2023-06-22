import { Lobby } from "@/gameLogic/lobbyController";
import { Socket } from "socket.io-client";

const handleSocketEvents = (
  socket: Socket,
  setData: React.Dispatch<React.SetStateAction<any>>,
  data: any
): void => {
  socket.on("get_lobbies_res", (lobbies: Lobby[]) => {
    setData({ ...data, lobbies: lobbies });
  });
  socket.on("create_lobby_message", (message: string) => {
    setData({ ...data, message: message });
  });
};

export default handleSocketEvents;
