const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConf = require("./webpack.config");

const cwd = path.resolve(__dirname);

const conf = Object.assign({}, baseConf, {
  mode: "production",
  entry: {
    main: ["./app/client.tsx"]
  },
  plugins: [
    ...baseConf.plugins,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  ],
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
          // "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: [
          /\.(png|jpg|gif|mp4|ogv|ogg|webm|eot|svg|ttf|woff2?)$/i
        ],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
});

conf.devtool = false;

conf.output.filename = "[name].[hash].bundle.js";

module.exports = conf;
