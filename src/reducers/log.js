"use strict";
import {
  LOG, INFO, WARN, SUCCESS, ERROR, REMOVE_LOG
} from "actions/types";

const levelMap = {
  [LOG]: 4,
  [INFO]: 3,
  [WARN]: 2,
  [SUCCESS]: 3,
  [ERROR]: 1
};

const nameMap = {
  [LOG]: "default",
  [INFO]: "info",
  [WARN]: "warning",
  [SUCCESS]: "success",
  [ERROR]: "error"
};

// import config from "config";

let initialState = [];

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  if (nameMap[action.type]) {
    const logSpec = {
      type: nameMap[action.type],
      level: levelMap[action.type],
      message: action.message,
      ts: Date.now(),
      title: action.title || ""
    };
    return [logSpec, ...state];
  } else if (action.type === REMOVE_LOG) {
    const index = action.index;
    let newState = [...state.slice(0, index), ...state.slice(index + 1)];
    return newState;
  }
  return state;
};
