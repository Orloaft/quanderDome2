import { combineReducers } from "redux";
import { lobbyReducer } from "./lobby";
import { userReducer } from "./users";

// Combine all reducers into a single reducer function
export const rootReducer = combineReducers({
  lobby: lobbyReducer,
  user: userReducer,
});
