const path = require('path');
const resolve = path.resolve;

module.exports = {
    mode: "production",
    entry: {
        main: resolve(__dirname, './libs/index.tsx')
    },
    output: {
        filename: '[name].js',
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
    }
};