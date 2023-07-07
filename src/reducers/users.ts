import { ActionTypes } from "@/actions";
import { UserState } from "@/actions/types";

export function userReducer(state = {}, action: ActionTypes): UserState {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
