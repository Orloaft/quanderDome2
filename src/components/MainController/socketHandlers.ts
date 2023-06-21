import { Socket } from "socket.io-client";

const handleSocketEvents = (
  socket: Socket,
  setData: React.Dispatch<React.SetStateAction<any>>
): void => {
  socket.on("add_user_res", (data: any) => {
    setData(data);
  });

  // Add more socket event handlers as needed
};

export default handleSocketEvents;
