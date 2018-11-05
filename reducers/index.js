import { combineReducers } from "redux";

import stock from "./stock";
import symbol from "./symbol";
import symbols from "./symbols";

const AppReducer = combineReducers({
  stock,
  symbol,
  symbols
});

export default AppReducer;
