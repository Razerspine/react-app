const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCss = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        "./src/index.js",
        "./src/index.scss"
    ],
    output: {
        publicPath: "/",
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js",
    },
    devServer: {
        historyApiFallback: true,
        proxy: [{
            path: '/home/pavel/www/react-app/',
            target: 'http://localhost:5000'
        }],
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test:/\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"]
            // },

            {
                test: /\.(png|jpg|gif|ico|svg|eot|ttf|woff|woff2)$/,
                use: ['file-loader?data/img/[name].[ext]']
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    path: '/[name].[ext]',
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new miniCss({
            filename: 'style.css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/media/gamepad.ico' },
            ]
        })
    ]
};