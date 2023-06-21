import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
export interface User {
  id: string;
  name: string;
  socketId: string;
}

const users: User[] = [];

// Generate a unique ID for a user
const generateUniqueId = (): string => {
  let newId = uuidv4();
  if (users.find((user) => user.id === newId)) {
    return generateUniqueId();
  } else {
    return newId;
  }
};

// Add a user to the users array
const addUser = (socketId: string, name: string): User => {
  const id = generateUniqueId();
  const user: User = { id, name, socketId: socketId };
  users.push(user);
  return user;
};

// Remove a user from the users array
const removeUser = (id: string): void => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};

export { users, addUser, removeUser };
