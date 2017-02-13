/**
* @fileOverview store.js 公共模块框架
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2014-5-19
* @update：2016-05-23
* @version 1.1
*/

import {mainConfig} from './config.js';

class Tools {
    /**
     * @author 徐晨
     * @name Tools
     * @class 模块介绍
     * @constructor
     */
    constructor() {}

    /**
     * 返回数据类型
     */
    isType (arg, type) {
        return Object.prototype.toString.call(arg) === '[object ' + type + ']';
    }

    /**
     * 判断数据类型是否为 String
     */
    isString (arg) {
        return this.isType(arg, 'String');
    }

    /**
     * 判断数据类型是否为 Array
     */
    isArray (arg) {
        return this.isType(arg, 'Array');
    }

    /**
     * 判断数据类型是否为 Function
     */
    isFunction (arg) {
        return this.isType(arg, 'Function');
    }

    /**
     * 判断数据类型是否为 Boolean
     */
    isBoolean (arg) {
        return this.isType(arg, 'Boolean');
    }

    /**
     * 判断数据类型是否为 Object
     */
    isObject (arg) {
        return this.isType(arg, 'Object');
    }
}

class StoreApp extends Tools {
    /**
     * 数据存储
     * @type {Object}
     */
    storeModel = {};

    /**
     * @author 徐晨
     * @name StoreApp
     * @class 商城业务框架
     * @constructor
     */
    constructor () {
        super();

        // 所有配置
        this.config = {};
    }

    /**
     * @name StoreApp#initConfig
     * @description 初始化默认配置与系统配置
     * @event
     */
    initConfig () {
        let userAgent = navigator.userAgent.toLowerCase();
        let __config = {
            /**
             * 公共Ajax错误信息map
             * @type Object
             * @default {}
            */
            errorMap: {},
            /**
             * 是否为IE浏览器
             * @type Boolean
             * @default {}
            */
            isIE: /msie/.test(userAgent),
            /**
             * 是否为IE6浏览器
             * @type Boolean
             * @default {}
            */
            isIE6: /msie 6/.test(userAgent),
            /**
             * 是否为IE浏览器 并且版本为7~8
             * @type Boolean
             * @default {}
            */
            isHackIE: /msie [7-8]/.test(userAgent),
            /**
             * 是否为webkit浏览器
             * @type Boolean
             * @default {}
            */
            isWebkit: /webkit/.test(userAgent),
            /**
             * 是否为firefox浏览器
             * @type Boolean
             * @default {}
            */
            isFirefox: /firefox/.test(userAgent),
            /**
             * 是否为 PC
             * @type Boolean
             * @default {}
            */
            isWindows: /windows/.test(userAgent),
            /**
             * 是否为 Linux
             * @type Boolean
             * @default {}
            */
            isLinux: /linux/.test(userAgent),
            /**
             * 是否为 Mac
             * @type Boolean
             * @default {}
            */
            isMac: /mac/.test(userAgent)
        };

        /**
         * 是否为IE高版本浏览器 并且版本为9~11
         * @type Boolean
         * @default {}
        */
        __config.isNormalIE = ( __config.isIE && !__config.isIE6 && !__config.isHackIE );

        $.each(__config, (key, value) => mainConfig.setParam(key, value));

        this.config = mainConfig;
    }

    /**
     * @name StoreApp#initBrowser
     * @description 初始化浏览器信息，body 上添加相关样式
     * @event
     */
    initBrowser () {
        $('body').toggleClass('browser-ie', this.config.isIE);
        $('body').toggleClass('browser-ie6', this.config.isIE6);
        $('body').toggleClass('browser-hack-ie', this.config.isHackIE);
        $('body').toggleClass('browser-normal-ie', this.config.isNormalIE);
        $('body').toggleClass('browser-webkit', this.config.isWebkit);
        $('body').toggleClass('browser-firefox', this.config.isFirefox);
        $('body').toggleClass('browser-windows', this.config.isWindows);
        $('body').toggleClass('browser-linux', this.config.isLinux);
        $('body').toggleClass('browser-mac', this.config.isMac);
        $('body').toggleClass('browser-wap', this.config.isMobile);
    }

