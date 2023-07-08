import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import { GameMode } from "@/gameLogic/lobby";
import { useSelector } from "react-redux";
import { LobbyState } from "@/actions/types";
export const Scores = ({ style }: { style?: any }) => {
  const lobby = useSelector((state: any) => state.lobby.lobbyData);

  return (
    <div className={styles.scores} style={style}>
      {lobby.users
        .sort((a: Player, b: Player) => {
          if (a.points < b.points) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((player: Player) => {
          return (
            <div
              key={player.id}
              className="frame"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              {" "}
              <div
                style={{
                  border: `4px solid ${player.color}`,
                  padding: 0,
                  borderRadius: "4px",
                  width: "fit-content",
                  opacity: `${player.socketId ? `1` : `.4`}`,
                }}
              >
                <Image
                  width={60}
                  height={60}
                  src={player.avatar}
                  alt="Selected Image"
                />
              </div>
              <span>{player.name}</span>
              <span>
                {(lobby.config.mode === GameMode.DEATH_MATCH && player.life) ||
                  player.points}
              </span>
            </div>
          );
        })}
    </div>
  );
};
