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
  return "ok";
};
export { verifyUsername };
