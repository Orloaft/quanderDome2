import { ActionTypes } from "@/actions";
import { LobbyState } from "@/actions/types";

// Create reducers to handle the state updates based on the dispatched actions
export function lobbyReducer(state = {}, action: ActionTypes): LobbyState {
  switch (action.type) {
    case "SET_LOBBY_DATA":
      return { ...state, lobbyData: action.payload };
    default:
      return state;
  }
}
