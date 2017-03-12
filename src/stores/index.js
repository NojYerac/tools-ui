"use strict";
import {applyMiddleware, createStore} from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import reducers from "reducers";
import config from "config";
import { routerMiddleware } from "react-router-redux";
import { syncHistoryWithStore } from "react-router-redux"
import { createBrowserHistory } from "history";
const browserHistory = createBrowserHistory();

let middlewares = [
  routerMiddleware(browserHistory),
  promiseMiddleware(),
  thunkMiddleware
];

if (config.appEnv !== "dist") {
  const createLogger = require("redux-logger");
  middlewares.push(createLogger());
}

const configureStore = initialState => {
  // const reduxRouterMiddleware = syncHistory(history);
  const composeStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(createStore);
  const store = composeStoreWithMiddleware(reducers, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const store = configureStore();
export default store;
export const history = syncHistoryWithStore(browserHistory, store);
