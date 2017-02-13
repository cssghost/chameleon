/** 
* @fileOverview 静态路由配置文件
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-06-02
* @update：2015-06-02
*/ 

'use strict';

import React from 'react';
import { render } from 'react-dom';
import {mainConfig} from './framework/config.js';

let Router = Backbone.Router.extend({
    routes : {
        '': 'home',
            'test': 'test',
            'room/manage': 'roomManage',
            'api/list/:name': 'apiList',
            'error/:id': 'error',
            '*notFound': 'notFound'
    },
    regRoutes: [
        // 个人中心
        // {
        //     url: /^account\/(.*)/,
        //     medth: 'accountLayout'
        // }
    ],
    initialize : function () {
        var self = this,
            regRoutes = self.regRoutes;

        // 需要正则配置的路由
        // this.route(/^category\/?(\d+)?\/?(?:page=(\d+))?(?:\&?sort=(.+))?/, 'category');

        if ( regRoutes.length ) {
            $.each(regRoutes, function (index, item) {
                self.route(item.url, item.medth);
            });
        }

        self.initLayout = self.bindLayout();
    },
    home: function() {
        // 首页
        // this.showView({
        //     url: 'home',
        //     title: 'home',
        //     breadcrumb: [],
        //     resolve: {},
        //     init: function(v, e) {
        //         var homeView = new(Store.getView('Home'))()
        //         homeView.render(v);
        //         return homeView;
        //     }
        // });
    
        // this.roomManage();
    },
    test: function() {
        // 首页
        this.showView({
            url: 'test',
            title: 'test',
            breadcrumb: [],
            resolve: {},
            init: function(v, e) {
                var testView = new(Store.getView('Test'))()
                testView.render(v);
                return testView;
            }
        });
    },
    // 项目管理
    roomManage: function () {
        var self = this,
            roomService = Store.getService('Room');

        // 首页
        this.showView({
            url: 'room.manage',
            title: 'room manage',
            resolve: {
                rooms : function () {
                    return roomService.getList()
                }
            },
            init: function(v, e) {
                var roomManageView = new(Store.getView('RoomManage'))()
                roomManageView.render(v);
                return roomManageView;
            }
        });
    },
    // 接口列表
    apiList: function (name, params) {
        var self = this,
            apiService = Store.getService('Api'),
            hashParams = Store.formatUrlHash(params),
            type = hashParams.jsonParams.type,
            api = hashParams.jsonParams.api,
            method = hashParams.jsonParams.method,
            status = '';

        if ( type == 'create' ) {
            status = 'create';
        } else {
            if ( !!api ) {
                api = api.toLowerCase()
                status = 'api';
                method = method || 'preview';
            }
        }

        self.showView({
            url: 'api.list',
            title: 'api list',
            resolve: {
                api : function () {
                    return apiService.getList(name);
                },
                curApi : function () {
                    var res = {};

                    if ( status == 'api' ) {
                        return apiService.getApiDetail(name, api);
                    }

                    return res;
                },
                roomName : name,
                status : {
                    type : status,
                    api : api
                },
                method : method
            },
            init: function(v, tempData) {
                var apiListView = new(Store.getView('ApiList'))()
                apiListView.render(v, tempData);
                return apiListView;
            }
        });
    },
/**
 * <p> 初始化，绑定全局事件
 * <p> 初始化 layout view
 * <p> 初始化 公共面包屑
 * <p> 初始化 本地的登录信息(cookie)
 * <p> 绑定 PV 检测
 * <p> 绑定 移动端按钮的公共 active 样式
 * <p> 绑定 点击返回顶部
 * <p> 绑定 内容区顶部白色菜单
 * <p> 绑定 内容区灰色菜单
 * <p> 绑定 live800 弹窗
 * <p> 绑定 显示/隐藏 微信二维码
 * <p> 绑定 显示/隐藏 切换中英文菜单
 * @author 徐晨 ( xuchen@smartisan.com )
 */
    bindLayout: function() {
        var self = this;
        if (self.initLayout) {
            return false;
        }
        self.initLayout = true;

        // 初始化 layout 单例模式，不需要赋值
        // Store.getView('Layout');

        return Store.proxyDefer();

    },
/**
 * @name Router#showView
 * @event
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 场景页面初始化
 * @param {String}      view                    view 参数
 * @param {String}      view.title              浏览器标签名称
 * @param {String}      view.url                page template url
 * @param {Boolean}     view.isHub              router hub
 * @param {JSON}        view.hashParams         hash params
 * @param {Array}       view.breadcrumb         面包屑
 * @param {Boolean}     view.mobileScreen       [可选] 是否需要适配移动端
 * @param {Boolean}     view.hideCart           [可选] 是否隐藏公共购物车
 * @param {JSON}        view.tempData           page template data
 * @param {JSON}        view.resolve            预加载数据
 * @param {jQuery}      view.container          [可选] 内容填充区包裹
 * @param {Function}    view.init               页面模板加载完成之后的回调事件
 * @param {Boolean}     view.userRequired       是否需要登录
 * @param {Boolean}     reload                  是否强制重新渲染页面
 * @example
Router.showView({
    url: 'tpl-name',
    title: 'title',
    mobileScreen: true | false,
    breadcrumb: [
        {
            nav: 'nav'
        }
    ],
    resolve: {
        status : '直接使用变量',
        list : function(){
            return service.medth();
        },
        other : function(){
            return service.medth().then(function(response){
                response.add = 'add';
                return response;
            });
        }
    },
    init: function(v, e) {
        var view = new ( Store.getView('ViewName') )();
        view.render(v);

        // 切换不同页面时，会自动删除上一个使用的 view
        return view;
    }
});
 */
    showView: function(view, reload) {
        var self = this,
            tempData = view.tempData || {},
            $layoutContainer = view.container || Store.config.layoutContainer,
            cachePage = ct.get(view.url, true),
            pageDefer,
            resolve = {
                key: [],
                value: []
            },
            breadcrumb = view.breadcrumb,
            breakView,
            $pageLoading = Store.config.pageLoading;



        // 判断是否为新的场景

        if ( view.hashParams && !view.isHub && !reload ) {

            var baseUrl = Store.formatUrlToParams().base,
                hashParams = Store.formatUrlHash( view.hashParams );

            view.hashCache = {
                base : baseUrl,
                updateParams : hashParams
            };
            
            if (
                Store.currentView.hashCache 
                && Store.currentView.hashCache.base == baseUrl
                && Store.currentView.viewCache
                && typeof Store.currentView.viewCache.updateView == 'function' 
            ) {
                var preHashParams = Store.currentView.hashCache.updateParams;

                Store.currentView.hashCache = view.hashCache;

                Store.currentView.viewCache.updateView( Store.formatHashAction(preHashParams, hashParams) );
                return false;
            }
        }

        // 移除旧的 view
        if ( Store.currentView.viewCache && typeof Store.currentView.viewCache.remove == 'function' ) {
            Store.currentView.viewCache.remove();
        }

        Store.currentView = view;

        Store.reloadView = function () {
            self.showView(view, true);
        }

        // link page by verify userRequired
        self.initLayout.always(function() {

            // 关闭所有弹出框
            Store.getPlugin('Dialog').closeAll();            

            // 定义页面请求 有缓存或者没有缓存
            if (cachePage) {
                pageDefer = Store.proxyDefer(cachePage);
            } else {
                pageDefer = ct.get(view.url);
                // ct.get(view.url);
            }

            // 解绑事件
            self.unbindLayout();

            $layoutContainer.off().empty();
            // 显示page－loading页面
            $pageLoading.show(); 

            // 预加载数据 ==> 发起请求
            if (view.resolve) {
                $.each(view.resolve, function(key, value) {
                    resolve.key.push(key);

                    var cacheResolve = typeof value == 'function' ? value() : value;

                    if (typeof cacheResolve == 'object' && typeof cacheResolve.done == 'function') {
                        resolve.value.push(cacheResolve);
                    } else {
                        resolve.value.push(Store.proxyDefer([cacheResolve]));
                    }
                });
            }   

            // 预加载数据 ==> 全部请求完毕
            $.when.apply(jQuery, resolve.value)
                .done(function() {
                    // 未登录状态载入需要登录的页面
                    if (view.userRequired && !UserService.isLoggedIn) {
                        UserService.openLogin();
                        return false;
                    }

                    $.each(arguments, function(index, item) {

                        tempData[resolve.key[index]] = item && item.constructor == Array ? item[0] : item;
                        if (tempData[resolve.key[index]] === false) {
                            breakView = true;
                            return false;
                        }

                    });

                    if (breakView) {
                        return false;
                    }

                    view.tempData = tempData;

                    // 页面初始化
                    pageDefer.always(function($container) {
                        $(document).scrollTop(0);
                        document.title = view.title + ' - Chameleon';

                        // 预加载面包屑导航
                        if ( typeof breadcrumb != 'undefined' ) {
                            self.initBreadcrumb(breadcrumb);
                        }
                    })
                    .done(function(result, statusText, defer) {

                        // 隐藏page－loading页面
                        $pageLoading.hide(); 

                        // var start = +(new Date());
                        $layoutContainer.html(ct.compile(result, tempData));

                        // var end = +(new Date());

                        // console.log(end - start);

                        view.html = result;
                        view.$page = $layoutContainer.find('.content');

                        Store.currentView = view;
                        if ( typeof view.init == 'function' ) {
                            Store.currentView.viewCache = view.init(view, tempData);
                        }
                    })
                    .fail(function(defer, status, statusText) {
                        // self.notFound()
                    });
                }).fail(function(error, errorInfo) {
                    // 非正常报错
                    if ( !error ) {
                        return false;
                    }

                    if ( error != 10004 && error != 1000 && error != 70000 ) {
                        window.location.href = '#/';
                    }
                });
        });
    },
    /**
     * @description <p> 解绑 scroll 事件
     *              <p> 清除所有计时器事件
     *              <p> PC 端绑定“返回顶部”的事件
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    unbindLayout: function() {

        $.each(Store.loop, function (key, value) {
            clearInterval(Store.loop[key]);
        });

        $(window).off('scroll');
        $('.breadcrumb').html('');

        if ( !Store.config.isMobile ) {
            $(window).scroll(function(){
                if ($(window).scrollTop() > 0){
                    $('#returnTop').animate({'bottom':'10px'},{queue:false,duration:200});
                }else{
                    $('#returnTop').animate({'bottom':'-40px'},{queue:false,duration:200});
                }
            });
        }
    }
});

Store.Router = new Router();
Backbone.history.start({});

// window.Store.onPageReady(function() {
//     var UtilService = Store.getService('Util');
//     var StorageService = Store.getService('LocalStorage');
//     var UserService = Store.getService('User');

//     var AccountModel = Store.getModel('Account');

//     var cacheAccountView = null;
//     var LayoutView = Store.getView('Layout');

// /**
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @name Router
//  * @constructor
//  * @extends jQuery
//  * @extends Backbone.Router
//  * @extends Store
//  */
//     var Router = Backbone.Router.extend(/** @lends Router.prototype*/{
//         routes: {
//             '': 'home',
//             'test': 'test',
//             'room/manage': 'roomManage',
//             'api/list/:name': 'apiList',
//             'error/:id': 'error',
//             '*notFound': 'notFound'
//         },
//         regRoutes: [
//             // 个人中心
//             // {
//             //     url: /^account\/(.*)/,
//             //     medth: 'accountLayout'
//             // }
//         ],
//         initialize: function() {
//             var self = this,
//             regRoutes = self.regRoutes;

//             // 需要正则配置的路由
//             // this.route(/^category\/?(\d+)?\/?(?:page=(\d+))?(?:\&?sort=(.+))?/, 'category');

//             if ( regRoutes.length ) {
//                 $.each(regRoutes, function (index, item) {
//                     self.route(item.url, item.medth);
//                 });
//             }

//             self.initLayout = self.bindLayout();
//         },
//         home: function() {
//             // 首页
//             // this.showView({
//             //     url: 'home',
//             //     title: 'home',
//             //     breadcrumb: [],
//             //     resolve: {},
//             //     init: function(v, e) {
//             //         var homeView = new(Store.getView('Home'))()
//             //         homeView.render(v);
//             //         return homeView;
//             //     }
//             // });
        
//             this.roomManage();
//         },
//         test: function() {
//             // 首页
//             this.showView({
//                 url: 'test',
//                 title: 'test',
//                 breadcrumb: [],
//                 resolve: {},
//                 init: function(v, e) {
//                     var testView = new(Store.getView('Test'))()
//                     testView.render(v);
//                     return testView;
//                 }
//             });
//         },
//         // 项目管理
//         roomManage: function () {
//             var self = this,
//                 roomService = Store.getService('Room');

//             // 首页
//             this.showView({
//                 url: 'room.manage',
//                 title: 'room manage',
//                 resolve: {
//                     rooms : function () {
//                         return roomService.getList()
//                     }
//                 },
//                 init: function(v, e) {
//                     var roomManageView = new(Store.getView('RoomManage'))()
//                     roomManageView.render(v);
//                     return roomManageView;
//                 }
//             });
//         },
//         // 接口列表
//         apiList: function (name, params) {
//             var self = this,
//                 apiService = Store.getService('Api'),
//                 hashParams = Store.formatUrlHash(params),
//                 type = hashParams.jsonParams.type,
//                 api = hashParams.jsonParams.api,
//                 method = hashParams.jsonParams.method,
//                 status = '';

//             if ( type == 'create' ) {
//                 status = 'create';
//             } else {
//                 if ( !!api ) {
//                     api = api.toLowerCase()
//                     status = 'api';
//                     method = method || 'preview';
//                 }
//             }

//             self.showView({
//                 url: 'api.list',
//                 title: 'api list',
//                 resolve: {
//                     api : function () {
//                         return apiService.getList(name);
//                     },
//                     curApi : function () {
//                         var res = {};

//                         if ( status == 'api' ) {
//                             return apiService.getApiDetail(name, api);
//                         }

//                         return res;
//                     },
//                     roomName : name,
//                     status : {
//                         type : status,
//                         api : api
//                     },
//                     method : method
//                 },
//                 init: function(v, tempData) {
//                     var apiListView = new(Store.getView('ApiList'))()
//                     apiListView.render(v, tempData);
//                     return apiListView;
//                 }
//             });
//         },
// /**
//  * <p> 初始化，绑定全局事件
//  * <p> 初始化 layout view
//  * <p> 初始化 公共面包屑
//  * <p> 初始化 本地的登录信息(cookie)
//  * <p> 绑定 PV 检测
//  * <p> 绑定 移动端按钮的公共 active 样式
//  * <p> 绑定 点击返回顶部
//  * <p> 绑定 内容区顶部白色菜单
//  * <p> 绑定 内容区灰色菜单
//  * <p> 绑定 live800 弹窗
//  * <p> 绑定 显示/隐藏 微信二维码
//  * <p> 绑定 显示/隐藏 切换中英文菜单
//  * @author 徐晨 ( xuchen@smartisan.com )
//  */
//         bindLayout: function() {
//             var self = this;
//             if (self.initLayout) {
//                 return false;
//             }
//             self.initLayout = true;

//             // 初始化 layout 单例模式，不需要赋值
//             Store.getView('Layout');
//             // 获取本地登录状态
//             UserService.getInfo(true);


//             return Store.proxyDefer();

//         },
// /**
//  * @name Router#showView
//  * @event
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 场景页面初始化
//  * @param {String}      view                    view 参数
//  * @param {String}      view.title              浏览器标签名称
//  * @param {String}      view.url                page template url
//  * @param {Boolean}     view.isHub              router hub
//  * @param {JSON}        view.hashParams         hash params
//  * @param {Array}       view.breadcrumb         面包屑
//  * @param {Boolean}     view.mobileScreen       [可选] 是否需要适配移动端
//  * @param {Boolean}     view.hideCart           [可选] 是否隐藏公共购物车
//  * @param {JSON}        view.tempData           page template data
//  * @param {JSON}        view.resolve            预加载数据
//  * @param {jQuery}      view.container          [可选] 内容填充区包裹
//  * @param {Function}    view.init               页面模板加载完成之后的回调事件
//  * @param {Boolean}     view.userRequired       是否需要登录
//  * @param {Boolean}     reload                  是否强制重新渲染页面
//  * @example
// Router.showView({
//     url: 'tpl-name',
//     title: 'title',
//     mobileScreen: true | false,
//     breadcrumb: [
//         {
//             nav: 'nav'
//         }
//     ],
//     resolve: {
//         status : '直接使用变量',
//         list : function(){
//             return service.medth();
//         },
//         other : function(){
//             return service.medth().then(function(response){
//                 response.add = 'add';
//                 return response;
//             });
//         }
//     },
//     init: function(v, e) {
//         var view = new ( Store.getView('ViewName') )();
//         view.render(v);

//         // 切换不同页面时，会自动删除上一个使用的 view
//         return view;
//     }
// });
//  */
//         showView: function(view, reload) {
//             var self = this,
//                 tempData = view.tempData || {},
//                 $layoutContainer = view.container || Store.config.layoutContainer,
//                 cachePage = ct.get(view.url, true),
//                 pageDefer,
//                 resolve = {
//                     key: [],
//                     value: []
//                 },
//                 breadcrumb = view.breadcrumb,
//                 breakView,
//                 $pageLoading = Store.config.pageLoading;



//             // 判断是否为新的场景

//             if ( view.hashParams && !view.isHub && !reload ) {

//                 var baseUrl = Store.formatUrlToParams().base,
//                     hashParams = Store.formatUrlHash( view.hashParams );

//                 view.hashCache = {
//                     base : baseUrl,
//                     updateParams : hashParams
//                 };
                
//                 if (
//                     Store.currentView.hashCache 
//                     && Store.currentView.hashCache.base == baseUrl
//                     && Store.currentView.viewCache
//                     && typeof Store.currentView.viewCache.updateView == 'function' 
//                 ) {
//                     var preHashParams = Store.currentView.hashCache.updateParams;

//                     Store.currentView.hashCache = view.hashCache;

//                     Store.currentView.viewCache.updateView( Store.formatHashAction(preHashParams, hashParams) );
//                     return false;
//                 }
//             }

//             // 移除旧的 view
//             if ( Store.currentView.viewCache && typeof Store.currentView.viewCache.remove == 'function' ) {
//                 Store.currentView.viewCache.remove();
//             }

//             Store.currentView = view;

//             Store.reloadView = function () {
//                 self.showView(view, true);
//             }

//             // link page by verify userRequired
//             self.initLayout.always(function() {

//                 // 关闭所有弹出框
//                 Store.getPlugin('Dialog').closeAll();            

//                 // 定义页面请求 有缓存或者没有缓存
//                 if (cachePage) {
//                     pageDefer = Store.proxyDefer(cachePage);
//                 } else {
//                     pageDefer = ct.get(view.url);
//                     // ct.get(view.url);
//                 }

//                 // 解绑事件
//                 self.unbindLayout();

//                 $layoutContainer.off().empty();
//                 // 显示page－loading页面
//                 $pageLoading.show(); 

//                 // 预加载数据 ==> 发起请求
//                 if (view.resolve) {
//                     $.each(view.resolve, function(key, value) {
//                         resolve.key.push(key);

//                         var cacheResolve = typeof value == 'function' ? value() : value;

//                         if (typeof cacheResolve == 'object' && typeof cacheResolve.done == 'function') {
//                             resolve.value.push(cacheResolve);
//                         } else {
//                             resolve.value.push(Store.proxyDefer([cacheResolve]));
//                         }
//                     });
//                 }   

//                 // 预加载数据 ==> 全部请求完毕
//                 $.when.apply(jQuery, resolve.value)
//                     .done(function() {
//                         // 未登录状态载入需要登录的页面
//                         if (view.userRequired && !UserService.isLoggedIn) {
//                             UserService.openLogin();
//                             return false;
//                         }

//                         $.each(arguments, function(index, item) {

//                             tempData[resolve.key[index]] = item && item.constructor == Array ? item[0] : item;
//                             if (tempData[resolve.key[index]] === false) {
//                                 breakView = true;
//                                 return false;
//                             }

//                         });

//                         if (breakView) {
//                             return false;
//                         }

//                         view.tempData = tempData;

//                         // 页面初始化
//                         pageDefer.always(function($container) {
//                             $(document).scrollTop(0);
//                             document.title = view.title + ' - Chameleon';

//                             // 预加载面包屑导航
//                             if ( typeof breadcrumb != 'undefined' ) {
//                                 self.initBreadcrumb(breadcrumb);
//                             }
//                         })
//                         .done(function(result, statusText, defer) {

//                             // 隐藏page－loading页面
//                             $pageLoading.hide(); 

//                             // var start = +(new Date());
//                             $layoutContainer.html(ct.compile(result, tempData));

//                             // var end = +(new Date());

//                             // console.log(end - start);

//                             view.html = result;
//                             view.$page = $layoutContainer.find('.content');

//                             Store.currentView = view;
//                             if ( typeof view.init == 'function' ) {
//                                 Store.currentView.viewCache = view.init(view, tempData);
//                             }
//                         })
//                         .fail(function(defer, status, statusText) {
//                             // self.notFound()
//                         });
//                     }).fail(function(error, errorInfo) {
//                         // 非正常报错
//                         if ( !error ) {
//                             return false;
//                         }

//                         if ( error != 10004 && error != 1000 && error != 70000 ) {
//                             window.location.href = '#/';
//                         }
//                     });
//             });
//         },
//         /**
//          * @description <p> 解绑 scroll 事件
//          *              <p> 清除所有计时器事件
//          *              <p> PC 端绑定“返回顶部”的事件
//          * @author 徐晨 ( xuchen@smartisan.com )
//          */
//         unbindLayout: function() {

//             $.each(Store.loop, function (key, value) {
//                 clearInterval(Store.loop[key]);
//             });

//             $(window).off('scroll');
//             $('.breadcrumb').html('');

//             if ( !Store.config.isMobile ) {
//                 $(window).scroll(function(){
//                     if ($(window).scrollTop() > 0){
//                         $('#returnTop').animate({'bottom':'10px'},{queue:false,duration:200});
//                     }else{
//                         $('#returnTop').animate({'bottom':'-40px'},{queue:false,duration:200});
//                     }
//                 });
//             }
//         },
// /**
//  * @name Router#initBreadcrumb
//  * @event
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 渲染导航面包屑 <br/>
//  *              默认第一级目录为：在线商城 <br/>
//  *              最末一级目录不可点击
//  * @param  {Array}     navlist        面包屑的数据
//  * @param  {String}    navlist.nav    面包屑的名称
//  * @param  {String}    navlist.url    面包屑的跳转 URL
//  * @example
// Router.initBreadcrumb([
//     {
//         'nav': '第二级目录',
//         'url': '#/second'
//     },
//     {
//         'nav': '第三级目录',
//         'url': '#/last'
//     }
// ]);
//  */
//         initBreadcrumb: function(navlist) {
//             var result = '';
//             var sigma = ' > ';
//             var baseBreadcrumb = [{
//                 nav : '在线商城',
//                 url : '#/'
//             }];
//             navlist = baseBreadcrumb.concat(navlist);

//             // if (navlist.length > 1) {
//                 for (var i = 0, l = navlist.length - 1; i < l; i++) {
//                     result += '<a href="' + navlist[i].url + '">' + navlist[i].nav + '</a>';
//                     result += sigma;
//                 }
//                 result += navlist[navlist.length - 1].nav;
//             // }
//             $('.breadcrumb').html(result);
//         }
//     });

//     Store.Router = new Router();
//     Backbone.history.start({});

// });