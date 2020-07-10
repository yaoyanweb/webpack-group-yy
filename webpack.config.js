const HtmlWebpackPlugin = require("html-webpack-plugin");
const {join} = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const {HotModuleReplacementPlugin} = require('webpack');


module.exports = {
    mode:'development',
    entry:join(__dirname,'app.js'),
    output: {
        path:join(__dirname,'build'),
        filename:'app.bundle.js'
    },
    devServer: {
        contentBase: join(__dirname, 'dist'),
        compress: true,
        contentBase: 'public',
        port: 8888,  
        hot: true,   // 启用 webpack 的模块热替换特性
        open: true,  //指定要监听请求的端口号
        // historyApiFallback:true  //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use:[
                    'vue-style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            showErrors: true,
            cache: true,
            title: '集团版脚手架',
            // favicon: join(__dirname,'logo.png'),
            template: join(__dirname,'index.html')
        }),
    ]
}