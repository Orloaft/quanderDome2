import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import { GameMode } from "@/gameLogic/lobby";
export const Scores = ({
  players,
  mode,
}: {
  players: Player[];
  mode: GameMode;
}) => {
  return (
    <div className={styles.scores}>
      {players
        .sort((a, b) => {
          if (a.points < b.points) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((player) => {
          return (
            <div
              key={player.id}
              className="frame"
              style={{ display: "flex", flexDirection: "column" }}
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
                  width={30}
                  height={30}
                  src={player.avatar}
                  alt="Selected Image"
                />
              </div>
              <span>{player.name}</span>
              <span>
                {(mode === GameMode.DEATH_MATCH && player.life) ||
                  player.points}
              </span>
            </div>
          );
        })}
    </div>
  );
};
