import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const reducers = {
  loading: require("./loading"),
  logs: require("./log"),
  user: require("./user"),
  userDrawer: require("./userDrawer"),
  mainDrawer: require("./mainDrawer"),
  logDrawer: require("./logDrawer"),
  routing: routerReducer
};

export default combineReducers(reducers);
