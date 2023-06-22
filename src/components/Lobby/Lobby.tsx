import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
import { ConfigView } from "../Config/ConfigView";

export const LobbyView = ({
  lobby,
  onConfigChange,
  userId,
}: {
  lobby: Lobby;
  onConfigChange: any;
  userId: string;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{lobby.name}</p>
      <ConfigView
        config={lobby.config}
        onChange={onConfigChange}
        isHost={userId === lobby.hostId}
      />
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
