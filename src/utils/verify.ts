import { lobbies } from "@/gameLogic/lobbyController";
import { users } from "@/gameLogic/playersController";

const verifyUsername = (name: string) => {
  if (name.length < 3) {
    return "name should be at least 3 characters";
  }
  if (name.length > 8) {
    return "name cannot exceed 8 characters";
  }
  if (users.find((user) => user.name === name)) {
    return name + " has been taken";
  }
  return "Great choice";
};
const verifyLobby = (name: string) => {
  if (name.length < 1) {
    return "name should be at least 1 character";
  }
  if (name.length > 12) {
    return "name cannot exceed 12 characters";
  }
  if (lobbies.find((lobby) => lobby.name === name)) {
    return name + " has been taken";
  }
  return "Great choice";
};
export { verifyUsername, verifyLobby };
