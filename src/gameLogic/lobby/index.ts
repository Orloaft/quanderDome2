import { ChatMessage } from "@/components/Chat/Chat";
import { GameData, Player } from "..";
import { User, updateSocket } from "../users";
import { v4 as uuidv4 } from "uuid";
import fetchTriviaQuestions from "../trivia";
export enum GameMode {
  NORMAL = "Normal mode",
  DEATH_MATCH = "Death match",
  MARATHON = "Marathon mode",
}

export interface Lobby {
  name: string;
  id: string;
  hostId: string;
  users: Player[];
  config: GameConfig;
  game: GameData | null;
  chat: ChatMessage[];
  public: boolean;
}
export interface GameConfig {
  mode: GameMode;
  questions: number;
  category: number;
  time: number;
  teams: boolean;
  life: number;
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
const nextTrivia = async (lobbyId: string) => {
  const updatedLobby = lobbies.find((lobby) => lobby.id === lobbyId);
  if (updatedLobby && updatedLobby.game) {
    updatedLobby.game.questions = await fetchTriviaQuestions(
      updatedLobby.config.questions,
      updatedLobby.config.category
    );
    updatedLobby.game.round = 0;
    updatedLobby.game.currentQuestion = updatedLobby.game.questions[0];
    updatedLobby.game.countDown = 5;
  }
  return updatedLobby;
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
        if (oldLobby.users.find((user: User) => user.socketId.length !== 0)) {
          oldLobby.hostId === foundUser.id &&
            oldLobby.users[0] &&
            (oldLobby.hostId = oldLobby.users[0].id);
          !oldLobby.users.length && closeLobby(oldLobby.id);
        } else {
          closeLobby(lobby.id);
          return null;
        }
      }
    }
  });

  return oldLobby;
}
const getUpdatedLobby = (socketId: string): Lobby | null => {
  let updatedLobby = null;
  lobbies.some((lobby) => {
    let user = lobby.users.find((user) => user.socketId === socketId);
    if (user) {
      user.socketId = "";
      if (lobby.users.find((user: User) => user.socketId.length !== 0)) {
        updatedLobby = lobby;
      } else {
        closeLobby(lobby.id);
      }
    }
  });
  return updatedLobby;
};
const closeLobby = (lobbyId: string) => {
  const index = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  if (index !== -1) {
    lobbies.splice(index, 1);
  }
};
const updateSocketInLobby = (
  userId: string,
  socketId: string
): Lobby | null => {
  let updatedLobby: Lobby | null = null;
  lobbies.some((lobby) => {
    let user = lobby.users.find((user) => user.id === userId);

    if (user) {
      user.socketId = socketId;
      updatedLobby = lobby;
    }
  });
  return updatedLobby;
};
const joinLobby = (user: User, id: string) => {
  const index = lobbies.findIndex((lobby) => lobby.id === id);
  if (index !== -1) {
    let staleUser = lobbies[index].users.find((u) => u.id === user.id);
    if (staleUser) {
      staleUser.socketId = user.socketId;
    } else {
      lobbies[index].users.push({
        ...user,
        choices: [],
        life: 0,
        points: 0,
        team: 1,
      });
    }
  } else {
    return null;
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
const updatePlayer = (playerId: string, lobbyId: string, e: any) => {
  //make sure all input names match player prop names
  const { name, value } = e;

  const index = lobbies.findIndex((lobby) => lobby.id === lobbyId);
  if (index !== -1) {
    const pIndex = lobbies[index].users.findIndex(
      (player) => player.id === playerId
    );
    if (pIndex !== -1) {
      lobbies[index].users[pIndex] = {
        ...lobbies[index].users[pIndex],
        [name]: value,
      };
    }
  }
  return lobbies[index];
};
const createLobby = (host: User, name: string) => {
  const config: GameConfig = {
    mode: GameMode.NORMAL,
    questions: 15,
    category: 0,
    time: 20,
    teams: false,
    life: 100,
  };
  const lobby: Lobby = {
    name: name,
    id: generateUniqueId(),
    hostId: host.id,
    users: [
      {
        ...host,
        choices: [],
        life: 0,
        points: 0,
        team: 1,
      },
    ],
    config: config,
    game: null,
    chat: [],
    public: true,
  };
  !lobbies.find((lobby) => lobby.hostId === host.id) && lobbies.push(lobby);
  return lobby;
};
export {
  nextTrivia,
  updatePlayer,
  createLobby,
  joinLobby,
  removeUserFromLobby,
  closeLobby,
  lobbies,
  getUpdatedLobby,
  sendLobbyMessage,
  updateConfig,
  updateSocketInLobby,
};
