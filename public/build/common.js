webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	module.exports = __webpack_require__(15);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, $) {/**
	 * @layout.view.js 全局 View
	 * @author xuchen(xuchen@smartisan.com)
	 */
	'use strict';
	// 全局

	window.Store.addView('Layout', function () {

	    return Backbone.View.extend({
	        el: '.wrapper',
	        events: {
	            'click .js-login': 'doLogin',
	            'click .js-register': 'doRegister',
	            'click .js-logout': 'doLogout',
	            'mouseenter .header-account-panel .account-label': 'openMenu',
	            'click .header-account-panel .account-label': 'closeMenu',
	            'mouseleave .header-account-panel .account-label': 'closeMenu',
	            'touchstart .js-m-btn': 'mTouchDonw',
	            'touchend .js-m-btn': 'mTouchUp'
	        },
	        initialize: function initialize() {
	            var self = this;

	            self.UserService = Store.getService('User');
	            self.CartService = Store.getService('Cart');

	            self.DialogPlugin = Store.getPlugin('Dialog');

	            self.$accountWrapper = self.$('.header-account-panel');

	            self.UtilService = Store.getService('Util');
	        },
	        render: function render(view) {
	            var self = this;
	        },
	        login: function login() {
	            var self = this;

	            self.$accountWrapper.html(ct.get('tempMainLogin', true));
	        },
	        logout: function logout() {
	            var self = this;

	            $.cookies.del('SCA_LOGIN');

	            self.$accountWrapper.html(ct.get('tempMainLogout', true));
	        },
	        doLogin: function doLogin() {
	            var self = this;

	            self.UtilService.pvEvent('首页登录');

	            // 必须传入 function，调用函数有欠缺，以后处理
	            self.UserService.login(function () {});
	        },
	        doRegister: function doRegister() {
	            var self = this;

	            self.UtilService.pvEvent('首页注册');

	            self.UserService.register();
	        },
	        doLogout: function doLogout() {
	            var self = this;

	            self.DialogPlugin.confirm({
	                title: '退出登录',
	                message: '确定退出登录吗？',
	                ok: function ok(opt) {
	                    opt.close();
	                    self.UserService.logout();
	                }
	            });
	        },
	        openMenu: function openMenu(event) {
	            var self = this,
	                $menu = $(event.currentTarget);

	            $menu.toggleClass('account-label-hover', true);
	        },
	        closeMenu: function closeMenu(event) {
	            var self = this,
	                $menu = $(event.currentTarget);

	            $menu.toggleClass('account-label-hover', false);
	            // this.login();
	        },
	        mTouchDonw: function mTouchDonw(event) {
	            var self = this,
	                $button = $(event.currentTarget);

	            $button.toggleClass('m-active', true);
	        },
	        mTouchUp: function mTouchUp(event) {
	            var self = this,
	                $button = $(event.currentTarget);

	            $button.toggleClass('m-active', false);
	        }
	    });
	}, true);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(2)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*
	 *@description localStorage
	 *@author：xu chen 
	 *@date：2015-04-20
	*/
	window.Store.addService('LocalStorage', function ($, Store) {

	    function LocalStorage() {
	        var self = this;

	        self.canUsed = !!window.localStorage && (typeof JSON === 'undefined' ? 'undefined' : _typeof(JSON)) === 'object' && JSON !== null && typeof JSON.parse === 'function' && typeof JSON.stringify === 'function';
	    };

	    LocalStorage.prototype.init = function () {};

	    /**
	     * 获取本地储存
	     * @description 如果内容存在 cookie 且可以使用 localStorage
	     *              则删除 cookie 中的存储，转为 localStorange
	     *              如果 localStorange 和 cookie 都存在，取前者
	     * @type Function
	     * @param {String} key
	     * @param {String} options 
	     */
	    LocalStorage.prototype.get = function (key, options) {
	        var self = this,
	            options = options || {};

	        var cookieCache = $.cookies.get(key, options);

	        if (self.canUsed && !options.useCookie) {
	            var localCache = decodeURIComponent(localStorage.getItem(key)),
	                response = localCache !== 'null' ? JSON.parse(localCache) : cookieCache;

	            if (cookieCache) {
	                self.remove(key, options);
	                self.set(key, response);
	            }

	            return response;
	        } else {
	            cookieCache;
	        }
	    };

	    /**
	     * 设置本地储存
	     * @type Function
	     * @param {String} key
	     * @param {String} options 
	     */
	    LocalStorage.prototype.set = function (key, value, options) {
	        var self = this,
	            options = options || {};

	        if (self.canUsed && !options.useCookie) {
	            self.remove(key);

	            if (typeof value !== 'string') {
	                value = JSON.stringify(value);
	            }

	            localStorage.setItem(key, encodeURIComponent(value));
	        } else {
	            $.cookies.set(key, value, options);
	        }
	    };

	    /**
	     * 筛选本地储存
	     * @type Function
	     * @param {String} key
	     * @param {String} options 
	     */
	    LocalStorage.prototype.filter = function (key, options) {
	        var self = this,
	            options = options || {},
	            response = $.cookies.filter(key, options);

	        if (self.canUsed && !options.useCookie) {

	            if (typeof key === 'string') {
	                key = new RegExp(key);
	            }

	            for (var name in localStorage) {
	                if (name.match(key)) {
	                    response[name] = self.get(name, options);
	                }
	            }

	            return response;
	        } else {
	            return response;
	        }
	    };

	    /**
	     * 移除本地储存
	     * @type Function
	     * @param {String} key
	     * @param {String} options 
	     */
	    LocalStorage.prototype.remove = function (key, options) {
	        var self = this,
	            options = options || {};

	        if (self.canUsed) {
	            localStorage.removeItem(key);
	        }

	        $.cookies.del(key, options);
	    };

	    return new LocalStorage();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {/**
	 * @account.model.js 账户信息 Model
	 * @author xuchen(xuchen@smartisan.com)
	 */
	'use strict';
	// 填写订单

	window.Store.addModel('Account', function () {

	    return Backbone.Model.extend({
	        defaults: {},
	        initialize: function initialize() {}
	    });
	}, true);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {'use strict';

	/**
	 * service.status.view.js 异常页面
	 * @author 徐晨(xuchen@smartisan.com)
	 *
	 */

	window.Store.addView('ServiceStatus', function () {

	    return Backbone.View.extend({
	        el: '.content',
	        initialize: function initialize() {
	            var self = this;
	        },
	        events: {
	            'click .js-link-home': 'linkHome'
	        },
	        render: function render(view) {
	            var self = this;

	            self.isAbort = false;

	            self.doCountdown();
	        },
	        linkHome: function linkHome() {
	            var self = this;

	            self.isAbort = true;

	            window.location.href = '#/';
	        },
	        doCountdown: function doCountdown() {
	            var self = this;
	            Store.filter.countdown({
	                time: 10,
	                $label: self.$('.js-down-count'),
	                callback: function callback() {
	                    self.isAbort = true;
	                    self.linkHome();
	                },
	                abort: function abort() {
	                    if (self.isAbort || Store.currentView.url != 'service-status') {
	                        return false;
	                    }
	                    return true;
	                }
	            });
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }
]);