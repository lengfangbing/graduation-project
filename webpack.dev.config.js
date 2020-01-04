const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = path.resolve;

module.exports = {
    mode: "development",
    entry: {
        main: resolve(__dirname, './libs/index.tsx')
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            loader: ['babel-loader', 'ts-loader'],
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    devServer: {
        host: '127.0.0.1',
        port: 5000,
        hot: true,
        inline: true,
        progress: true,
        open: true,
        contentBase: './'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./index.html")
        })
    ]
};