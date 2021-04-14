const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack');

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    devtool: 'source-map',
    plugins: [
        new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
      ],
    externals: [nodeExternals()],
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: __dirname,
                exclude: [/node_modules/]
            }
        ]
    },
    
};