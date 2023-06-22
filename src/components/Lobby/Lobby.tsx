import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";

export const LobbyView = ({ lobby }: { lobby: Lobby }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{lobby.name}</p>
      {lobby.users.map((user: User) => {
        return (
          <p key={user.id} style={{ color: user.socketId ? "black" : "grey" }}>
            {user.name}
          </p>
        );
      })}
    </div>
  );
};
