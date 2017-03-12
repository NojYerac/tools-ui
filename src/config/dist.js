"use strict";

import baseConfig from "./base";

let config = {
  appEnv: "dist",
  API_ROOT: "https://api.rad.af",
  logLevel: 2,
  AUTH_ROOT: "https://auth.rad.af"
};

export default Object.freeze(Object.assign({}, baseConfig, config));
