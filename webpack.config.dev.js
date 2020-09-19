const path = require("path");

const baseConf = require("./webpack.config");

const cwd = path.resolve(__dirname);

const conf = Object.assign({}, baseConf, {
  mode: "development",
  entry: {
    main: ["react-hot-loader/patch", "./app/client.tsx"]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    publicPath: "/",
    hot: true,
    port: process.env.NODE_PORT,
    overlay: true,
    historyApiFallback: {
      index: "/index.html"
    }
  },
  resolve: {
    ...baseConf.resolve,
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    ...baseConf.plugins
  ],
  module: {
    rules: [
      ...baseConf.module.rules,
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          { loader: 'css-loader', options: { importLoaders: 1 } },
          "postcss-loader"
          //"sass-loader" // compiles Sass to CSS, using Node Sass by default
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

module.exports = conf;
