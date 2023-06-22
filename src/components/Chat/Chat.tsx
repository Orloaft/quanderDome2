import React, { useEffect, useRef } from "react";

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
    <div
      style={{
        width: "20rem",
        height: "10rem",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
      }}
      ref={chatBoxRef}
    >
      {messages.map((msg, i) => (
        <div key={i} style={{ wordWrap: "break-word", marginBottom: "5px" }}>
          <strong>{msg.userName}: </strong>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
