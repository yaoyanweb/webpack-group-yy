const {merge} = require('webpack-merge');
const base = require('./webpack.base.conf');
const OptimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(base, {
    mode: 'production',
    plugins:[
     //使用插件定义全局变量DEV
        new webpack.DefinePlugin({
            DEV:require(`../apiurl/${process.env.NODE_ENV}`)
        })
    ],
    

});