import React from "react";

export interface ChatMessage {
  userName: string;
  message: string;
}

interface ChatBoxProps {
  messages: ChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>
          <strong>{msg.userName}: </strong>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
