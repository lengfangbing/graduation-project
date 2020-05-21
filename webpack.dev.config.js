const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolve = path.resolve;

module.exports = {
  mode: "production",
  entry: {
    main: resolve(__dirname, "./app.jsx"),
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        loader: ["babel-loader", "ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [
					{ loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
				],
        exclude: /node_modules/,
      },
      {
        test: /\.less/,
        loader: ["style-loader", "css-loader", "less-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less"],
    alias: {
      "@": resolve(__dirname, "libs/"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 5000,
    hot: true,
    inline: true,
    open: true,
    contentBase: "./",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: resolve(__dirname, "/index.html"),
        },
      ],
    },
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "./index.html"),
    }),
  ],
};
