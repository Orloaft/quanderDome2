import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
export const Scores = ({ players }: { players: Player[] }) => {
  return (
    <div className={styles.scores}>
      {players.map((player) => {
        return (
          <div key={player.id}>
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
            <span>{player.points}</span>
          </div>
        );
      })}
    </div>
  );
};
