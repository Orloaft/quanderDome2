import { ChatMessage } from "@/components/Chat/Chat";
import { GameData } from "..";
import { User } from "../users";
import { v4 as uuidv4 } from "uuid";
export enum GameMode {
  NORMAL = "NORMAL",
  SUDDEN_DEATH = "SUDDEN_DEATH",
  MARATHON = "MARATHON",
  TEAMS = "TEAMS",
}

export interface Lobby {
  name: string;
  id: string;
  hostId: string;
  users: User[];
  config: GameConfig;
  game: GameData | null;
  chat: ChatMessage[];
}
export interface GameConfig {
  mode: GameMode;
  questions: number;
  category: number;
  time: number;
}
const lobbies: Lobby[] = [];
const generateUniqueId = (): string => {
  let newId = uuidv4();
  if (lobbies.find((lobby) => lobby.id === newId)) {
    return generateUniqueId();
  } else {
    return newId;
  }
};
const updateConfig = (lobbyId: string, config: GameConfig) => {
  const index = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  if (index !== -1) {
    lobbies[index].config = config;
  }
  return lobbies[index];
};
function removeUserFromLobby(userId: string): Lobby | null {
  let foundUser: User | undefined;
  let oldLobby: Lobby | null = null;
  lobbies.some((lobby) => {
    foundUser = lobby.users.find((user) => user.id === userId);
    if (foundUser) {
      oldLobby = lobby;
      const index = lobby.users.findIndex((user: User) => user.id === userId);
      if (index !== -1) {
        oldLobby.users.splice(index, 1);
        !oldLobby.users.length && closeLobby(oldLobby.id);
      }
    }
  });

  return oldLobby;
}
const getUpdatedLobby = (socketId: string): Lobby | null => {
  lobbies.some((lobby) => {
    let user = lobby.users.find((user) => user.socketId === socketId);
    if (user) {
      user.socketId = "";
      return lobby;
    }
  });
  return null;
};
const closeLobby = (lobbyId: string) => {
  const index = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  if (index !== -1) {
    lobbies.splice(index, 1);
  }
};
const joinLobby = (user: User, id: string) => {
  const index = lobbies.findIndex((lobby) => lobby.id === id);
  if (index !== -1) {
    lobbies[index].users.push(user);
  }
  return lobbies[index];
};
const sendLobbyMessage = (
  lobbyId: string,
  username: string,
  message: string
) => {
  const index = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  if (index !== -1) {
    lobbies[index].chat.push({ userName: username, message: message });
  }
  return lobbies[index];
};
const createLobby = (host: User, name: string) => {
  const config: GameConfig = {
    mode: GameMode.NORMAL,
    questions: 15,
    category: 0,
    time: 60,
  };
  const lobby: Lobby = {
    name: name,
    id: generateUniqueId(),
    hostId: host.id,
    users: [host],
    config: config,
    game: null,
    chat: [],
  };
  !lobbies.find((lobby) => lobby.hostId === host.id) && lobbies.push(lobby);
  return lobby;
};
export {
  createLobby,
  joinLobby,
  removeUserFromLobby,
  closeLobby,
  lobbies,
  getUpdatedLobby,
  sendLobbyMessage,
  updateConfig,
};
