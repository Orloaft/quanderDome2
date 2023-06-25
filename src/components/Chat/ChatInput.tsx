import React, { useState } from "react";
import styles from "./styles.module.scss";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className={styles.chatInputForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        className={styles.chatInputText}
      />
      <button type="submit" className={styles.chatInputButton}>
        Send
      </button>
    </form>
  );
};

export default ChatInput;
