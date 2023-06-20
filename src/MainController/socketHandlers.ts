import { Socket } from "socket.io-client";

const handleSocketEvents = (
  socket: Socket,
  setData: React.Dispatch<React.SetStateAction<any>>
): void => {
  socket.on("event1", (data: any) => {
    // Handle event1 logic
    setData(data);
  });

  // Add more socket event handlers as needed
};

export default handleSocketEvents;
