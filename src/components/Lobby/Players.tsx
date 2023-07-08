import { Player } from "@/gameLogic";
import { memo } from "react";
import { useUserContext } from "@/hooks/useUserContext";
import { PlayerCard } from "./PlayerCard";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
export const Players = memo(function Players({
  players,
  updatePlayer,
  leaveLobby,
  hostId,
  teams,
}: {
  teams: boolean;
  players: Player[];
  hostId: string;
  updatePlayer: (e: any) => void;
  leaveLobby: (userId: string, socketId: string) => void;
}) {
  const user = useSelector((state: any) => state.user.userData);
  return (
    <div className={styles.players}>
      {players.map((u: Player) => {
        return (
          <div
            key={u.id}
            className={styles.playerCard}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ color: u.socketId ? u.color : "grey" }}>{u.name}</p>
            <PlayerCard player={u} updatePlayer={updatePlayer} teams={teams} />

            {user.id === hostId && u.id !== user.id && (
              <div
                style={{ cursor: "default" }}
                onClick={() => {
                  leaveLobby(u.id, u.socketId);
                }}
              >
                x
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
