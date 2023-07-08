import { Player } from "@/gameLogic";
import { Lobby } from "@/gameLogic/lobby";
import { User } from "@/gameLogic/users";
// Define action types and action creators for your state updates
const SET_LOBBY_DATA = "SET_LOBBY_DATA";
const SET_USER_DATA = "SET_USER_DATA";

export interface SetLobbyDataAction {
  type: typeof SET_LOBBY_DATA;
  payload: Lobby | null;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: User | Player | null;
}
export type ActionTypes = SetLobbyDataAction | SetUserDataAction;

export function setLobbyData(data: Lobby | null): SetLobbyDataAction {
  return {
    type: SET_LOBBY_DATA,
    payload: data,
  };
}

export function setUserData(data: User | Player | null): SetUserDataAction {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}
