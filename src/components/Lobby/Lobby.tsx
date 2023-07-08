import { Lobby } from "@/gameLogic/lobby";
import { ConfigView } from "../Config/ConfigView";
import TriviaBox from "../Trivia/TriviaView";
import { Players } from "./Players";
import styles from "./styles.module.scss";
import ChatBox from "../Chat/Chat";

export const LobbyView = ({
  lobby,
  onConfigChange,
  userId,
  leaveLobby,
  socket,
  updatePlayer,
  startGame,
}: {
  lobby: Lobby;
  updatePlayer: (e: any) => void;
  onConfigChange: any;
  userId: string;
  leaveLobby: any;
  socket: any;
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <button
              className={styles.leaveButton}
              onClick={() => leaveLobby(userId, socket.id)}
            >
              Leave lobby
            </button>
            {userId === lobby.hostId && (
              <button
                className={styles.startButton}
                style={{
                  backgroundColor:
                    lobby.users.find((user) => user.isReady === false) !==
                    undefined
                      ? "black"
                      : "",
                }}
                onClick={startGame}
                disabled={
                  lobby.users.find((user) => user.isReady === false) !==
                  undefined
                }
              >
                Start
              </button>
            )}
          </div>
        </div>

        <ChatBox socket={socket} />
      </div>
      <div className={styles.playerscontainer}>
        <Players
          teams={lobby.config.teams}
          players={lobby.users}
          hostId={lobby.hostId}
          updatePlayer={updatePlayer}
          leaveLobby={leaveLobby}
        />
      </div>
    </div>
  );
};
