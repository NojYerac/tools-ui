"use strict";
import {
  LOG, SUCCESS, INFO, WARN, ERROR, REMOVE_LOG, LOG_DRAWER_TOGGLE, LOG_DRAWER_OPEN, SET_LOG_LEVEL
} from "./types";

export const log = (message, title) => ({
  type: LOG,
  message,
  title
});

export const info = (message, title) => ({
  type: INFO,
  message,
  title
});

export const warn = (message, title) => ({
  type: WARN,
  message,
  title
});

export const error = (message, title) => ({
  type: ERROR,
  message,
  title
});

export const success = (message, title) => ({
  type: SUCCESS,
  message,
  title
});

export const logDrawerOpen = () => ({
  type: LOG_DRAWER_OPEN
});

export const logDrawerToggle = () => ({
  type: LOG_DRAWER_TOGGLE
});

export const removeLog = index => ({
  type: REMOVE_LOG,
  index
});

export const setLogLevel = level => ({
  type: SET_LOG_LEVEL,
  level
});