    run () {
        this.initConfig();
        this.initBrowser();
    }

    // Deferred proxy to done
    proxyDefer (value) {
        return $.Deferred().resolve(value).promise();
    }

    // Deferred proxy to fail
    proxyDeferError (value) {
        return $.Deferred().reject(value).promise();
    }

    /**
     * 使用 model
     * @param  {String}    name        数据包的名称
     * @param  {Bollean}   useSingle   [可选]是否使用独立的数据
     * @return {Object}               Model
     */
    useModel (name, useSingle) {
        if ( useSingle || !this.isString(name) ) {
            return new Model();
        }

        if ( !this.storeModel[name] ) {
            this.storeModel[name] = new Model();
        }

        return this.storeModel[name];
    }
}

class Model extends Tools {
    /**
     * 数据存储
     * @type {Object}
     */
    model = {};

    /**
     * 更新的数据
     * @type {Object}
     */
    updateData = {
        add: [],
        change: [],
        remove: []
    };

    /**
     * @author 徐晨
     * @name Model
     * @class 模块介绍
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * set model
     * @param {String}   name                 需要修改的属性名称
     * @param {String}   value                需要修改的值
     * @param {JSON}     replace              [可选]是否替换原先数据
     * @param {JSON}     value.filter         [可选]筛选条件
     * @param {String}   value.filter.key     [可选]需要替换的数据
     * @param {JSON}     value.filter.value   [可选]需要替换的数据
     * @param {JSON}     value.data           [可选]需要替换的数据
     */
    set (name, value, replace) {
        let prevValue = this.get(name);

        // 使用替换功能
        if ( !!replace ) {

            const option = value;

            value = this.get(name);

            if ( !option.filter || !option.filter.key || !option.data ) {
                throw new Error('Model Set: 替换方法缺少参数');
            }

            // array 类型的数据
            if ( this.isArray(value) ) {
                value = value.map(function (item) {
                    if ( item[option.filter.key] == option.filter.value ) {
                        return option.data;
                    }

                    return item;
                });
            }
            // JSON 类型的数据
            else if ( this.isObject(value) ) {
                value[option.filter.key] = option.data;
            }
            else {
                value = option.data;
            }

        }

        // JSON 类型的数据
        if ( this.isObject(value) ) {

            // 遍历出修改的或者删除的数据
            $.each(prevValue, function (k, v) {
                if ( value[k] != v ) {
                    this.updateData.change.push({
                        name,
                        key: k,
                        prev: v,
                        value: value[k]
                    });

                    if ( value[k] === undefined ) {
                        this.updateData.add.push({
                            name,
                            key: k,
                            prev: v,
                            value: value[k]
                        });
                    }

                    // 移除修改的或者相同的
                    delete prevData[k];
                }
            }.bind(this));

            // 整理后只剩下需要移除的参数，添加到 remove 数组里
            $.each(prevValue, function (k, v) {
                this.updateData.remove.push({
                    name,
                    key: k,
                    prev: v,
                    value: undefined
                });
            }.bind(this));
        }
        // 其他数据
        else {
            this.updateData.change.push({
                name,
                prev: prevValue,
                value: value
            });
        }

        this.model[name] = value;
        this.notification();
    }

    /**
     * get model
     */
    get (name) {
        return this.model[name];
    }

    /**
     * del model
     */
    del (name) {
        let prevValue = this.get(name);

        this.updateData.remove.push({
            name: name,
            prev: prevValue,
            value: undefined
        });

        delete this.model[name];
        this.notification();
    }

    /**
     * listen model
     */
    listen (name) {
        delete this.model[name];
    }

    /**
     * notification
     */
    notification () {
        this.updateData = {
            add: [],
            change: [],
            remove: []
        };
    }
}

let Store = new StoreApp();

window.Store = Store;

// When the DOM is ready, run the application.
$(function(){
    window.Store.run();
});

export { Store };
