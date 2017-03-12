"use strict";
import * as log from "actions/log";

export default (res, dispatch) => {
  const logMessage = `Received ${res.status} response from ${res.url}.`;
  if (!res.ok) {
    dispatch(log.error(logMessage, res.statusText));
    return Promise.reject(res);
  } else {
    dispatch(log.info(logMessage, res.statusText));
    return Promise.resolve(res);
  }
};
