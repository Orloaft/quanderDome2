import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const SignInView = ({
  socket,
  handleSubmit,
}: {
  socket: any;
  handleSubmit: any;
}) => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    message && setMessage("");
  };

  useEffect(() => {
    socket.on("username_msg", (msg: string) => {
      setMessage(msg);
    });
  }, [socket]);

  return (
    <div className={styles.signInContainer}>
      <form
        className="frame"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="User name"
        />
        <button>Sign in</button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default SignInView;
