import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import handleSocketEvents, { tearDownSocketEvents } from "./socketHandlers";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useUserContext } from "@/hooks/useUserContext";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Lobby } from "@/gameLogic/lobby";
import { UserState } from "@/actions/types";
import { useSelector } from "react-redux";

export const LobbyList = ({
  socket,
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) => {
  let lobbyId = sessionStorage.getItem("lobbyId");
  const user = useSelector((state: any) => state.user.userData);
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
    <div className={` ${styles.lobbyListContainer}`}>
      <div className="frame">
        <h2 style={{ textAlign: "center" }}>Lobby List</h2>
        <div className={styles.lobbyInput}>
          <input
            type="text"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            placeholder="Enter lobby name"
          />{" "}
          <Image
            onClick={() => {
              socket.emit("get_lobbies");
            }}
            height={25}
            width={25}
            src="/refresh.svg"
            alt="Refresh"
            className={styles.refreshIcon}
          />
          <button onClick={createLobby}>Create Lobby</button>
          {message && (
            <div
              className="frame"
              style={{ position: "absolute", bottom: "-100%" }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      <ul>
        {lobbies.map((lobby) => (
          <li
            key={lobby.id}
            onClick={() => {
              joinLobby(lobby.id);
            }}
            className="frame"
          >
            {lobby.name} {lobby.users.length}/8
          </li>
        ))}
      </ul>
    </div>
  );
};
