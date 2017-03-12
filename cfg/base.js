"use strict";
let path = require("path");

let port = 8000;
let srcPath = path.join(__dirname, "/../src");
let publicPath = "assets/";

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
const npmBase = path.join(__dirname, "../node_modules");
let additionalPaths = [
  /@toolbox\/.*\.jsx?/,
  path.join(npmBase, "\\@toolbox/*/index.jsx")
];

const reactDomLibPath = path.join(npmBase, "react-dom/lib");
const movedPackagesAliases = {};
[
  "EventPluginHub", "EventConstants", "EventPluginUtils",
  "EventPropagators", "SyntheticUIEvent", "ViewportMetrics"
].forEach(f => {
  movedPackagesAliases[`react/lib/${f}`] = `${reactDomLibPath}/${f}`;
});

const sharedPackages = {};
[
  "react", "react-dom", "redux", "react-redux", "react-router-redux"
].forEach(f => {
  sharedPackages[f] = `${npmBase}/${f}`;
});


const alias = Object.assign({
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
}, movedPackagesAliases, sharedPackages);

module.exports = {
  additionalPaths: additionalPaths,
  port: port,
  debug: true,
  output: {
    path: path.join(__dirname, "/../dist/assets"),
    filename: "app.js",
    publicPath: publicPath
  },
  devServer: {
    contentBase: "./src/",
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: "/" + publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ["", ".js", ".jsx", "/index.js", "/index.jsx"],
    alias
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      include: srcPath,
      loader: "eslint-loader"
    }],
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.sass/,
      loader: "style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax"
    }, {
      test: /\.scss/,
      loader: "style-loader!css-loader!sass-loader?outputStyle=expanded"
    }, {
      test: /\.less/,
      loader: "style-loader!css-loader!less-loader"
    }, {
      test: /\.styl/,
      loader: "style-loader!css-loader!stylus-loader"
    }, {
      test: /\.(png|jpg|gif|svg|woff|woff2)$/,
      loader: "url-loader?limit=8192"
    // }, {
    //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    // }, {
    //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    //   loader: 'url?limit=10000&mimetype=image/svg+xml'
    }]
  }
};
