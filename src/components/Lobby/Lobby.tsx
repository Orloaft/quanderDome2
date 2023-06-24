import { Lobby } from "@/gameLogic/lobby";
import { ConfigView } from "../Config/ConfigView";
import ReadyBox from "./ReadyBox";
import TriviaBox from "../Trivia/TriviaView";
import PlayerView from "./PlayerView";
import { Player } from "@/gameLogic";
import { Players } from "./Players";

export const LobbyView = ({
  lobby,
  onConfigChange,
  userId,
  leaveLobby,
  socketId,
  updatePlayer,
  startGame,
}: {
  lobby: Lobby;
  updatePlayer: (e: any) => void;
  onConfigChange: any;
  userId: string;
  leaveLobby: any;
  socketId: string | null;
  startGame: () => void;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{lobby.name}</p>
      <ConfigView
        config={lobby.config}
        onChange={onConfigChange}
        isHost={userId === lobby.hostId}
      />
      <Players
        players={lobby.users}
        hostId={lobby.hostId}
        updatePlayer={updatePlayer}
        leaveLobby={leaveLobby}
      />
      {lobby.game && <TriviaBox question={lobby.game.currentQuestion} />}{" "}
      <button onClick={() => leaveLobby(userId, socketId)}>Leave lobby</button>
      {userId === lobby.hostId && <button onClick={startGame}>Start</button>}
    </div>
  );
};
