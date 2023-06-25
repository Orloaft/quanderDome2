import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export interface ChatMessage {
  userName: string;
  message: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.chatBoxContainer} ref={chatBoxRef}>
      {messages.map((msg, i) => (
        <div key={i} className={styles.messageContainer}>
          <strong className={styles.userName}>{msg.userName}: </strong>
          <span className={styles.message}>{msg.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
