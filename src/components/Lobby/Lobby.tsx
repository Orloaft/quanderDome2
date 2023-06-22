import { Lobby } from "@/gameLogic/lobbyController";

export const LobbyView = ({ lobby }: { lobby: Lobby }) => {
  return <>{lobby.name}</>;
};
