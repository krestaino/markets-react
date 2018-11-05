import { SET_SYMBOL } from "../constants";

export default function(symbol) {
  return {
    type: SET_SYMBOL,
    payload: symbol
  };
}
