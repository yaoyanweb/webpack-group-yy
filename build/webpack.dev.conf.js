//引入webpack-merge插件进行合并
const {merge} = require('webpack-merge');
//引入webpack.base.conf.js文件
const base = require('./webpack.base.conf');
//引入webpack
const webpack = require('webpack');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// SMP 分析webpack打包过程 及loader plugin 的耗费时间
const smp = new SpeedMeasureWebpackPlugin();
// 监控资源的变化
const sizePlugin = require('size-plugin');
//进行合并，将webpack.base.conf.js中的配置合并到这
module.exports =  merge(base,smp.wrap({
    //模块参数
     mode: 'development',
     devServer: {
         contentBase: './dist',
         // 启动打开新窗口
         open:true,
         //端口号
         port: '8383',
         inline: true,
         historyApiFallback: true,//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
         hot: true,//允许热加载
         proxy: {
             // '/api': {
             //     target: 'http://localhost:3000',
             //     pathRewrite: {'^/api' : ''}
             // }
         }
 
     },
     //启用source-map方便调试
     devtool: 'source-map',
     plugins: [
         new sizePlugin(),
        //定义全局变量
         new webpack.DefinePlugin({
             DEV:require(`../apiurl/${process.env.NODE_ENV}`)
         }),
        
 
     ]
 }) );