import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
import { ConfigView } from "../Config/ConfigView";

export const LobbyView = ({
  lobby,
  onConfigChange,
  userId,
  leaveLobby,
}: {
  lobby: Lobby;
  onConfigChange: any;
  userId: string;
  leaveLobby: any;
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
          <div key={user.id}>
            <p style={{ color: user.socketId ? "black" : "grey" }}>
              {user.name}
            </p>
            {userId === lobby.hostId && (
              <div
                onClick={() => {
                  leaveLobby(user.id);
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
};
