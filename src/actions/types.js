"use strict";
/**
 * action types for use in actions and reducers
 * @type {String}
 */

export const MAIN_DRAWER_TOGGLE = "MAIN_DRAWER_TOGGLE";

export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

// user related action types
export const REQUEST_USER = "REQUEST_USER";
export const USER_DRAWER_TOGGLE = "USER_DRAWER_TOGGLE";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";


// alert related action types
export const LOG = "LOG";
export const INFO = "LOG_INFO";
export const WARN = "LOG_WARN";
export const ERROR = "LOG_ERROR";
export const SUCCESS = "LOG_SUCCESS";
export const REMOVE_LOG = "LOG_REMOVE";
export const LOG_DRAWER_TOGGLE = "LOG_DRAWER_TOGGLE";
export const LOG_DRAWER_OPEN = "LOG_DRAWER_OPEN";
export const SET_LOG_LEVEL = "SET_LOG_LEVEL";
