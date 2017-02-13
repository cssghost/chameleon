var path = require('path');
var webpack = require('webpack');

const fileConfig = require('./publish.file.config.js');

module.exports = {
    // entry: {
    //     vendors : ['jquery', 'underscore', 'backbone'],
    //     // test : [
    //     //     path.resolve(__dirname, 'js/test.js')
    //     // ]
    //     dep : [
    //         path.resolve(__dirname, 'js/framework/jquery.cookie.js'),
    //         path.resolve(__dirname, 'js/framework/modernizr.js'),
    //         path.resolve(__dirname, 'js/framework/hamster-library.js'),
    //         // 基础业务代码
    //         path.resolve(__dirname, 'js/framework/store.js'),
    //         path.resolve(__dirname, 'js/framework/config.js'),
    //         path.resolve(__dirname, 'js/framework/template-manager.js'),
    //         path.resolve(__dirname, 'js/framework/main-service.js'),
    //         // iframe 对话框
    //         path.resolve(__dirname, 'js/framework/iframe-dialog.js')
    //     ],
    //     base : [
    //         // 数据过滤器
    //         path.resolve(__dirname, 'js/module/filter.js'),
    //         // 模板组件
    //         path.resolve(__dirname, 'js/module/ui.js'),
    //         // UI组件
    //         path.resolve(__dirname, 'js/plugin/ui.plugin.js'),
    //         // 上传组件
    //         path.resolve(__dirname, 'js/plugin/fileupload.plugin.js'),
    //         // 分页组件

    //         // 验证组件
    //         path.resolve(__dirname, 'js/plugin/verify.plugin.js'),
    //         // 模拟滚动条组件
    //         path.resolve(__dirname, 'js/plugin/scrollbar.plugin.js'),
    //         // 弹出框组件
    //         path.resolve(__dirname, 'js/plugin/dialog.plugin.js'),
    //         // JSON 解析
    //         path.resolve(__dirname, 'js/plugin/run_prettify.js')
    //     ],
    //     common : [
    //         // layout 
    //         path.resolve(__dirname, 'js/common/layout.view.js'),
    //         path.resolve(__dirname, 'js/common/local.storage.service.js'),
    //         // 账户
    //         path.resolve(__dirname, 'js/common/account.model.js'),
    //         // 异常页面
    //         path.resolve(__dirname, 'js/common/service.status.view.js')
    //     ],
    //     main : [
    //         path.resolve(__dirname, 'js/biz/user.service.js'),
    //         path.resolve(__dirname, 'js/biz/home.view.js'),
    //         // 测试页面
    //         path.resolve(__dirname, 'js/biz/test.view.js'),
    //         path.resolve(__dirname, 'js/biz/test.service.js'),
    //         // 项目管理页面
    //         path.resolve(__dirname, 'js/biz/room.manage.view.js'),
    //         path.resolve(__dirname, 'js/biz/room.service.js'),
    //         // 接口管理页面
    //         path.resolve(__dirname, 'js/biz/api.list.view.js'),
    //         path.resolve(__dirname, 'js/biz/api.service.js'),
    //         // 路由启动
    //         path.resolve(__dirname, 'js/router.js')
    //     ]
    // },
    entry: fileConfig.js,
    output: {
        path: path.resolve(__dirname, 'asset/js'),
        filename: '[name].js'
    },
    module: {
        perLoaders: [
            {
                test: /\.jsx?$/,
                include: /js/,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: ['babel'],
                query: {
                    presets: ['es2015', 'es2015-loose', 'react', 'stage-0'],
                    // presets: ['es2015', 'es2015-loose','react'],
                    // plugins : [
                    //     "transform-es3-property-literals",
                    //     "transform-es3-member-expression-literals",
                    // ]
                }
            }
        ]
        // ,
        // postLoaders: [
        //     {
        //         test: /\.jsx$/,
        //         loaders: ['es3ify-loader']
        //     }
        // ]
    },
    resolve: {
        alias: {
            Store: {
                Store: "js/framework/store.js"
            },
            ct : {
                ct: "js/framework/ct.template.js"
            },
            mainService : {
                mainService: "js/framework/main.service.js"
            }
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            _ : "underscore",
            Backbone : "backbone"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.optimize.CommonsChunkPlugin("init.js")
    ],
    //配置jshint的选项，支持es6的校验
    jshint: {
        "esnext": true
    },
    watch : true
};