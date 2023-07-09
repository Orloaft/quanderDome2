import { Player } from "@/gameLogic";
import { GameMode } from "@/gameLogic/lobby";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
export const PlayerScore = ({
  player,
  mode,
}: {
  player: Player;
  mode: GameMode;
}) => {
  const prevPlayerRef = useRef(0);
  const [pointChange, setPointChange] = useState<string | null>(null);
  useEffect(() => {
    // Compare previous and current values of the prop
    if (prevPlayerRef.current !== player.points) {
      // Perform actions based on the change
      console.log(
        "myProp has changed:",
        prevPlayerRef.current,
        "->",
        player.points
      );
      setPointChange(`+${player.points - prevPlayerRef.current}`);
      setTimeout(() => {
        setPointChange(null);
      }, 1000);
    }

    // Update the ref with the current prop value for the next comparison
    prevPlayerRef.current = player.points;
  }, [player.points]);

  return (
    <div
      className="frame"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        position: "relative",
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
        {(mode === GameMode.DEATH_MATCH && player.life) || player.points}
      </span>
      {pointChange && <span className={styles.pointChange}>{pointChange}</span>}
    </div>
  );
};
