const path = require("path");
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
      {
        test: /\.(png|jpg)/,
        loader: ["url-loader"],
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".less"],
    alias: {
      "@": resolve(__dirname, "libs/"),
    },
  }
};
