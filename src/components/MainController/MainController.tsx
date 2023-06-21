import { useCallback, useEffect, useState } from "react";
import SignInView from "../SignIn/SignIn";
import useSocket from "@/hooks/useSocket";
import { UserContext, useUserContext } from "@/hooks/useUserContext";
import handleSocketEvents from "./socketHandlers";
import { User } from "@/gameLogic/playersController";
import { DashBoard } from "../DashBoard/DashBoard";

export const MainController = () => {
  const [socket, socketInitializer] = useSocket();
  const [user, setUser] = useState<User>();
  const [isConnected, setIsConnected] = useState(false);
  const signIn = (name: string) => {
    socket?.emit("add_user", name);
  };
  const handleSocketInitialization = useCallback(async () => {
    let socket = await socketInitializer();
    if (socket) {
      setIsConnected(true);
    }
  }, [socketInitializer]);
  useEffect(() => {
    if (socket) {
      handleSocketEvents(socket, setUser);
    } else {
      handleSocketInitialization();
    }
  }, [socket, handleSocketInitialization]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {(user && <DashBoard />) ||
        (isConnected && (
          <SignInView socket={socket} handleSubmit={signIn} />
        )) || <p>please wait...</p>}
    </UserContext.Provider>
  );
};
