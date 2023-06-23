import { Lobby } from "@/gameLogic/lobby";
import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import handleSocketEvents, { tearDownSocketEvents } from "./socketHandlers";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useUserContext } from "@/hooks/useUserContext";
import Image from "next/image";
export const LobbyList = ({
  socket,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) => {
  let lobbyId = sessionStorage.getItem("lobbyId");
  const user = useUserContext().user;
  const [lobbyName, setLobbyName] = useState("");
  const [data, setData] = useState<{ lobbies: Lobby[]; message: string }>({
    lobbies: [],
    message: "",
  });
  const createLobby = () => {
    socket.emit("create_lobby", lobbyName, user);
  };
  const joinLobby = useCallback(
    (id: string) => {
      socket.emit("join_lobby", user, id);
    },
    [socket, user]
  );
  useEffect(() => {
    handleSocketEvents(socket, setData, data);
    if (lobbyId) {
      joinLobby(lobbyId);
    } else {
      socket.emit("get_lobbies");
    }

    return () => {
      socket && tearDownSocketEvents(socket);
    };
  }, [socket, data, joinLobby, lobbyId]);
  const { lobbies, message } = data;

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

        <Image
          onClick={() => {
            socket.emit("get_lobbies");
          }}
          height={15}
          width={15}
          src="/refresh.svg"
          alt="Refresh"
        />
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
