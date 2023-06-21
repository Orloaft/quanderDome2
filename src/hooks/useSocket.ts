import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketInitializer = () => Promise<
  Socket<DefaultEventsMap, DefaultEventsMap>
>;

const useSocket = (): [Socket | null, SocketInitializer] => {
  const socketRef = useRef<Socket | null>(null);

  const socketInitializer: SocketInitializer = async () => {
    await fetch("/api/socket");
    socketRef.current = io();

    return socketRef.current;
  };

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return [socketRef.current, socketInitializer];
};

export default useSocket;
