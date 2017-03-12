"use strict";

let path = require("path");
let srcPath = path.join(__dirname, "/../src/");

let baseConfig = require("./base");

// Add needed plugins here
let BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  devtool: "eval",
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "isparta-loader",
        include: [
          path.join(__dirname, "/../src")
        ]
      }
    ],
    loaders: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2|css|sass|scss|less|styl)$/,
        loader: "null-loader"
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [].concat(
          baseConfig.additionalPaths,
          [
            path.join(__dirname, "/../src"),
            path.join(__dirname, "/../test")
          ]
        )
      }
    ]
  },
  resolve: {
    extensions: [ "", ".js", ".jsx" ],
    alias: {
      helpers: path.join(__dirname, "/../test/helpers"),
      actions: srcPath + "/actions/",
      components: srcPath + "/components/",
      config: srcPath + "/config/" + process.env.REACT_WEBPACK_ENV,
      containers: srcPath + "/containers/",
      images: srcPath + "/images/",
      reducers: srcPath + "/reducers/",
      routes: srcPath + "/routes/",
      sources: srcPath + "/sources/",
      stores: srcPath + "/stores/",
      styles: srcPath + "/styles/"
    }
  },
  plugins: [
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ]
};
