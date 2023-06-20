import { useState } from "react";

// SignIn component
const SignIn = ({ verifyName }: { verifyName: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyName(username);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="user name"
        />
        <button>Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
