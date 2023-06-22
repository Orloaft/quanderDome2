import { useCallback, useEffect, useState } from "react";
import SignInView from "../SignIn/SignIn";
import useSocket from "@/hooks/useSocket";
import { UserContext, useUserContext } from "@/hooks/useUserContext";
import handleSocketEvents, { tearDownSocketEvents } from "./socketHandlers";
import { User } from "@/gameLogic/users";
import { DashBoard } from "../DashBoard/DashBoard";
import { LobbyList } from "../LobbyList/LobbyList";
import { Player } from "@/gameLogic";
import { Lobby } from "@/gameLogic/lobby";
import { LobbyView } from "../Lobby/Lobby";
import ChatBox from "../Chat/Chat";
import ChatInput from "../Chat/ChatInput";

export const MainController = () => {
  const [socket, socketInitializer] = useSocket();
  const [data, setData] = useState<{
    user: User | Player | null;
    isConnected: boolean;
    lobby: Lobby | null;
  }>({ user: null, isConnected: false, lobby: null });
  const { user, isConnected, lobby } = data;
  const signIn = (name: string) => {
    socket?.emit("add_user", name);
  };
  const sendMessage = (message: string) => {
    socket?.emit("send_message", lobby?.id, user?.name, message);
  };
  const signOut = () => {
    user && socket?.emit("remove_user", user.id);
    sessionStorage.removeItem("userId");
    setData({ ...data, user: null });
  };
  const handleSocketInitialization = useCallback(async () => {
    let socket = await socketInitializer();
    if (socket) {
      setData({ ...data, isConnected: true });
    }
  }, [socketInitializer, data]);
  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (socket) {
      handleSocketEvents(socket, setData, data);
      if (!user && userId) {
        socket.emit("reconnect_user", userId);
      }
    } else {
      handleSocketInitialization();
    }
    return () => {
      socket && tearDownSocketEvents(socket);
    };
  }, [socket, handleSocketInitialization, user, data]);
  return (
    <UserContext.Provider value={{ user }}>
      {(user && socket && !lobby && (
        <>
          <DashBoard signOut={signOut} />
          <LobbyList socket={socket} />
        </>
      )) ||
        (lobby && (
          <>
            <LobbyView lobby={lobby} />
            <ChatBox messages={lobby.chat} />
            <ChatInput onSendMessage={sendMessage} />
            <button
              onClick={() => {
                user && socket?.emit("leave_lobby", user.id);
              }}
            >
              leave lobby
            </button>
          </>
        )) ||
        (isConnected && (
          <SignInView socket={socket} handleSubmit={signIn} />
        )) || <p>please wait...</p>}
    </UserContext.Provider>
  );
};
