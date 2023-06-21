import { useEffect, useState } from "react";

// SignIn component
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
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(username);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="user name"
        />
        <button>Sign in</button>
        {message}
      </form>
    </div>
  );
};

export default SignInView;
