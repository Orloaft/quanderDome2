import { createContext, useContext } from "react";

// UserContext definition
interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
// Custom hook to use UserContext
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
export { UserContext, useUserContext };
