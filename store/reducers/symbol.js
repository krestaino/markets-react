import { SET_SYMBOL } from "../constants";

const initialState = "";

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SYMBOL:
      return action.payload;
    default:
      return state;
  }
}
