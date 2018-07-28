const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MakeDirWebpackPlugin = require('make-dir-webpack-plugin');


const REACT = {
    mode: "production",
    entry: "./src/react/index.jsx",
    output: {
        path: path.join(__dirname, "build", './public'),
        publicPath: '/public/',
        filename: "js/main.bundle.js"
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react"],
                    plugins: ['babel-plugin-transform-runtime']
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin("build"),

        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "src/"),
                to: path.join(__dirname, "build/"),
                ignore: ['react/**/*']
            },
            {
                from: path.join(__dirname, ".env"),
                to: path.join(__dirname, "build/"),
            },
            {
                from: path.join(__dirname, "package.json"),
                to: path.join(__dirname, "build/"),
            },
            {
                from: path.join(__dirname, "package-lock.json"),
                to: path.join(__dirname, "build/"),
            }
        ]),

        new MakeDirWebpackPlugin({
            dirs: [
                { path: './build/recorded' }
            ]
        })
    ]
};



module.exports = [REACT];