import { Player } from "@/gameLogic";
import Image from "next/image";
import styles from "./styles.module.scss";
import { GameMode } from "@/gameLogic/lobby";
import { useSelector } from "react-redux";
import { LobbyState } from "@/actions/types";
import { PlayerScore } from "./PlayerScore";
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
            <PlayerScore
              key={player.id}
              player={player}
              mode={lobby.config.mode}
            />
          );
        })}
    </div>
  );
};
