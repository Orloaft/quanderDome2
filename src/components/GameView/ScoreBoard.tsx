import { Player } from "@/gameLogic";

export const ScoreBoard = ({ players }: { players: Player[] }) => {
  return (
    <>
      {players.map((p) => {
        return <p key={p.id}>{p.points}</p>;
      })}
    </>
  );
};
