import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
import { ConfigView } from "../Config/ConfigView";

export const LobbyView = ({
  lobby,
  onConfigChange,
  userId,
  leaveLobby,
  socketId,
}: {
  lobby: Lobby;
  onConfigChange: any;
  userId: string;
  leaveLobby: any;
  socketId: string | null;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>{lobby.name}</p>
      <ConfigView
        config={lobby.config}
        onChange={onConfigChange}
        isHost={userId === lobby.hostId}
      />

      {lobby.users.map((u: User) => {
        return (
          <div key={u.id}>
            <p style={{ color: u.socketId ? "black" : "grey" }}>{u.name}</p>
            {userId === lobby.hostId && (
              <div
                onClick={() => {
                  console.log("kicking" + u.name);
                  leaveLobby(u.id, u.socketId);
                }}
              >
                x
              </div>
            )}
          </div>
        );
      })}
      <button onClick={() => leaveLobby(userId, socketId)}>Leave lobby</button>
    </div>
  );
};
