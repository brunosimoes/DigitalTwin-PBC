const config = require("./config");
const { name, exposes, alias, plugins, publicPath, devServerPort, typesOutputDir } = config;

module.exports = {
  output: {
    publicPath,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    alias
  },

  devServer: {
    port: devServerPort,
    historyApiFallback: true,
    compress: true,
    allowedHosts: 'all'
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: 'dts-loader',
            options: {
              name,
              exposes,
              typesOutputDir
            },
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins
};
