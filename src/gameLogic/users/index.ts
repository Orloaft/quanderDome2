import { v4 as uuidv4 } from "uuid";
import { removeUserFromLobby } from "../lobby";
export interface User {
  id: string;
  name: string;
  socketId: string;
  isReady: boolean;
  color: string;
  avatar: string;
}
const intervals: any = {};
const users: User[] = [];
const checkAndRemoveInactive = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  if (user) {
    !user.socketId && (removeUser(id), removeUserFromLobby(id));
  } else {
    clearInterval(intervals[id]);
  }
};

const generateUniqueId = (): string => {
  let newId = uuidv4();
  if (users.find((user) => user.id === newId)) {
    return generateUniqueId();
  } else {
    return newId;
  }
};

const addUser = (socketId: string, name: string): User => {
  const id = generateUniqueId();
  const user: User = {
    id,
    name,
    socketId: socketId,
    isReady: false,
    color: "white",
    avatar: "/avatars/avatar1.jpg",
  };
  users.push(user);
  intervals[id] = setInterval((id: string) => {
    checkAndRemoveInactive(id);
  }, 15 * 60 * 1000);
  return user;
};
const removeUserSocket = (id: string) => {
  const index = users.findIndex((user) => user.socketId === id);
  if (index !== -1) {
    users[index].socketId = "";
  }
};
const updateUser = (userId: string, e: { name: string; value: any }) => {
  const { name, value } = e;
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], [name]: value };
  }
  return users[index];
};

const updateSocket = (id: string, socketId: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index].socketId = socketId;
  }
  return users[index];
};
const removeUser = (id: string): void => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
  clearInterval(intervals[id]);
};

export {
  users,
  addUser,
  removeUser,
  removeUserSocket,
  updateSocket,
  updateUser,
};
