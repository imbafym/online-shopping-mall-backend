





const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack           = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path              = require('path');

// 环境变量, dev, (test), online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    resolve:{
        alias:{
            components:path.resolve(__dirname, 'src/components'),
            containers:path.resolve(__dirname, 'src/containers')
            
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //图片配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',

                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            //字体配置
            {
                         test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                         use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192,
                                    name: 'resource/[name].[ext]'
                                }
                            }
                        ]
                       }
        ]
    },
    plugins: [
        //处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        //处理css文件
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'js/base.js'
        })
    ],
    devServer: {
            // contentBase: './dist'
            port:8086,
            historyApiFallback:{
                index: '/dist/index.html'
            }
          }
};