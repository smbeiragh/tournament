require('dotenv').config();
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ResourceHintWebpackPlugin = require("resource-hints-webpack-plugin");
const cwd = path.resolve(__dirname);

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'BASE_URL',
      'CDN_BASE_URL',
      'API_BASE_URL',
    ]),
    new HtmlWebpackPlugin({ template: path.join(cwd, "./views/index.ejs") }),
    new ResourceHintWebpackPlugin()
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css", ".scss"]
  },
  module: {
    rules: [
      {
        test: [path.join(cwd, "app")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: "babel_cache"
          }
        }
      }
    ]
  },
  output: {
    publicPath: "/",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
