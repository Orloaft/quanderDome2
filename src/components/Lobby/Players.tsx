import { Player } from "@/gameLogic";
import { memo } from "react";
import PlayerView from "./PlayerView";
import { useUserContext } from "@/hooks/useUserContext";
import { PlayerCard } from "./PlayerCard";

export const Players = memo(function Players({
  players,
  updatePlayer,
  leaveLobby,
  hostId,
}: {
  players: Player[];
  hostId: string;
  updatePlayer: (e: any) => void;
  leaveLobby: (userId: string, socketId: string) => void;
}) {
  let user = useUserContext().user as Player;
  return players.map((u: Player) => {
    return (
      <div key={u.id}>
        <p style={{ color: u.socketId ? u.color : "grey" }}>{u.name}</p>
        <PlayerCard player={u} updatePlayer={updatePlayer} />

        {user.id === hostId && u.id !== user.id && (
          <div
            onClick={() => {
              leaveLobby(u.id, u.socketId);
            }}
          >
            x
          </div>
        )}
      </div>
    );
  });
});
