import { Lobby } from "@/gameLogic/lobbyController";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import handleSocketEvents from "./socketHandlers";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useUserContext } from "@/hooks/useUserContext";

export const LobbyList = ({
  socket,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) => {
  const user = useUserContext().user;
  const [lobbyName, setLobbyName] = useState("");
  const [data, setData] = useState<{ lobbies: Lobby[]; message: string }>({
    lobbies: [],
    message: "",
  });
  const createLobby = () => {
    socket.emit("create_lobby", lobbyName, user);
  };
  const joinLobby = (id: string) => {
    socket.emit("join_lobby", id);
  };
  useEffect(() => {
    handleSocketEvents(socket, setData, data);
  }, [socket, data]);
  const { lobbies, message } = data;
  console.log(message);
  return (
    <div>
      <h2>Lobby List</h2>
      <div>
        <input
          type="text"
          value={lobbyName}
          onChange={(e) => setLobbyName(e.target.value)}
          placeholder="Enter lobby name"
        />
        <button onClick={createLobby}>Create Lobby</button>
        <button
          onClick={() => {
            socket.emit("get_lobbies");
          }}
        >
          get lobbies
        </button>
        {message}
      </div>
      <ul>
        {lobbies.map((lobby) => (
          <li
            key={lobby.id}
            onClick={() => {
              joinLobby(lobby.id);
            }}
          >
            {lobby.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
