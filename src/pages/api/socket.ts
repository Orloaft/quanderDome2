import { addUser } from "@/gameLogic/playersController";
import { verifyUsername } from "@/utils/verify";
import { Server } from "Socket.IO";

const SocketHandler = (req: any, res: any) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connect", (socket) => {
      console.log(socket.id);
      socket.on("add_user", (username: string) => {
        let verifyMsg = verifyUsername(username);
        io.to(socket.id).emit("username_msg", verifyMsg);
        if (verifyMsg === "ok") {
          io.to(socket.id).emit("add_user_res", addUser(socket.id, username));
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
