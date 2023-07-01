import { Player } from "@/gameLogic";

export const ScoreBoard = ({ players }: { players: Player[] }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {players
        .sort((a, b) => {
          if (a.points < b.points) {
            return 1;
          } else {
            return -1;
          }
        })
        .map((p) => {
          return (
            <div
              key={p.id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p>{p.name}</p>
              <p>{p.points} points</p>
            </div>
          );
        })}
    </div>
  );
};
