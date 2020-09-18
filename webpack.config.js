// 运行webpack时，默认查找webpack.config.js文件
//可以通过webpack --config xxxx 更改默认进入文件
const { resolve } = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry: './src/index.js', //单入口  单页面配置
    // entry: { //多入口  多页面配置
    //     main: './src/index.js',
    //     print: './src/print.js'
    // },
    output: {
        // filename: '[name].[contenthash:10].js', //（多页面）
        // filename: 'built.[contenthash:10].js', //
        filename: 'built.js', //（单页面）
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [

            {
                test: /\.css$/,
                use: [
                    'style-loader', //开发环境下使用style-loader
                    // MiniCssExtractPlugin.loader, //生产环境使用提取
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024, //8kb以下用base64处理
                    name: '[hash:10].[ext]',
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ],
    // mode: 'production',
    mode: 'development',

    optimization: { //code split 方法  可以把node_moduls中的代码单独打包成一个chunk最终输出,
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: { //启动方法  npx webpack-dev-server
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        hot: true, //使用HMR功能，热模块加载/
    },
    devtool: 'source-map', //生成built.js.map文件

    externals: {
        // 指定类型文件不被打包
    }
}