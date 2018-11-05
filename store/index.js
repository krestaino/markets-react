import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";

const client = axios.create({
  baseURL: "https://api.iextrading.com/1.0",
  responseType: "json"
});

export default store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));
