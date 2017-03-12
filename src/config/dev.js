"use strict";

import baseConfig from "./base";

let config = {
  appEnv: "dev",
  API_ROOT: "http://localhost:8001",
  logLevel: 5,
  AUTH_ROOT: "http://localhost:8001/auth"
};

export default Object.freeze(Object.assign({}, baseConfig, config));
