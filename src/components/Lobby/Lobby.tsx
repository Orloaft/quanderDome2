import { Lobby } from "@/gameLogic/lobby";
import { ConfigView } from "../Config/ConfigView";
import TriviaBox from "../Trivia/TriviaView";
import { Players } from "./Players";
import styles from "./styles.module.scss";

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
      <div className={`frame ${styles.lobbyViewContainer}`}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "3rem" }}>
            <b>{lobby.name}</b>
          </p>
        </div>
        <div className={styles.configView}>
          <ConfigView
            config={lobby.config}
            onChange={onConfigChange}
            isHost={userId === lobby.hostId}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <button
            className={styles.leaveButton}
            onClick={() => leaveLobby(userId, socketId)}
          >
            Leave lobby
          </button>
          {userId === lobby.hostId && (
            <button className={styles.startButton} onClick={startGame}>
              Start
            </button>
          )}
        </div>
      </div>
      <div className={styles.playerscontainer}>
        <Players
          players={lobby.users}
          hostId={lobby.hostId}
          updatePlayer={updatePlayer}
          leaveLobby={leaveLobby}
        />
      </div>
    </div>
  );
};
