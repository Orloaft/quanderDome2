import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";

export interface AppState {
  lobby: LobbyState;
  user: UserState;
}

export interface LobbyState {
  lobbyData?: Lobby;
}

export interface UserState {
  userData?: User;
}
