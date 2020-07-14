const path = require('path');
//清除build/dist文件夹文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//生成创建Html入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入webpack
const webpack = require('webpack');
// vue loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//  HappyPack优化 开启多线程运行loader
const HappyPack = require('happypack');

// HardSourceWebpackPlugin 为模块提供中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source。
// 配置 hard-source-webpack-plugin，首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

// webpack-bundle-analyzer将打包后的内容束展示为方便交互的直观树状图，让我们知道我们所构建包中真正引入的内容
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
    //webpack 入口文件
    entry: path.join(__dirname, '../app.js'),
    //webpack 输出文件配置
    output: {
        //输出文件路径
        path: path.join(__dirname, '../dist'),
        //输出文件名
        filename: 'app.bundle.[hash:8].js'
    },
    //配置插件
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost:'127.0.0.1',
            analyzerPort: parseInt(Math.random()*10000)
        }),
        new HardSourceWebpackPlugin(),
        new VueLoaderPlugin(),
        //使用插件清除dist文件夹中的文件
        new CleanWebpackPlugin({
            path: path.join(__dirname, '../dist')
        }),
        //使用插件生成Html入口文件
        new HtmlWebpackPlugin({
            //模板文件路径
            template: path.join(__dirname, '../index.html'),
            //模板文件名
            filename: "index.html",
            minify: {
                removeAttributeQuotes: true, //删除双引号,
                collapseWhitespace: true,    //压缩成一行，
            },
            hash: true
        }),

        new HappyPack({
            id: 'js',
            loaders: [{
                loader: "babel-loader",
                options: {
                    "presets": ["es2015"]
                }
            }]
        }),
        new HappyPack({
            id: 'html',
            loaders: [
                'html-withimg-loader'
            ]
        }),
        new HappyPack({
            id: 'img',
            loaders: [
                {
                    loader: "url-loader",
                    options: {
                        //图片小于10kb就是图片地址，大于正常打包成base64格式编码    
                        limit: 10000,
                        //输出路径
                        outputPath: 'img/'
                    }
                }
            ]
        })
    ],
    resolve: {
        // modules: [path.resolve('node_modules')],//只在当前目录下查找
        alias: { //别名
            'bootstrap': 'bootstrap/dist/css/bootstrap.css',
        },

        // mainFields: ['style', 'main'],//优先寻找style，
        // mainFiles: [],//入口文件的名字,默认index.js
        // extensions: ['js', 'css', 'json', 'vue']//扩展名顺序
    },

    //loader加载器模块配置
    module: {
        rules: [
            {
                //正则表达式匹配.css为后缀的文件
                test: /\.css$/,
                //使用loader
                use: [
                    'thread-loader',
                    'cache-loader',
                    'style-loader',
                    'css-loader',
                ]
                //正则表达式匹配.less为后缀的文件
                //使用lodaer来处理
            }, {
                test: /\.less$/,
                use: [
                    'thread-loader',
                    'cache-loader',
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            /* {
                 test: /\.js$/,
               //不包括node_modules
                 exclude: /node_modules/,
                 use: [{
                     loader: "eslint-loader",
                     options: {
                         enforce: 'pre'    //强制更改顺序，pre 前  post 后
                     }
                 }],
             },*/
            {
                test: /\.js$/,  //普通的loader
                //不包括node_modules
                exclude: /node_modules/,
                loader: 'happypack/loader?id=js'
            },
            {
                test: /\.html$/,
                //不包括node_modules
                exclude: /node_modules/,
                loader: 'happypack/loader?id=html'
            },
            //vue-loader 15.1, 它不支持happypack这个插件优化
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(gif|png|jpg)$/,
                //不包括node_modules
                exclude: /node_modules/,
                loader: 'happypack/loader?id=img'
            }
        ]
    },
};