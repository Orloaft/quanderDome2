import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import ChatInput from "./ChatInput";
import { connect, useSelector } from "react-redux";
import useSocket from "@/hooks/useSocket";
import { Lobby } from "@/gameLogic/lobby";

export interface ChatMessage {
  userName: string;
  message: string;
}

const ChatBox: React.FC<any> = ({
  username,
  lobby,
  socket,
}: {
  username: string;
  lobby: Lobby;
  socket: any;
}) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const sendMessage = (message: string) => {
    socket.emit("send_message", lobby.id, username, message);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [lobby.chat]);

  return (
    <div>
      <div className={styles.chatBoxContainer} ref={chatBoxRef}>
        {lobby.chat.map((msg: any, i: number) => (
          <div key={i} className={styles.messageContainer}>
            <strong className={styles.userName}>{msg.userName}: </strong>
            <span className={styles.message}>{msg.message}</span>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  username: state.user.userData.name,
  lobby: state.lobby.lobbyData,
});

export default connect(mapStateToProps)(ChatBox);
