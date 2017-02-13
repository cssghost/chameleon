webpackJsonp([2,7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(2);
	module.exports = __webpack_require__(206);


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;
	exports.mainService = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _config = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * @main-service.js 基础服务 Ajax 配置
	                                                                                                                                                           * @author wanghuijun(wanghuijun@smartisan.cn)
	                                                                                                                                                           * @update xuchen(xuchen@smartisan.com)
	                                                                                                                                                           */

	var MainService = function () {
	    /**
	     * @author 徐晨 
	     * @name MainService
	     * @class ajax
	     * @constructor
	     */

	    function MainService() {
	        _classCallCheck(this, MainService);
	    }

	    MainService.prototype.ajax = function ajax(options) {
	        // Get the full range of settings.
	        var ajaxOptions = $.extend({
	            type: 'post',
	            dataType: 'json',
	            cache: false,
	            timeout: 10 * 1000,
	            complete: function complete(request, statusText) {}
	        }, options);

	        // If the data type is JSON init common fn
	        if (ajaxOptions.dataType == 'json') {

	            // init base init
	            ajaxOptions.url = _config.mainConfig.baseUrl + ajaxOptions.url;

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;
	            delete ajaxOptions.preorder;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {

	                        var msg = '未知错误',
	                            errorKey = '';

	                        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) == 'object' && response.errInfo) {
	                            $.each(response.errInfo, function (key, value) {
	                                errorKey = key | 0;
	                                msg = value;
	                            });
	                        }

	                        var errorResult = typeof targetError == 'function' ? targetError(errorKey, msg, response) : undefined;

	                        // 需要自定义fail时在error函数中返回false,然后再fail函数中添加事件
	                        if (errorResult !== false) {
	                            errorResult = errorResult === undefined ? response.errInfo : errorResult;

	                            errorResult = !!errorResult ? errorResult : {};

	                            alert(msg);
	                        }
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                var serviceErrorStatus = defer.status | 0;

	                alert(serviceErrorStatus);
	            });
	        }

	        // If the data type is JSONP init common fn
	        if (ajaxOptions.dataType == 'jsonp') {
	            // document.domain = 'smartisan.com';
	            // $.support.cors = true;
	            var _arrData = [];

	            ajaxOptions.type = 'get';

	            // for ( var k in ajaxOptions.data ) {
	            //     _arrData.push('&data' + k + '=' + ajaxOptions.data[k] );
	            // }

	            // init base url and format data to url
	            // ajaxOptions.url = mainConfig.secureUrl + ajaxOptions.url + _arrData.join('');

	            // Proxy the success callback
	            var targetSuccess = options.success;

	            // Proxy the error callback
	            var targetError = options.error;

	            // clear custom fn and data
	            delete ajaxOptions.data;
	            delete ajaxOptions.success;
	            delete ajaxOptions.error;

	            return $.ajax(ajaxOptions).then(function (response, statusText, defer) {

	                // return success fn
	                if (response.code == 0) {
	                    var successResult = typeof targetSuccess == 'function' ? targetSuccess(response.data) : undefined;
	                    successResult = successResult === undefined ? response.data : successResult;
	                    return $.Deferred().resolve(successResult, response, defer).promise();
	                }
	                // return error fn
	                else {
	                        var msg = '未知错误',
	                            errorKey = '';

	                        // errorKey = response.errno + '';

	                        // msg = self.config.accountError[errorKey];
	                        // jsonp 的回执没有msg
	                        return $.Deferred().reject(errorKey, msg, response, defer).promise();
	                    }
	            }, function (defer, status, statusText) {
	                // if ( defer.status && (defer.status + '').match(/^4|5/) ) {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + defer.status;
	                // } else {
	                //     window.location.href = 'http://www.smartisan.com/#/error/' + 404;
	                // }
	            });
	        }

	        // Make the AJAX call not dataType is json.
	        return $.ajax(ajaxOptions);
	    };

	    return MainService;
	}();

	var mainService = new MainService();

	exports.mainService = mainService;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/** 
	* @fileOverview config.js 系统配置
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2016-05-19
	* @update：2016-05-19
	*/

	var _config = {
	    /**
	     * 浏览器判断
	     * @type Boolean
	     */
	    isMobileTerminal: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()),
	    isMobile: /iphone|android|ucweb|ucbrowser|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(navigator.userAgent.toLowerCase()) && !/ipad/i.test(navigator.userAgent.toLowerCase()),
	    isUC: /ucweb|ucbrowser/i.test(navigator.userAgent.toLowerCase()),

	    /**
	     * retina 适配判断
	     * @type Boolean
	     */
	    isRetina: window.devicePixelRatio && window.devicePixelRatio > 1.2,

	    /**
	     * 主内容区
	     * @type jQuery
	     */
	    layoutContainer: $('#main'),

	    /**
	     * page loading jQuery dom
	     * @type jQuery
	     */
	    pageLoading: $('.page-loading'),

	    /**
	     * 后台接口地址
	     * @type String
	     */
	    baseUrl: '/',

	    nodeUrl: '/',

	    /**
	     * store url
	     * @type String
	     */
	    storeUrl: 'http://store.smartisan.com/#/',

	    /**
	     * www url
	     * @type String
	     */
	    webUrl: 'http://www.smartisan.com/#/',

	    /**
	     * 默认头像地址
	     * @type String
	     */
	    defaultAvatar: CDN_HOST + 'img/default-user-avatar.png',

	    /**
	     * 付款 url
	     * @type String
	     */
	    paymentUrl: '/index.php?r=',

	    /**
	     * 付款 code
	     * @type String
	     */
	    paymentCode: {
	        weixin: '/index.php?r=Pay/CreateQRCode'
	    },

	    /**
	     * 包邮的条件：满 xx 包邮
	     * @type Number
	     */
	    postageTerm: 150
	};

	var Config = function () {
	    /**
	     * @author 徐晨 
	     * @name Config
	     * @class 商城系统的配置
	     * @constructor
	     */

	    function Config() {
	        var _this = this;

	        _classCallCheck(this, Config);

	        // init config
	        $.each(_config, function (key, value) {
	            return _this.setParam(key, value);
	        });

	        return this;
	    }

	    /**
	     * @name Config#setParam
	     * @description 设置 配置
	     * @event
	     */

	    Config.prototype.setParam = function setParam(key, value) {
	        this[key] = value;
	    };

	    _createClass(Config, [{
	        key: 'isMobileTerminal',


	        // 浏览器判断
	        get: function get() {
	            return _config.isMobileTerminal;
	        },
	        set: function set(value) {
	            _config.isMobileTerminal = value;
	        }
	    }, {
	        key: 'isMobile',
	        get: function get() {
	            return _config.isMobile;
	        },
	        set: function set(value) {
	            _config.isMobile = value;
	        }
	    }, {
	        key: 'isUC',
	        get: function get() {
	            return _config.isUC;
	        },
	        set: function set(value) {
	            _config.isUC = value;
	        }

	        // retina 适配判断

	    }, {
	        key: 'isRetina',
	        get: function get() {
	            return _config.isRetina;
	        },
	        set: function set(value) {
	            _config.isRetina = value;
	        }

	        // 主内容区

	    }, {
	        key: 'layoutContainer',
	        get: function get() {
	            return _config.layoutContainer;
	        },
	        set: function set(value) {
	            _config.layoutContainer = value;
	        }

	        // page loading jQuery dom

	    }, {
	        key: 'pageLoading',
	        get: function get() {
	            return _config.pageLoading;
	        },
	        set: function set(value) {
	            _config.pageLoading = value;
	        }

	        // 后台接口地址

	    }, {
	        key: 'baseUrl',
	        get: function get() {
	            return _config.baseUrl;
	        },
	        set: function set(value) {
	            _config.baseUrl = value;
	        }
	    }, {
	        key: 'nodeUrl',
	        get: function get() {
	            return _config.nodeUrl;
	        },
	        set: function set(value) {
	            _config.nodeUrl = value;
	        }

	        // store url

	    }, {
	        key: 'storeUrl',
	        get: function get() {
	            return _config.storeUrl;
	        },
	        set: function set(value) {
	            _config.storeUrl = value;
	        }

	        // www url

	    }, {
	        key: 'webUrl',
	        get: function get() {
	            return _config.webUrl;
	        },
	        set: function set(value) {
	            _config.webUrl = value;
	        }

	        // 默认头像地址

	    }, {
	        key: 'defaultAvatar',
	        get: function get() {
	            return _config.defaultAvatar;
	        },
	        set: function set(value) {
	            _config.defaultAvatar = value;
	        }

	        // 付款 url

	    }, {
	        key: 'paymentUrl',
	        get: function get() {
	            return _config.paymentUrl;
	        },
	        set: function set(value) {
	            _config.paymentUrl = value;
	        }
	    }, {
	        key: 'paymentCode',
	        get: function get() {
	            return _config.paymentCode;
	        },
	        set: function set(value) {
	            _config.paymentCode = value;
	        }

	        // 包邮的条件：满 xx 包邮

	    }, {
	        key: 'postageTerm',
	        get: function get() {
	            return _config.postageTerm;
	        },
	        set: function set(value) {
	            _config.postageTerm = value;
	        }
	    }]);

	    return Config;
	}();

	var mainConfig = new Config();

	exports.mainConfig = mainConfig;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;
	exports.Store = undefined;

	var _config = __webpack_require__(4);

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                          * @fileOverview store.js 公共模块框架
	                                                                                                                                                          * @author 徐晨 ( xuchen@smartisan.com )
	                                                                                                                                                          * @date：2014-5-19
	                                                                                                                                                          * @update：2016-05-23
	                                                                                                                                                          * @version 1.1
	                                                                                                                                                          */

	var Tools = function () {
	    /**
	     * @author 徐晨
	     * @name Tools
	     * @class 模块介绍
	     * @constructor
	     */

	    function Tools() {
	        _classCallCheck(this, Tools);
	    }

	    /**
	     * 返回数据类型
	     */


	    Tools.prototype.isType = function isType(arg, type) {
	        return Object.prototype.toString.call(arg) === '[object ' + type + ']';
	    };

	    /**
	     * 判断数据类型是否为 String
	     */


	    Tools.prototype.isString = function isString(arg) {
	        return this.isType(arg, 'String');
	    };

	    /**
	     * 判断数据类型是否为 Array
	     */


	    Tools.prototype.isArray = function isArray(arg) {
	        return this.isType(arg, 'Array');
	    };

	    /**
	     * 判断数据类型是否为 Function
	     */


	    Tools.prototype.isFunction = function isFunction(arg) {
	        return this.isType(arg, 'Function');
	    };

	    /**
	     * 判断数据类型是否为 Boolean
	     */


	    Tools.prototype.isBoolean = function isBoolean(arg) {
	        return this.isType(arg, 'Boolean');
	    };

	    /**
	     * 判断数据类型是否为 Object
	     */


	    Tools.prototype.isObject = function isObject(arg) {
	        return this.isType(arg, 'Object');
	    };

	    return Tools;
	}();

	var StoreApp = function (_Tools) {
	    _inherits(StoreApp, _Tools);

	    /**
	     * @author 徐晨
	     * @name StoreApp
	     * @class 商城业务框架
	     * @constructor
	     */

	    function StoreApp() {
	        _classCallCheck(this, StoreApp);

	        // 所有配置

	        var _this = _possibleConstructorReturn(this, _Tools.call(this));

	        _this.storeModel = {};
	        _this.config = {};
	        return _this;
	    }

	    /**
	     * @name StoreApp#initConfig
	     * @description 初始化默认配置与系统配置
	     * @event
	     */

	    /**
	     * 数据存储
	     * @type {Object}
	     */


	    StoreApp.prototype.initConfig = function initConfig() {
	        var userAgent = navigator.userAgent.toLowerCase();
	        var __config = {
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
	        __config.isNormalIE = __config.isIE && !__config.isIE6 && !__config.isHackIE;

	        $.each(__config, function (key, value) {
	            return _config.mainConfig.setParam(key, value);
	        });

	        this.config = _config.mainConfig;
	    };

	    /**
	     * @name StoreApp#initBrowser
	     * @description 初始化浏览器信息，body 上添加相关样式
	     * @event
	     */


	    StoreApp.prototype.initBrowser = function initBrowser() {
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
	    };

	    StoreApp.prototype.run = function run() {
	        this.initConfig();
	        this.initBrowser();
	    };

	    // Deferred proxy to done


	    StoreApp.prototype.proxyDefer = function proxyDefer(value) {
	        return $.Deferred().resolve(value).promise();
	    };

	    // Deferred proxy to fail


	    StoreApp.prototype.proxyDeferError = function proxyDeferError(value) {
	        return $.Deferred().reject(value).promise();
	    };

	    /**
	     * 使用 model
	     * @param  {String}    name        数据包的名称
	     * @param  {Bollean}   useSingle   [可选]是否使用独立的数据
	     * @return {Object}               Model
	     */


	    StoreApp.prototype.useModel = function useModel(name, useSingle) {
	        if (useSingle || !this.isString(name)) {
	            return new Model();
	        }

	        if (!this.storeModel[name]) {
	            this.storeModel[name] = new Model();
	        }

	        return this.storeModel[name];
	    };

	    return StoreApp;
	}(Tools);

	var Model = function (_Tools2) {
	    _inherits(Model, _Tools2);

	    /**
	     * @author 徐晨
	     * @name Model
	     * @class 模块介绍
	     * @constructor
	     */

	    /**
	     * 数据存储
	     * @type {Object}
	     */

	    function Model() {
	        _classCallCheck(this, Model);

	        var _this2 = _possibleConstructorReturn(this, _Tools2.call(this));

	        _this2.model = {};
	        _this2.updateData = {
	            add: [],
	            change: [],
	            remove: []
	        };
	        return _this2;
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


	    /**
	     * 更新的数据
	     * @type {Object}
	     */


	    Model.prototype.set = function set(name, value, replace) {
	        var _this3 = this;

	        var prevValue = this.get(name);

	        // 使用替换功能
	        if (!!replace) {
	            (function () {

	                var option = value;

	                value = _this3.get(name);

	                if (!option.filter || !option.filter.key || !option.data) {
	                    throw new Error('Model Set: 替换方法缺少参数');
	                }

	                // array 类型的数据
	                if (_this3.isArray(value)) {
	                    value = value.map(function (item) {
	                        if (item[option.filter.key] == option.filter.value) {
	                            return option.data;
	                        }

	                        return item;
	                    });
	                }
	                // JSON 类型的数据
	                else if (_this3.isObject(value)) {
	                        value[option.filter.key] = option.data;
	                    } else {
	                        value = option.data;
	                    }
	            })();
	        }

	        // JSON 类型的数据
	        if (this.isObject(value)) {

	            // 遍历出修改的或者删除的数据
	            $.each(prevValue, function (k, v) {
	                if (value[k] != v) {
	                    this.updateData.change.push({
	                        name: name,
	                        key: k,
	                        prev: v,
	                        value: value[k]
	                    });

	                    if (value[k] === undefined) {
	                        this.updateData.add.push({
	                            name: name,
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
	                    name: name,
	                    key: k,
	                    prev: v,
	                    value: undefined
	                });
	            }.bind(this));
	        }
	        // 其他数据
	        else {
	                this.updateData.change.push({
	                    name: name,
	                    prev: prevValue,
	                    value: value
	                });
	            }

	        this.model[name] = value;
	        this.notification();
	    };

	    /**
	     * get model
	     */


	    Model.prototype.get = function get(name) {
	        return this.model[name];
	    };

	    /**
	     * del model
	     */


	    Model.prototype.del = function del(name) {
	        var prevValue = this.get(name);

	        this.updateData.remove.push({
	            name: name,
	            prev: prevValue,
	            value: undefined
	        });

	        delete this.model[name];
	        this.notification();
	    };

	    /**
	     * listen model
	     */


	    Model.prototype.listen = function listen(name) {
	        delete this.model[name];
	    };

	    /**
	     * notification
	     */


	    Model.prototype.notification = function notification() {
	        this.updateData = {
	            add: [],
	            change: [],
	            remove: []
	        };
	    };

	    return Model;
	}(Tools);

	var Store = new StoreApp();

	window.Store = Store;

	// When the DOM is ready, run the application.
	$(function () {
	    window.Store.run();
	});

	exports.Store = Store;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	exports.__esModule = true;
	exports.filter = undefined;

	var _config = __webpack_require__(4);

	/**
	 * @author XuChen
	 * @name Filter
	 * @class 筛选器方法
	 */
	function Filter() {} /** 
	                     * @fileOverview filter.js 数据过滤器
	                     * @author 徐晨 ( xuchen@smartisan.com )
	                     * @date：2016-05-23
	                     * @update：2016-05-23
	                     */

	;

	/**
	 * to JSON
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.json = function (text, param, model) {
	    return JSON.stringify(model);
	};

	/**
	 * 人民币
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.rmb = function (text, isFloat, noSignal) {
	    if (text == undefined) {
	        return 0;
	    }
	    var str = text + '',
	        strPrev = str,
	        strLast = '';
	    if (str.match(/[^\d\.]/)) {
	        return text;
	    }
	    if (str.match(/\./)) {
	        strPrev = str.replace(/\..*$/gi, '');
	        strLast = str.replace(/^[^\.]+\.?/gi, '');
	        strLast = strLast.replace(/^(\d{1,2})\d*/, '$1');
	        strLast = strLast.length == 2 ? strLast : strLast + '0';
	    }
	    var arr = strPrev.split('').reverse(),
	        strArr = [];
	    for (var i = 0; i < arr.length; i++) {
	        if (i % 3 == 0) {
	            strArr.push(',');
	        }
	        strArr.push(arr[i]);
	    }

	    var returnResult = strArr.reverse().join('').replace(/\,$/gi, '');
	    returnResult = noSignal ? returnResult : '¥ ' + returnResult;

	    if (typeof isFloat == 'boolean' && isFloat || isFloat == 'true') {
	        returnResult = returnResult + '.' + (strLast == '' ? '00' : strLast);
	    }

	    return returnResult;
	};

	/**
	 * 返回不带¥标记的数值
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.decimal = function (text, isFloat) {
	    var self = this;
	    var returnResult = self.rmb(text, isFloat),
	        index = returnResult.indexOf('¥ ');
	    returnResult = index >= 0 ? returnResult.substr(index + 2) : returnResult;
	    return returnResult;
	};

	/**
	 * 人民币 运算
	 * @type Function
	 * @param {nuber}   [first]     第一运算数
	 * @param {number}  [second]    第二运算数
	 * @param {boolean} [isSum]     是否为加法
	 */
	Filter.prototype.rmbCount = function (first, second, isSum) {
	    var first = first || 0,
	        second = second || 0;

	    if (isSum) {
	        return (first * 100 + second * 100) / 100;
	    } else {
	        return (first * 100 - second * 100) / 100;
	    }
	};

	/**
	 * 双精度 运算
	 * @type Function
	 * @param {number} 字符串
	 */
	Filter.prototype.floatNumber = function (number, isFloat) {
	    var str = number + '',
	        strPrev = str,
	        strLast = '';

	    if (str.match(/[^\d\.]/)) {
	        return number;
	    }

	    if (str.match(/\./)) {
	        strPrev = str.replace(/\..*$/gi, '');
	        strLast = str.replace(/^[^\.]+\.?/gi, '');
	        strLast = strLast.replace(/^(\d{1,2})\d*/, '$1');
	        strLast = strLast.length == 2 ? strLast : strLast + '0';
	    }

	    if (isFloat) {
	        return strPrev + '.' + (strLast == '' ? '00' : strLast);
	    } else {
	        return strPrev + '.' + (strLast == '' ? '00' : strLast) - 0;
	    }
	};

	/**
	 * 移动电话加密
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.codeTelephone = function (text) {
	    var parseData = '';
	    if (text) {
	        text = '' + text;
	        parseData = text.replace(/^(\d{3})\d{5}/g, function ($0, $1) {
	            return $1 + '*****';
	        });
	    }
	    return parseData;
	};

	/**
	 * 移动电话加密
	 * @param {String}  text    字符串
	 * @param {Number}  length  要截取的位数
	 */
	Filter.prototype.ellipsis = function (text, length) {
	    var text = text + '',
	        response = '',
	        transformText = text.replace(/[^\x00-\xff]/g, '>>');

	    // 如果未超过需要截取的字符数，直接返回当前字符串
	    if (transformText.length <= length * 2) {
	        return text;
	    }

	    // 把双字节的字符转为 ">>"
	    // 截取所需要的字符串
	    // 转换成数组
	    var split = transformText.substr(0, length * 2).split('>>'),
	        n = 0;

	    $.each(split, function (index, item) {
	        // 为双字节字符的时候
	        if (item == '') {
	            response += text.substr(n, 1);
	            n++;
	        }
	        // 其他字符
	        else {
	                response += text.substr(n, item.length);
	                n = n + item.length;
	            }
	    });

	    return response + '...';
	};

	/**
	 * 获得邮箱地址
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.emailLocation = function (text) {
	    var parseData = '';
	    if (text) {
	        text = '' + text;
	        parseData = text.replace(/^.+\@/g, '');
	        if (Store.config.mailUrl[parseData]) {
	            parseData = Store.config.mailUrl[parseData];
	        } else {
	            parseData = 'http://mail.' + parseData;
	        }
	    }
	    return parseData;
	};

	/**
	 * 是否显示
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.boolShow = function (isShow) {
	    var showClass = 'fn-hide';
	    if (isShow) {
	        showClass = ' ';
	    }
	    return showClass;
	};

	/**
	 * 根据布尔值加载不同样式
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.boolClass = function (isShow, trueClass, falseClass) {
	    var showClass = '';
	    if (isShow) {
	        showClass = trueClass || ' ';
	    } else {
	        showClass = falseClass || ' ';
	    }
	    return showClass;
	};

	/**
	 * 根据布尔值返回不同结果
	 * @type Function
	 * @param {text} 字符串
	 */
	Filter.prototype.boolResult = function (bool, trueResult, falseResult) {
	    var result = '';
	    if (bool) {
	        result = trueResult || ' ';
	    } else {
	        result = falseResult || ' ';
	    }
	    return result;
	};

	/**
	 * 返回未来的 xx 天 的 date
	 * @type Function
	 * @param {number} xx 天
	 */
	Filter.prototype.nextDate = function (day) {
	    var _date = new Date(),
	        day = day | 0;

	    _date.setDate(_date.getDate() + day);

	    return _date;
	};

	/**
	 * 输出一个有效地时间戳
	 * @type Function
	 * @param {Date} 时间戳
	 */
	Filter.prototype.timestamp = function (timestamp) {
	    if (timestamp) {
	        timestamp += '';
	        if (timestamp.length > 13) {
	            throw Error('method ==> filter timestamp: date is error');
	        } else {
	            timestamp = timestamp * Math.pow(10, 13 - timestamp.length);
	        }

	        timestamp -= 0;

	        return timestamp;
	    }
	    return 0;
	};

	/**
	 * 日期过滤
	 * @type Function
	 * @param {Date} 时间戳
	 */
	Filter.prototype.date = function (timestamp, format) {
	    var timestamp = this.timestamp(timestamp);

	    if (timestamp) {

	        var format = format;

	        var _date = new Date(timestamp);
	        var _year = _date.getFullYear();
	        var _month = _date.getMonth() + 1 + '';
	        var _day = _date.getDate() + '';
	        var _hour = _date.getHours() + '';
	        var _minute = _date.getMinutes() + '';
	        var _second = _date.getSeconds() + '';

	        _month = _month.length == 2 ? _month : '0' + _month;
	        _day = _day.length == 2 ? _day : '0' + _day;
	        _hour = _hour.length == 2 ? _hour : '0' + _hour;
	        _minute = _minute.length == 2 ? _minute : '0' + _minute;
	        _second = _second.length == 2 ? _second : '0' + _second;

	        switch (format) {
	            case 'year':
	                format = 'YYYY 年 MM 月 DD 日';
	                break;
	            case 'date':
	                format = 'M 月 D 日 hh-mm';
	                break;
	            default:
	                break;
	        }

	        // var reg = /^[^YMDhms]*(YYYY)*[^YMDhms]*(MM)*[^YMDhms]*(DD)*[^YMDhms]*(hh)*[^YMDhms]*(mm)*[^YMDhms]*(ss)*[^YMDhms]*$/gi;

	        format = format.replace('YYYY', _year);
	        format = format.replace('MM', _month);
	        format = format.replace('M', _month.replace(/^0{1}/gi, ''));
	        format = format.replace('DD', _day);
	        format = format.replace('D', _day.replace(/^0{1}/gi, ''));

	        format = format.replace('hh-mm', 'hh:mm');

	        format = format.replace('hh', _hour);
	        format = format.replace('mm', _minute);
	        format = format.replace('ss', _second);

	        return format;
	    }
	    return ' ';
	};

	/**
	 * 某一段的时间的时间戳转为真实时间, 时间戳的单位为 >>秒<<
	 * @type Function
	 * @param {timestamp} [timestamp] 时间戳
	 * @return {String} 具体时间或者空字符串
	 */
	Filter.prototype.realtime = function (timestamp, format) {

	    if (timestamp || timestamp == 0) {

	        // timestamp /= 1000;

	        var day = Math.floor(timestamp / 24 / 60 / 60),
	            hourStamp = timestamp - day * 24 * 60 * 60,
	            hour = Math.floor(hourStamp / 60 / 60),
	            minStamp = hourStamp - hour * 60 * 60,
	            min = Math.floor(minStamp / 60),
	            second = minStamp - min * 60;

	        var strDay = '',
	            strHour = '',
	            strMin = '',
	            strSecond = '';

	        switch (format) {
	            case 'date':
	                strDay = day;
	                strHour = ':' + (hour < 10 ? '0' + hour : hour);
	                strMin = ':' + (min < 10 ? '0' + min : min);
	                strSecond = ':' + (second < 10 ? '0' + second : second);
	                break;
	            case 'day':
	                if (day > 0) {
	                    strDay = day + ' 天';
	                } else {
	                    if (hour > 0) {
	                        strHour = hour + ' 小时';
	                    } else {
	                        if (min > 0) {
	                            strMin = min + ' 分钟';
	                        } else {
	                            strSecond = second + ' 秒';
	                        }
	                    }
	                }
	                break;
	            default:
	                strDay = day > 0 ? ' ' + day + ' 天' : '';
	                strHour = hour > 0 || day > 0 ? ' ' + hour + ' 小时' : '';
	                strMin = min > 0 || day > 0 || hour > 0 ? ' ' + min + ' 分钟' : '';
	                strSecond = ' ' + second + ' 秒';

	                break;
	        }

	        return strDay + strHour + strMin + strSecond;
	    }

	    return ' ';
	};

	/**
	 * 距离当前时间的间隔时间
	 * @type Function
	 * @required realtime
	 * @param {timestamp} [timestamp] 时间戳
	 * @return {String} 具体时间或者空字符串
	 */
	Filter.prototype.remainingtime = function (timestamp, nowTime, format) {
	    var self = this,
	        timestamp = this.timestamp(timestamp),
	        nowTime = this.timestamp(nowTime);

	    if (timestamp) {

	        var difference = Math.floor(Math.abs(nowTime - timestamp) / 1000);

	        return self.realtime(difference, format);
	    }

	    return ' ';
	};

	/**
	 * 距离当前时间的间隔时间
	 * @type Function
	 * @param {JSON}        [options]             配置数据
	 * @param {Number}      [options.time]        要显示的倒计时数字,单位为秒
	 * @param {jQuery}      [options.$label]      输出的 dom
	 * @param {Function}    [options.callback]    回调函数
	 * @param {Function}    [options.format]      数据整理方法
	 * @param {Function}    [options.abort]       主动中止方法
	 */
	Filter.prototype.countdown = function (options) {
	    var self = this;

	    var timeout = Store.loop['countdown' + +new Date()] = setInterval(function () {

	        if (Store.isFunction(options.abort) && !options.abort()) {
	            clearInterval(timeout);
	            return false;
	        }

	        Store.isFunction(options.format) ? options.$label.text(options.format(options.time)) : options.$label.text(options.time);

	        if (options.time <= 0) {
	            typeof options.callback == 'function' && options.callback();
	            clearInterval(timeout);
	        } else {
	            options.time--;
	        }
	    }, 1000);
	};

	/**
	 * 匹配 retina 图片
	 * @param  {string}             [src] 图片路径
	 * @param  {bool}               [keepPath] 保持路径
	 */
	Filter.prototype.retinaImage = function (src, keepPath) {
	    if (!src) {
	        return '';
	    } else {
	        var isRetina = Store.config.isRetina;

	        if (isRetina) {
	            var splitSrc = src.split('/');
	            var realSrc = splitSrc.pop().replace('@2x', '').replace(/(\.[^.]+)$/, '@2x$1');
	            var path = splitSrc.join('/');

	            if (keepPath) {
	                return path + '/' + realSrc;
	            }

	            return path + '/retina/' + realSrc;
	        } else {
	            return src;
	        }
	    }
	};

	/**
	 * 获取图片真实尺寸
	 * @param  {string} size 图片路径
	 * @return {string}      图片宽高
	 * @example 获取宽高60px的图片
	 *          "/img/logo/" ==> /img/logo/60X60@2x.png retina版
	 *                       ==> /img/logo/60X60.png    普通版
	 */
	Filter.prototype.realImage = function (src, size, suffix) {

	    var suffix = suffix || 'jpg';

	    if (!src) {
	        return '';
	    } else if (src.indexOf('.png') > -1) return src;else {
	        var isRetina = Store.config.isRetina;
	        var realSrc = '';
	        realSrc = isRetina ? src + size + 'X' + size + '@2x.' + suffix : src + size + 'X' + size + '.' + suffix;
	        return realSrc;
	    }
	};

	/**
	 * 获取指定名称的图片
	 * @param  {string} size 图片路径
	 * @return {string}      图片宽高
	 * @example 获取宽高60px的图片
	 *          "/img/logo/" ==> /img/logo/60X60@2x.png retina版
	 *                       ==> /img/logo/60X60.png    普通版
	 */
	Filter.prototype.renameImage = function (src, name) {
	    if (!src) {
	        return '';
	    } else if (src.indexOf('.png') > -1) {
	        return src;
	    } else {
	        var isRetina = Store.config.isRetina;
	        var realSrc = '';
	        // realSrc = isRetina ? (src + name +'@2x.jpg') : (src + name + '.jpg');
	        realSrc = src + name + '@2x.jpg';
	        return realSrc;
	    }
	};

	/**
	 * 商品详情页，判断当前参数是否缺货，返回class
	 * @param  {bool} 是否缺货状态
	 * @return {string}  缺货:soldout
	 */
	// Filter.prototype.isSoldout = function(soldout) {
	//     console.log('soldout: %o,',soldout);
	//     return soldout ? 'soldout': ''
	// }

	Filter.prototype.mobileStock = function (list, calssName) {
	    var stock = false;

	    $.each(list, function (index, item) {
	        if (item.stock) {
	            stock = true;
	            return false;
	        }
	    });

	    return stock ? '' : calssName;
	};

	/**
	 * 截取指定长度字符串
	 * 处理中英文
	 * @param  {String} str       
	 * @param  {Number} maxLength 
	 * @return {String}           
	 */
	Filter.prototype.subString = function (str, maxLength) {
	    str = str || '';
	    var reg = /[^\x00-\xff]/g;

	    if (str.replace(reg, 'mm').length <= maxLength) return str;

	    var m = Math.floor(maxLength / 2);
	    for (var i = m; i < str.length; i++) {
	        if (str.substr(0, i).replace(reg, 'mm').length >= maxLength) {
	            return str.substr(0, i) + '..';
	        }
	    }
	    return str + '..';
	};

	var filter = new Filter();

	exports.filter = filter;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @author 徐晨 xu chen ( xuchen@smartisan.com )
	                                                                                                                                                                                                                                                   * @description template-manager.js
	                                                                                                                                                                                                                                                   * @name ctCompile
	                                                                                                                                                                                                                                                   * @class 模板引擎
	                                                                                                                                                                                                                                                   * @constructor
	                                                                                                                                                                                                                                                   * @extends jQuery
	                                                                                                                                                                                                                                                   */

	var _config = __webpack_require__(4);

	var _filter = __webpack_require__(204);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 代码压缩时 window.ctCaches 赋值所有的模板文件
	window.ctCaches = window.ctCaches || {};

	var reg = {
	    template: /\<script id=\"([^\"]+)\"[^\>]*\>([\s\S]*?)\<\/script\>/gi,
	    include: /\{\{[^{]{0}\binclude\b\s+([^\s\}]+)\s*\}\}/,
	    each: /([^\(\s\,]+)\,\s*([^\)\s\,]+)/,
	    openTag: '{{',
	    openTagString: '{{',
	    closeTag: '}}',
	    closeTagString: '}}'
	};

	var config = {
	    compress: true,
	    escape: true,
	    debug: false
	};

	var isNewEngine = ''.trim; // '__proto__' in {}
	var arrOutCode = isNewEngine ? ['$out="";', '$out+=', ';', '$out'] : ['$out=[];', '$out.push(', ');', '$out.join("")'];

	// 静态分析模板变量
	var KEYWORDS =
	// 关键字
	'break,case,catch,continue,debugger,default,delete,do,else,false' + ',finally,for,function,if,in,instanceof,new,null,return,switch,this' + ',throw,true,try,typeof,var,void,while,with'

	// 保留字
	 + ',abstract,boolean,byte,char,class,const,double,enum,export,extends' + ',final,float,goto,implements,import,int,interface,long,native' + ',package,private,protected,public,short,static,super,synchronized' + ',throws,transient,volatile'

	// ECMA 5 - use strict
	 + ',arguments,let,yield' + ',undefined';

	var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
	var SPLIT_RE = /[^\w$]+/g;
	var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
	var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
	var BOUNDARY_RE = /^,+|,+$/g;
	var SPLIT2_RE = /^$|,+/;

	var escapeMap = {
	    "<": "&#60;",
	    ">": "&#62;",
	    '"': "&#34;",
	    "'": "&#39;",
	    "&": "&#38;"
	};

	var caches = {};

	var escapeFn = function escapeFn(s) {
	    return escapeMap[s];
	};

	var escapeHTML = function escapeHTML(content) {
	    return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
	};

	var toString = function toString(value, type) {

	    if (typeof value !== 'string') {

	        type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	        if (type === 'number') {
	            value += '';
	        } else if (type === 'function') {
	            value = toString(value.call(value));
	        } else {
	            value = '';
	        }
	    }

	    return value;
	};

	var ParseTemplate = function () {
	    /**
	     * @author 徐晨 
	     * @name ParseTemplate
	     * @class 整理模板
	     * @constructor
	     * @param {String}     template    模板字符串 
	     * @param {Bollean}    debug       是否执行 debug 模式 
	     */

	    function ParseTemplate(template) {
	        var debug = arguments.length <= 1 || arguments[1] === undefined ? config.debug : arguments[1];

	        _classCallCheck(this, ParseTemplate);

	        var self = this;

	        self.debug = debug;

	        self.uniq = {
	            $data: true,
	            $utils: true,
	            $filters: true,
	            $out: true,
	            $line: 1,
	            mainConfig: true
	        };

	        // self.filters = filter;

	        self.line = 1;

	        self.code = '';

	        var headerCode = '\'use strict\';' + 'var $utils=$utils,$filters=$utils.$filters,$uis=$utils.$uis,mainConfig=$utils.$mainConfig,' + (debug ? '$line=0,' : '');

	        var mainCode = arrOutCode[0];

	        var footerCode = 'return new String(' + arrOutCode[3] + ');';

	        // 插入动态模板
	        template = self.include(template);

	        self.template = template;

	        var __arrSplitOpen = template.split(reg.openTag);

	        var _parseResult;

	        $.each(__arrSplitOpen, function (index, splitClose) {

	            splitClose = splitClose.split(reg.closeTag);

	            var $0 = splitClose[0];
	            var $1 = splitClose[1];

	            if (splitClose.length == 1) {
	                mainCode += self.parseHtml($0);
	            } else {

	                _parseResult = self.parseCode($0, headerCode);

	                mainCode += _parseResult.code;

	                headerCode = _parseResult.headerCode;

	                if ($1) {
	                    mainCode += self.parseHtml($1);
	                }
	            }
	        });

	        // console.log(headerCode);
	        // console.log(mainCode);

	        // headerCode = 'console.log($utils);' + headerCode;

	        var code = headerCode + mainCode + footerCode;

	        // console.log('\n=====================================================================');
	        // console.log(code);
	        // console.log('=====================================================================\n');

	        self.code = code;

	        return self;
	    }

	    /**
	     * 嵌入动态模板
	     * @param  {String}    template    模板名称
	     * @return {String}                动态模板
	     */


	    ParseTemplate.prototype.include = function include(template) {
	        template = template.replace(reg.include, function ($0, $1) {

	            var dynamicTemp = ct.get($1, true);

	            if (dynamicTemp) {
	                return dynamicTemp;
	            } else {
	                return ' ';
	            }
	        });

	        if (reg.include.test(template)) {
	            return this.include(template);
	        }

	        return template;
	    };

	    /**
	     * 编译模板
	     */


	    ParseTemplate.prototype.compile = function compile() {

	        var code = this.code;

	        // 调试语句
	        if (this.debug) {
	            code = 'try{' + code + '}catch(e){' + 'throw {' + 'name:"Render Error",' + 'message:e.message,' + 'line:$line,' + 'source:' + this.formatCode(this.template) + '.split(/\\n/)[$line-1].replace(/^\\s+/,"")' + '};' + '}';
	        }

	        try {

	            var Render = new Function('$data', '$utils', code);
	            Render.prototype = ct.utils;

	            return Render;
	        } catch (e) {

	            if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) == 'object') {
	                console.log(e);
	                console.log(code);
	            }

	            throw new Error('{Template Error}');
	        }
	    };

	    /**
	     * 整理  html
	     * @param  {String}    code    模板字符串
	     * @return {String}            生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.parseHtml = function parseHtml(code) {

	        this.line += code.split(/\n/).length - 1;

	        // 压缩多余空白与注释
	        if (config.compress) {
	            code = code.replace(/\s+/g, ' ').replace(/<!--[\w\W]*?-->/g, '');
	        }

	        if (code) {
	            code = arrOutCode[1] + this.formatCode(code) + arrOutCode[2] + '\n';
	        }

	        return code;
	    };

	    /**
	     * 字符串转义
	     * @param  {String}    code   模板代码
	     * @return {String}    生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.formatCode = function formatCode(code) {
	        return "'" + code
	        // 单引号与反斜杠转义
	        .replace(/('|\\)/g, '\\$1')
	        // 换行符转义(windows + linux)
	        .replace(/\r/g, '\\r').replace(/\n/g, '\\n') + "'";
	    };

	    /**
	     * 整理 被替换的数据
	     * @param  {String}  code   数据代码
	     * @return {String}  生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.parseCode = function parseCode(code, headerCode) {

	        var self = this;

	        var thisLine = self.line;

	        // 语法转换插件钩子
	        if (self.parseMedth) {
	            code = self.parseMedth(code);
	        }

	        if (self.debug) {

	            // console.log(code);

	            // 记录行号
	            code = code.replace(/\n/g, function () {
	                self.line++;
	                return '$line=' + self.line + ';';
	            });
	        }

	        if (/^=+/.test(code)) {

	            var escapeSyntax = escape && !/^=[=#]/.test(code);

	            code = code.replace(/^=[=#]?|[\s;]*$/g, '');

	            // 对内容编码
	            if (escapeSyntax) {

	                var name = code.replace(/\s*\([^\)]+\)/, '');

	                // 排除 utils.* | include | print

	                if (!ct.utils[name]) {
	                    code = '$escape(' + code + ')';
	                }

	                // 不编码
	            } else {
	                    code = '$string(' + code + ')';
	                }

	            code = arrOutCode[1] + code + arrOutCode[2];
	        }

	        if (self.debug) {
	            code = '$line=' + thisLine + ';' + code;
	        }

	        // console.log(code);

	        var splitCode = self.getVariable(code);

	        // console.log(splitCode);

	        // 提取模板中的变量名
	        $.each(splitCode, function (index, name) {

	            // name 值可能为空，在安卓低版本浏览器下
	            if (!name || self.uniq[name]) {
	                return;
	            }

	            var value;

	            // 声明模板变量
	            // 赋值优先级:
	            // utils > uis > filters > data
	            if (ct.utils[name]) {
	                value = '$utils.' + name;
	                // } else if (uis[name]) {
	                // value = '$uis.' + name;
	            } else if (_filter.filter[name]) {
	                    value = '$filters.' + name;
	                } else {
	                    value = '$data.' + name;
	                }

	            headerCode += name + '=' + value + ',';
	            self.uniq[name] = true;
	        });

	        return {
	            code: code + '\n',
	            headerCode: headerCode
	        };
	    };

	    /**
	     * 整理 过滤器的代码
	     * @name ctCompile#formatFilter
	     * @event
	     * @param  {String} [val]    需要运算的变量
	     * @param  {String} [term]   过滤器的方法及参数
	     * @return {String} 返回过滤器的使用代码
	     */


	    ParseTemplate.prototype.formatFilter = function formatFilter(val, term) {
	        var parts = term.split(':');
	        var name = parts.shift();
	        var args = parts.join(',') || '';

	        if (!_filter.filter[name]) {
	            throw new Error('filter method "' + name + '" is not exist !!');
	        }

	        if (args) {
	            args = ', ' + args;
	        }

	        return '$filters.' + name + '(' + val + args + ')';
	    };

	    /**
	     * 整理 ui 组件的代码
	     * @name ctCompile#formatUI
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.formatUI = function formatUI(ui) {
	        var splitUI = ui.split('\:');
	        var name = splitUI.shift();
	        var args = splitUI.join(',') || '';

	        if (!uis[name]) {
	            throw new Error('ui method "' + name + '" is not exist !!');
	        }

	        return '$uis.' + name + '(' + args + ')';
	    };

	    /**
	     * 整理 执行方法
	     * @name ctCompile#parseMedth
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.parseMedth = function parseMedth(code) {
	        // console.log(code);

	        var self = this;

	        code = code.replace(/^\s/, '');

	        var params = code.split(' ');
	        var key = params.shift();
	        var args = params.join(' ');

	        // console.log(code);

	        switch (key) {
	            case 'each':

	                var argEach = args.split(' in ');

	                var object = argEach[1] || '$data';

	                var paramMatch = argEach[0].match(reg.each);

	                var value, index;

	                if (!!paramMatch) {
	                    index = paramMatch[1];
	                    value = paramMatch[2];
	                } else {
	                    index = '$index';
	                    value = argEach[0];
	                }

	                var paramEach = index + ', ' + value;

	                if (argEach.length != 2) {
	                    throw new Error('method "each" error not has in');
	                }

	                code = '$each(' + object + ', function(' + paramEach + '){';
	                break;

	            case '/each':
	                code = '});';
	                break;

	            case 'if':
	                code = 'if (' + args + ') {';
	                break;

	            case 'else':

	                if (params.shift() === 'if') {
	                    params = ' if (' + params.join(' ') + ') ';
	                } else {
	                    params = '';
	                }

	                code = '} else ' + params + '{';
	                break;

	            case '/if':
	                code = '}';
	                break;

	            case 'ui':

	                // console.log(args);

	                if (args) {
	                    // console.log(code);

	                    // console.log(self.formatUI(args));

	                    code = '=#' + self.formatUI(args);
	                } else {
	                    code = '=' + code;
	                }

	                break;

	            default:

	                // code = arrOutCode[1] + code + arrOutCode[2];
	                // 过滤器（辅助方法）
	                // {{value | filterA:'abcd' | filterB}}
	                // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
	                // TODO: {{ddd||aaa}} 不包含空格
	                if (/\s*\|\s+[\w\$]/.test(args)) {

	                    var escape = true;

	                    // {{#value | link}}
	                    if (code.indexOf('#') === 0) {
	                        code = code.substr(1);
	                        escape = false;
	                    }

	                    var i = 0;
	                    var array = code.split(/\s+\|\s+/);
	                    var len = array.length;
	                    var val = array[i++];

	                    // console.log('\n=====================================================================');
	                    // console.log(code + '\n' + key + '\n' + args + '\n');
	                    // console.log(i);
	                    // console.log(val);
	                    // console.log(array);
	                    // console.log('=====================================================================\n');

	                    for (; i < len; i++) {
	                        val = self.formatFilter(val, array[i]);
	                    }

	                    code = (escape ? '=' : '=#') + val;

	                    // 内容直接输出 {{value}}
	                } else {

	                        // console.log('parseMedth:key ==> ' + key);

	                        code = $.trim(code);

	                        // if ( /\s+/.test(code) ) {
	                        //     throw new Error('"' + reg.openTagString + code + reg.closeTagString + '" is error template');
	                        // }

	                        code = '=' + code;
	                    }
	                break;
	        }

	        return code;
	    };

	    /**
	     * 获取变量
	     * @name ctCompile#parseMedth
	     * @event
	     * @param  {String} [code]   数据代码
	     * @return {String} 生成匿名函数的内部代码
	     */


	    ParseTemplate.prototype.getVariable = function getVariable(code) {

	        // console.log('\n===========================================================================');

	        // console.log( code );
	        // console.log( code.replace(REMOVE_RE, '') );

	        // console.log(
	        //     code
	        //         .replace(REMOVE_RE, '')
	        //         .replace(SPLIT_RE, ',')
	        // );

	        // console.log(
	        //     code
	        //         .replace(REMOVE_RE, '')
	        //         .replace(SPLIT_RE, ',')
	        //         .replace(KEYWORDS_RE, '')
	        // );

	        // console.log(
	        //     code
	        //         .replace(REMOVE_RE, '')
	        //         .replace(SPLIT_RE, ',')
	        //         .replace(KEYWORDS_RE, '')
	        //         .replace(NUMBER_RE, '')
	        // ); 

	        // console.log(
	        //     code
	        //         .replace(REMOVE_RE, '')
	        //         .replace(SPLIT_RE, ',')
	        //         .replace(KEYWORDS_RE, '')
	        //         .replace(NUMBER_RE, '')
	        //         .replace(BOUNDARY_RE, '')
	        // ); 

	        // console.log(
	        //     code
	        //         .replace(REMOVE_RE, '')
	        //         .replace(SPLIT_RE, ',')
	        //         .replace(KEYWORDS_RE, '')
	        //         .replace(NUMBER_RE, '')
	        //         .replace(BOUNDARY_RE, '')
	        //         .split(SPLIT2_RE)
	        // );

	        // console.log('===========================================================================\n');

	        return code.replace(REMOVE_RE, '').replace(SPLIT_RE, ',').replace(KEYWORDS_RE, '').replace(NUMBER_RE, '').replace(BOUNDARY_RE, '').split(SPLIT2_RE);
	    };

	    return ParseTemplate;
	}();

	/**
	 * 模板引擎
	 * @author 徐晨 
	 * @constructor
	 */


	function ctCompile() {

	    this.utils = {
	        $filters: _filter.filter,
	        $string: toString,
	        $escape: escapeHTML,
	        $each: function $each(arrayData, fn) {
	            if (arrayData) {
	                $.each(arrayData, fn);
	            } else {
	                return '';
	            }
	        },
	        $mainConfig: _config.mainConfig
	    };

	    this.cacheCompile = {};
	}

	/**
	 * 渲染模板
	 * @name    template.compile
	 * @param   {String}    模板
	 * @param   {Object}    数据
	 * @return  {String}    渲染好的字符串
	 */
	ctCompile.prototype.compile = function (source, model, useModel) {
	    var self = this;

	    if (!self.cacheCompile[source]) {
	        var compileTemplate = new ParseTemplate(source);

	        self.cacheCompile[source] = compileTemplate.compile();
	        // console.log(self.cacheCompile[source]);
	    }

	    try {

	        var result = self.cacheCompile[source](model, self.utils) + '';

	        if (useModel) {
	            return $(result).data('model', model);
	        } else {
	            return result;
	        }
	    } catch (e) {

	        // 使用 debug 模式重新编译，查看渲染时的详细错误
	        try {
	            var compileDebug = new ParseTemplate(source, true),
	                sourceDebug = compileDebug.compile();

	            sourceDebug(model, self.utils) + '';
	        } catch (error) {

	            error.source = sourceDebug;

	            var message = 'Template Error\n\n';

	            for (var name in error) {
	                message += '<' + name + '>\n' + error[name] + '\n\n';
	            }

	            if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object') {
	                console.error(message);
	            }
	        }
	    }
	};

	ctCompile.prototype.get = function (id, isStatic) {
	    var self = this;

	    // Can we find this template in the cache?
	    if (window.ctCaches[id] || caches[id] || isStatic) {
	        var __template = window.ctCaches[id] || caches[id];

	        // Yes? OK, lets call our callback function and return.
	        // return callback(templates[id]);

	        return isStatic ? __template : $.Deferred().resolve(__template).promise();
	    }

	    // Otherwise, lets load it up. We'll build our URL based on the ID passed in.
	    var url = 'tpl/' + id + '.html?' + TIMESTAMP;

	    // And use a handy jQuery library called Traffic Cop to handle marshalling
	    // requests to the server. This will prevent multiple concurrent requests
	    // for the same resource.
	    var promise = $.get(url);

	    // Wire up a handler for this request via jQuery's promise API
	    return promise.then(function (template) {

	        // `template` is a string of HTML loaded via `$.ajax`. So here, we
	        // can take the opportunity to pre-compile it for performance. When we
	        // pre-compile a template, it returns a function that we can store in our
	        // cache for future use.
	        // var tmp = self.compile(template, model);

	        // 谨慎命名，避免冲突
	        caches[id] = self.setTemplate(template);

	        return caches[id];
	    }, function () {
	        throw new Error('template page "' + id + '" is not exist !!');
	    });
	};

	ctCompile.prototype.setTemplate = function (str) {

	    str = str.replace(reg.template, function ($0, $1, $2) {
	        caches[$1] = $2;

	        return ' ';
	    });

	    return str;
	};

	var ct = new ctCompile();

	window.ct = ct;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, module) {'use strict';

	/*!
	jQuery JSONView.
	Licensed under the MIT License.
	 */
	(function (jQuery) {
	  var $, Collapser, JSONFormatter, JSONView, JSON_VALUE_TYPES;
	  JSON_VALUE_TYPES = ['object', 'array', 'number', 'string', 'boolean', 'null'];
	  JSONFormatter = function () {
	    function JSONFormatter(options) {
	      if (options == null) {
	        options = {};
	      }
	      this.options = options;
	    }

	    JSONFormatter.prototype.htmlEncode = function (html) {
	      if (html !== null) {
	        return html.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	      } else {
	        return '';
	      }
	    };

	    JSONFormatter.prototype.jsString = function (s) {
	      s = JSON.stringify(s).slice(1, -1);
	      return this.htmlEncode(s);
	    };

	    JSONFormatter.prototype.decorateWithSpan = function (value, className) {
	      return "<span class=\"" + className + "\">" + this.htmlEncode(value) + "</span>";
	    };

	    JSONFormatter.prototype.valueToHTML = function (value, level) {
	      var valueType;
	      if (level == null) {
	        level = 0;
	      }
	      valueType = Object.prototype.toString.call(value).match(/\s(.+)]/)[1].toLowerCase();
	      if (this.options.strict && !jQuery.inArray(valueType, JSON_VALUE_TYPES)) {
	        throw new Error("" + valueType + " is not a valid JSON value type");
	      }
	      return this["" + valueType + "ToHTML"].call(this, value, level);
	    };

	    JSONFormatter.prototype.nullToHTML = function (value) {
	      return this.decorateWithSpan('null', 'null');
	    };

	    JSONFormatter.prototype.undefinedToHTML = function () {
	      return this.decorateWithSpan('undefined', 'undefined');
	    };

	    JSONFormatter.prototype.numberToHTML = function (value) {
	      return this.decorateWithSpan(value, 'num');
	    };

	    JSONFormatter.prototype.stringToHTML = function (value) {
	      var multilineClass, newLinePattern;
	      if (/^(http|https|file):\/\/[^\s]+$/i.test(value)) {
	        return "<a href=\"" + this.htmlEncode(value) + "\"><span class=\"q\">\"</span>" + this.jsString(value) + "<span class=\"q\">\"</span></a>";
	      } else {
	        multilineClass = '';
	        value = this.jsString(value);
	        if (this.options.nl2br) {
	          newLinePattern = /([^>\\r\\n]?)(\\r\\n|\\n\\r|\\r|\\n)/g;
	          if (newLinePattern.test(value)) {
	            multilineClass = ' multiline';
	            value = (value + '').replace(newLinePattern, '$1' + '<br />');
	          }
	        }
	        return "<span class=\"string" + multilineClass + "\">\"" + value + "\"</span>";
	      }
	    };

	    JSONFormatter.prototype.booleanToHTML = function (value) {
	      return this.decorateWithSpan(value, 'bool');
	    };

	    JSONFormatter.prototype.arrayToHTML = function (array, level) {
	      var collapsible, hasContents, index, numProps, output, value, _i, _len;
	      if (level == null) {
	        level = 0;
	      }
	      hasContents = false;
	      output = '';
	      numProps = array.length;
	      for (index = _i = 0, _len = array.length; _i < _len; index = ++_i) {
	        value = array[index];
	        hasContents = true;
	        output += '<li>' + this.valueToHTML(value, level + 1);
	        if (numProps > 1) {
	          output += ',';
	        }
	        output += '</li>';
	        numProps--;
	      }
	      if (hasContents) {
	        collapsible = level === 0 ? '' : ' collapsible';
	        return "[<ul class=\"array level" + level + collapsible + "\">" + output + "</ul>]";
	      } else {
	        return '[ ]';
	      }
	    };

	    JSONFormatter.prototype.objectToHTML = function (object, level) {
	      var collapsible, hasContents, key, numProps, output, prop, value;
	      if (level == null) {
	        level = 0;
	      }
	      hasContents = false;
	      output = '';
	      numProps = 0;
	      for (prop in object) {
	        numProps++;
	      }
	      for (prop in object) {
	        value = object[prop];
	        hasContents = true;
	        key = this.options.escape ? this.jsString(prop) : prop;
	        output += "<li><a class=\"prop\" href=\"javascript:;\"><span class=\"q\">\"</span>" + key + "<span class=\"q\">\"</span></a>: " + this.valueToHTML(value, level + 1);
	        if (numProps > 1) {
	          output += ',';
	        }
	        output += '</li>';
	        numProps--;
	      }
	      if (hasContents) {
	        collapsible = level === 0 ? '' : ' collapsible';
	        return "{<ul class=\"obj level" + level + collapsible + "\">" + output + "</ul>}";
	      } else {
	        return '{ }';
	      }
	    };

	    JSONFormatter.prototype.jsonToHTML = function (json) {
	      return "<div class=\"jsonview\">" + this.valueToHTML(json) + "</div>";
	    };

	    return JSONFormatter;
	  }();
	  typeof module !== "undefined" && module !== null && (module.exports = JSONFormatter);
	  Collapser = function () {
	    function Collapser() {}

	    Collapser.bindEvent = function (item, options) {
	      var collapser;
	      item.firstChild.addEventListener('click', function (_this) {
	        return function (event) {
	          return _this.toggle(event.target.parentNode.firstChild, options);
	        };
	      }(this));
	      collapser = document.createElement('div');
	      collapser.className = 'collapser';
	      collapser.innerHTML = options.collapsed ? '+' : '-';
	      collapser.addEventListener('click', function (_this) {
	        return function (event) {
	          return _this.toggle(event.target, options);
	        };
	      }(this));
	      item.insertBefore(collapser, item.firstChild);
	      if (options.collapsed) {
	        return this.collapse(collapser);
	      }
	    };

	    Collapser.expand = function (collapser) {
	      var ellipsis, target;
	      target = this.collapseTarget(collapser);
	      if (target.style.display === '') {
	        return;
	      }
	      ellipsis = target.parentNode.getElementsByClassName('ellipsis')[0];
	      target.parentNode.removeChild(ellipsis);
	      target.style.display = '';
	      return collapser.innerHTML = '-';
	    };

	    Collapser.collapse = function (collapser) {
	      var ellipsis, target;
	      target = this.collapseTarget(collapser);
	      if (target.style.display === 'none') {
	        return;
	      }
	      target.style.display = 'none';
	      ellipsis = document.createElement('span');
	      ellipsis.className = 'ellipsis';
	      ellipsis.innerHTML = ' &hellip; ';
	      target.parentNode.insertBefore(ellipsis, target);
	      return collapser.innerHTML = '+';
	    };

	    Collapser.toggle = function (collapser, options) {
	      var action, collapsers, target, _i, _len, _results;
	      if (options == null) {
	        options = {};
	      }
	      target = this.collapseTarget(collapser);
	      action = target.style.display === 'none' ? 'expand' : 'collapse';
	      if (options.recursive_collapser) {
	        collapsers = collapser.parentNode.getElementsByClassName('collapser');
	        _results = [];
	        for (_i = 0, _len = collapsers.length; _i < _len; _i++) {
	          collapser = collapsers[_i];
	          _results.push(this[action](collapser));
	        }
	        return _results;
	      } else {
	        return this[action](collapser);
	      }
	    };

	    Collapser.collapseTarget = function (collapser) {
	      var target, targets;
	      targets = collapser.parentNode.getElementsByClassName('collapsible');
	      if (!targets.length) {
	        return;
	      }
	      return target = targets[0];
	    };

	    return Collapser;
	  }();
	  $ = jQuery;
	  JSONView = {
	    collapse: function collapse(el) {
	      if (el.innerHTML === '-') {
	        return Collapser.collapse(el);
	      }
	    },
	    expand: function expand(el) {
	      if (el.innerHTML === '+') {
	        return Collapser.expand(el);
	      }
	    },
	    toggle: function toggle(el) {
	      return Collapser.toggle(el);
	    }
	  };
	  return $.fn.JSONView = function () {
	    var args, defaultOptions, formatter, json, method, options, outputDoc;
	    args = arguments;
	    if (JSONView[args[0]] != null) {
	      method = args[0];
	      return this.each(function () {
	        var $this, level;
	        $this = $(this);
	        if (args[1] != null) {
	          level = args[1];
	          return $this.find(".jsonview .collapsible.level" + level).siblings('.collapser').each(function () {
	            return JSONView[method](this);
	          });
	        } else {
	          return $this.find('.jsonview > ul > li .collapsible').siblings('.collapser').each(function () {
	            return JSONView[method](this);
	          });
	        }
	      });
	    } else {
	      json = args[0];
	      options = args[1] || {};
	      defaultOptions = {
	        collapsed: false,
	        nl2br: false,
	        recursive_collapser: false,
	        escape: true,
	        strict: false
	      };
	      options = $.extend(defaultOptions, options);
	      formatter = new JSONFormatter(options);
	      if (Object.prototype.toString.call(json) === '[object String]') {
	        json = JSON.parse(json);
	      }
	      outputDoc = formatter.jsonToHTML(json);
	      return this.each(function () {
	        var $this, item, items, _i, _len, _results;
	        $this = $(this);
	        $this.html(outputDoc);
	        items = $this[0].getElementsByClassName('collapsible');
	        _results = [];
	        for (_i = 0, _len = items.length; _i < _len; _i++) {
	          item = items[_i];
	          if (item.parentNode.nodeName === 'LI') {
	            _results.push(Collapser.bindEvent(item.parentNode, options));
	          } else {
	            _results.push(void 0);
	          }
	        }
	        return _results;
	      });
	    }
	  };
	})(jQuery);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(207)(module)))

/***/ },

/***/ 207:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }

});