webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	module.exports = __webpack_require__(32);


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
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, Backbone) {'use strict';

	/*
	 *@description User
	 *@author：xu chen 
	 *@date：2014-3-31
	 *@update：2014-3-31
	*/
	window.Store.addService('User', function ($, Store) {
	    /**
	     * @author XuChen 
	     * @name User
	     * @class 静态页面列表
	     */
	    function User() {
	        var self = this;

	        self.isLoggedIn = false;
	        self.info = {};

	        self.LayoutView = null;
	        self.DialogPlugin = null;

	        self.CartService = null;

	        self.AccountModel = null;
	    };

	    User.prototype.init = function () {
	        var self = this;

	        self.LayoutView = Store.getView('Layout');
	        self.DialogPlugin = Store.getPlugin('Dialog');

	        self.CartService = Store.getService('Cart');

	        self.AccountModel = Store.getModel('Account');
	    };

	    /**
	     * 获得用户信息方法
	     * @type Function
	     */
	    User.prototype.getInfo = function (useCookie, useSession) {
	        var self = this;

	        if (useCookie) {
	            var tracknick = $.cookies.get('SCA_LOGIN');

	            if (!!tracknick) {
	                self.isLoggedIn = true;

	                self.LayoutView.login();

	                return Store.proxyDefer({
	                    nickname: 'smartisan'
	                });
	            } else {
	                self.isLoggedIn = false;

	                self.LayoutView.logout();

	                return Store.proxyDeferError(10004, '请登录');
	            }
	        }

	        var data = {
	            s: useSession | 0
	        };

	        /**
	         * @param {Number} [s] 是否调用 session 中的数据，[0:否, 1:是]
	         */
	        return mainService.ajax({
	            url: 'Account/Info',
	            data: data,
	            success: function success(result) {

	                self.info = result;
	                self.isLoggedIn = true;

	                result.avatar_url = result.avatar_url ? result.avatar_url : Store.config.defaultAvatar;

	                self.LayoutView.login();

	                var model = self.parseInfo(result);

	                self.AccountModel.set(model);

	                return model;
	            },
	            error: function error(_error) {
	                self.LayoutView.logout();

	                self.isLoggedIn = false;

	                // if (Store.currentView.userRequired) {
	                //     return error;
	                // } else {
	                return false;
	                // }
	            }
	        });
	    };

	    User.prototype.parseInfo = function (info) {
	        var data = $.extend({}, info);

	        data.email_active = data.email_active | 0;
	        data.cellphone_active = data.cellphone_active | 0;
	        data.secques_active = data.secques_active | 0;

	        data.verifyedEmail = data.email && data.email_active;
	        data.unVerifyEmail = data.email && !data.email_active;

	        return data;
	    };

	    /**
	     * 发送手机验证码
	     * @type Function
	     * @param {String} 手机号
	     */
	    // User.prototype.sendMobileCaptcha = function(mobile){
	    //     // console.log('Used method : UserService => testEmail');
	    //     var self = this;
	    //     return mainService.ajax({
	    //         type: 'post',
	    //         url: 'account/Sendmessage',
	    //         data: {
	    //             mobile : mobile
	    //         },
	    //         success: function (result){
	    //             return result;
	    //         },
	    //         error: function (error){
	    //             return false;
	    //         }
	    //     });
	    // }
	    User.prototype.sendMobileCaptcha = function (mobile, verify) {
	        // console.log('Used method : UserService => testEmail');
	        var self = this,
	            _parseData = {};

	        _parseData['[cellphone]'] = escape(mobile);
	        _parseData['[captcha]'] = escape(verify);

	        return mainService.ajax({
	            type: 'get',
	            dataType: 'jsonp',
	            url: 'cellphone/?m=post',
	            data: _parseData,
	            success: function success(result) {
	                self.isLoggedIn = true;
	                return result;
	            }
	        });
	    };

	    /**
	     * 获取优惠券信息
	     * @type Function
	     */
	    User.prototype.getCashCardList = function () {
	        var self = this;

	        return mainService.ajax({
	            url: 'CashCard/getList'
	        });
	    };

	    /**
	     * 获取优惠券到天猫
	     * @type Function
	     */
	    User.prototype.exportGiftcard = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'cashCard/exchangeTaobao',
	            data: data,
	            error: function error() {
	                return false;
	            }
	        });
	    };

	    /**
	     * 验证邮箱是否已被使用方法
	     * @type Function
	     * @param {String} 邮箱地址
	     */
	    User.prototype.sendEmail = function () {
	        var self = this;

	        return mainService.ajax({
	            type: 'post',
	            url: 'Account/sendEmail'
	        });
	    };

	    /**
	     * 判断用户是否已登录，如果包含已登录时的回调
	     * 则在用户未登录的情况下，自动弹出登陆框
	     * 否则只做页面的状态处理
	     * @type Function
	     */
	    User.prototype.login = function (callback) {
	        var self = this;

	        Store.currentView.loginProxy = callback;

	        // 首先获取用户信息，如果未登录则进行登录
	        return mainService.ajax({
	            url: 'Account/IsLogin',
	            success: function success(result) {

	                self.isLoggedIn = true;

	                self.LayoutView.login();

	                Store.currentView.loginProxy = null;
	                typeof callback == 'function' && callback();

	                return result;
	            },
	            error: function error(_error2) {
	                self.LayoutView.logout();

	                self.isLoggedIn = false;

	                if (typeof callback == 'function') {
	                    self.openLogin();
	                }

	                return false;
	            }
	        });

	        // self.getInfo()
	        //     .done(function () {
	        //         Store.currentView.loginProxy = null;
	        //         typeof callback == 'function' && callback();
	        //     })
	        //     .fail(jQuery.proxy(self.openLogin, self));
	    };

	    /**
	     * 打开用户登录窗口
	     * @type Function
	     */
	    User.prototype.openLogin = function () {
	        var self = this;

	        self.DialogPlugin.closeAll();

	        //
	        IframeDialog.open(IframeDialog.config.loginUrl);

	        // 根据此标识判断是否有监听 message 事件
	        // 只绑定一次，不进行 off
	        if (!self.hasMsgListner) {
	            $(window).on('message', jQuery.proxy(self.messageHandler, self));

	            self.hasMsgListner = true;
	        }
	    };

	    /**
	     * 用户登录
	     * @type Function
	     */
	    User.prototype.register = function () {
	        var self = this;

	        // 首先获取用户信息，如果未登录则进行登录
	        self.openRegister();
	    };

	    /**
	     * 打开用户注册窗口
	     * @type Function
	     */
	    User.prototype.openRegister = function () {
	        var self = this;
	        //
	        IframeDialog.open(IframeDialog.config.registerUrl);

	        // 根据此标识判断是否有监听 message 事件
	        // 只绑定一次，不进行 off
	        if (!self.hasMsgListner) {
	            $(window).on('message', jQuery.proxy(self.messageHandler, self));

	            self.hasMsgListner = true;
	        }
	    };

	    /**
	     * 打开设置头像窗口
	     * @type Function
	     */
	    User.prototype.openModifyAvatar = function () {
	        var self = this;
	        //
	        IframeDialog.open(IframeDialog.config.modifyAvatarUrl);
	        Store.currentView.isOpenAvatarDialog = true;

	        // 根据此标识判断是否有监听 message 事件
	        // 只绑定一次，不进行 off
	        if (!self.hasMsgListner) {
	            $(window).on('message', jQuery.proxy(self.messageHandler, self));

	            self.hasMsgListner = true;
	        }
	    };

	    /**
	     * 用户退出
	     * @type Function
	     */
	    User.prototype.logout = function () {
	        var self = this;

	        // 首先获取用户信息，如果未登录则进行登录
	        self.openLogout();
	    };

	    /**
	     * 打开用户登录窗口
	     * @type Function
	     */
	    User.prototype.openLogout = function () {
	        var self = this;
	        //
	        IframeDialog.open(IframeDialog.config.logoutUrl, true);

	        // 根据此标识判断是否有监听 message 事件
	        // 只绑定一次，不进行 off
	        if (!self.hasMsgListner) {
	            $(window).on('message', jQuery.proxy(self.messageHandler, self));

	            self.hasMsgListner = true;
	        }
	    };

	    /**
	     * 监听 message 事件
	     * @type Function
	     */
	    User.prototype.messageHandler = function (event) {
	        var self = this;
	        var originalEvent = event.originalEvent;

	        var userRequired = Store.currentView.userRequired;
	        var pageReload = Store.currentView.pageReload;

	        if (originalEvent.origin != IframeDialog.config.origin) {
	            return;
	        }

	        if (originalEvent.data == 'isLoggedIn') {
	            // 登录成功，重新获取信息
	            self.getInfo(true);
	            IframeDialog.close();
	            self.LayoutView.login();

	            // 如果有登录后的后续操作
	            if (typeof Store.currentView.loginProxy == 'function') {
	                Store.currentView.loginProxy();
	                Store.currentView.loginProxy = null;
	                return false;
	            }
	            // 同步云端购物车
	            self.CartService.syncList();

	            // 刷新页面
	            if (pageReload || userRequired) {
	                Backbone.history.loadUrl();
	                // var reloadHash = window.location.hash.replace(/^\#\//, '');
	                // if ( typeof Store.Router[reloadHash] == 'function' ) {
	                //     Store.Router[reloadHash]();
	                // } else {
	                //     $.each(Store.Router.regRoutes, function (index, item) {
	                //         if ( !!reloadHash.match( item.url ) ) {
	                //             window.location.reload();
	                //         }
	                //     });
	                // }
	                // Backbone.history.location.reload();
	                // window.location.reload();
	                return;
	            }

	            // 如果页面必须登录，刷新页面
	            // if ( userRequired ) {
	            //     Store.reloadView();
	            // }
	        }

	        if (originalEvent.data == 'isLoggedOut') {
	            // 退出成功
	            self.isLoggedIn = false;
	            self.info = {};
	            IframeDialog.close();
	            self.LayoutView.logout();

	            self.CartService.removeAll(true);

	            // 如果页面必须登录，返回首页
	            if (userRequired) {
	                window.location.href = '#/';
	            }
	        }

	        if (originalEvent.data == 'isRegistered') {
	            // 注册成功，重新获取信息
	            self.getInfo(true);
	            IframeDialog.close();
	            self.LayoutView.login();

	            // 同步云端购物车
	            self.CartService.syncList();

	            // 如果有登录后的后续操作
	            if (typeof Store.currentView.loginProxy == 'function') {
	                Store.currentView.loginProxy();
	                return false;
	            }

	            // 刷新页面
	            if (pageReload || userRequired) {
	                Backbone.history.loadUrl();
	                // var reloadHash = window.location.hash.replace(/^\#\//, '');
	                // if ( typeof Store.Router[reloadHash] == 'function' ) {
	                //     Store.Router[reloadHash]();
	                // }
	                // Backbone.history.location.reload();
	                // window.location.reload();
	                return;
	            }

	            // 如果页面必须登录，刷新页面
	            // if ( userRequired ) {
	            //     Store.reloadView();
	            // }
	        }

	        if (originalEvent.data == 'isModifiedAvatar') {
	            // 采取 监听 account model 的方式改变信息
	            // 重新获取信息
	            self.getInfo();
	            // 关闭对话框
	            IframeDialog.close();
	        }

	        if (originalEvent.data == 'dialogClose') {
	            // 关闭对话框
	            IframeDialog.close();

	            Store.currentView.loginProxy = null;

	            if (Store.currentView.isOpenAvatarDialog) {
	                Store.currentView.isOpenAvatarDialog = false;
	                return;
	            }

	            // 如果页面必须登录，返回首页
	            if (userRequired) {
	                window.location.href = '#/';
	            }
	        }
	    };

	    /**
	     * 用户退出
	     * @type Function
	     */
	    User.prototype.staticLogout = function () {
	        var self = this;

	        self.LayoutView.logout();
	        self.isLoggedIn = false;
	    };

	    /**
	     * 是否已经登录
	     * @type Function
	     */
	    User.prototype.staticIsLogout = function () {
	        var self = this;

	        return self.isLoggedIn;
	    };

	    return new User();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(10)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {/**
	 * @home.view.js 首页 View
	 * @author wanghuijun(wanghuijun@smartisan.cn)
	 */

	'use strict';

	window.Store.addView('Home', function () {
	    return Backbone.View.extend({
	        el: '.content',
	        events: {},
	        render: function render() {
	            var self = this;
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {/** 
	* @fileOverview test.view.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-17
	* @update：2015-07-17
	*/

	'use strict';

	window.Store.addView('Test', function () {
	    return Backbone.View.extend({
	        el: '.content',
	        initialize: function initialize() {
	            var self = this;

	            self.TestService = Store.getService('Test');
	        },
	        events: {
	            'click .js-read-file': 'readFile',
	            'click .js-write-file': 'writeFile',
	            'click .js-unzip-file': 'unzipFile',
	            'click .js-room-start': 'roomStart',
	            'click .js-room-end': 'roomEnd'
	        },
	        render: function render() {
	            var self = this;
	        },
	        readFile: function readFile() {
	            var self = this;

	            var src = 'api/store/test.json';

	            self.TestService.readFile(src);
	        },
	        writeFile: function writeFile() {
	            var self = this;

	            var src = 'api/store/test.json';

	            self.TestService.writeFile(src, '{"test" : "test"}');
	        },
	        unzipFile: function unzipFile() {
	            var self = this;

	            var src = 'ghost/ghost.zip';

	            self.TestService.unzipFile(src, 'rooms/test');
	        },
	        roomStart: function roomStart() {
	            var self = this;

	            self.TestService.roomStart();
	        },
	        roomEnd: function roomEnd() {
	            var self = this;

	            self.TestService.roomEnd();
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	/** 
	* @fileOverview test.service.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-17
	* @update：2015-07-17
	*/
	window.Store.addService('Test', function ($, Store) {
	    /**
	     * @author XuChen 
	     * @name Test
	     * @class 测试页面
	     */
	    function Test() {};

	    Test.prototype.init = function () {};

	    /**
	     * readFile
	     * @type Function
	     */
	    Test.prototype.readFile = function (src) {
	        var self = this;

	        return mainService.ajax({
	            url: 'test/readFile',
	            data: {
	                src: src
	            }
	        });
	    };

	    /**
	     * writeFile
	     * @type Function
	     */
	    Test.prototype.writeFile = function (src, data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'test/writeFile',
	            data: {
	                src: src,
	                detail: data
	            }
	        });
	    };

	    /**
	     * unzipFile
	     * @type Function
	     */
	    Test.prototype.unzipFile = function (src, output) {
	        var self = this;

	        return mainService.ajax({
	            url: 'test/unZip',
	            data: {
	                src: src,
	                output: output
	            }
	        });
	    };

	    /**
	     * roomStart
	     * @type Function
	     */
	    Test.prototype.roomStart = function (src, output) {
	        var self = this;

	        return mainService.ajax({
	            url: 'test/start'
	        });
	    };

	    /**
	     * roomEnd
	     * @type Function
	     */
	    Test.prototype.roomEnd = function (src, output) {
	        var self = this;

	        return mainService.ajax({
	            url: 'test/end'
	        });
	    };

	    return new Test();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, $) {/** 
	* @fileOverview room.manmage.view.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-17
	* @update：2015-07-17
	*/

	'use strict';

	window.Store.addView('RoomManage', function () {
	    return Backbone.View.extend({
	        el: '.content',
	        initialize: function initialize() {
	            var self = this;

	            self.RoomService = Store.getService('Room');

	            self.Dialog = Store.getPlugin('Dialog');
	        },
	        events: {
	            'click .js-room': 'room',
	            'click .js-room-switch': 'startRoom',
	            'click .js-room-update': 'updateRoom',
	            'click .js-room-go': 'checkout',
	            'click .js-add-room': 'addRoom'
	        },
	        render: function render() {
	            var self = this;

	            self.$list = self.$('.js-room-list');

	            self.keepOpen = false;
	        },
	        room: function room(event) {
	            var self = this,
	                $room = $(event.currentTarget);

	            if ($room.hasClass('on') || self.keepOpen) {
	                return;
	            }

	            $room.siblings().toggleClass('disabled-room', true);
	            $room.toggleClass('on', true);

	            setTimeout(function () {
	                $(document).on('click.operation', function (ev) {
	                    var $btn = $(ev.target);

	                    if ($btn.closest('.js-room-switch').length && $btn.closest('.js-room-switch').data('status') == 0
	                    // || self.keepOpen && $btn.closest('.js-room').is($room)
	                    ) {
	                            return;
	                        }

	                    // !!self.keepOpen && self.closeUpdatePanel($room);

	                    // 如果是修改内容，不取消其他 room 的 disabled 样式
	                    !$btn.closest('.js-room-update').length && $room.siblings().toggleClass('disabled-room', false);

	                    $room.toggleClass('on', false);
	                    $(document).off('click.operation');
	                });
	            }, 0);
	        },
	        /**
	         * 新建项目
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        addRoom: function addRoom(event) {
	            var self = this,
	                $room = $(event.currentTarget),
	                $updatePanel = $room.find('.js-update-panel');

	            if ($room.hasClass('edit') || self.keepOpen) {
	                return;
	            }

	            self.openUpdatePanel($room);

	            setTimeout(function () {
	                $(document).on('click.update', function (ev) {
	                    var $btn = $(ev.target);

	                    if ($btn.closest('.js-add-room').length) {
	                        return;
	                    }

	                    var postData = Store.getData($updatePanel);

	                    // console.log(postData);
	                    if (postData.name.trim() == '' || postData.port.trim() == '' || postData.path.trim() == '') {
	                        self.closeUpdatePanel($room);
	                        return;
	                    }

	                    self.RoomService.addRoom(postData).done(function (response) {

	                        var tpl = ct.get('tempRoom', true);

	                        self.$('.js-add-room').before(ct.compile(tpl, {
	                            room: postData
	                        }));

	                        self.closeUpdatePanel($room, function () {
	                            $updatePanel.find('input').val('');
	                        });
	                    }).fail(function (errorKey, msg, response) {});
	                });
	            }, 0);
	        },
	        /**
	         * 启动项目
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        startRoom: function startRoom(event) {
	            var self = this,
	                $button = $(event.currentTarget),
	                $room = $button.closest('.js-room'),
	                $label = $button.find('a'),
	                $show = $room.find('.js-room-name'),
	                id = $room.data('id'),
	                flag = $button.data('status') | 0;

	            if ($button.hasClass('disabled')) {
	                return;
	            }

	            if (!!flag) {
	                self.RoomService.endRoom(id).done(function (res) {
	                    $button.next().remove();
	                    $label.text('启');
	                    $button.data('status', 0);
	                    $show.toggleClass('running', false);
	                });
	            } else {
	                self.RoomService.startRoom(id).done(function (res) {

	                    var tpl = ct.get('tempOperationGo', true);

	                    $button.after(ct.compile(tpl, { room: res }));

	                    $label.text('关');
	                    $button.data('status', 1);
	                    $show.toggleClass('running', true);
	                });
	            }
	        },
	        /**
	         * 更新项目
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        updateRoom: function updateRoom(event) {
	            var self = this,
	                $button = $(event.currentTarget),
	                $room = $button.closest('.js-room'),
	                $updatePanel = $room.find('.js-update-panel'),
	                id = $room.data('id');

	            self.openUpdatePanel($room);

	            setTimeout(function () {
	                $(document).on('click.update', function (ev) {
	                    var $btn = $(ev.target);

	                    if ($btn.closest('.js-room').is($room)) {
	                        return;
	                    }

	                    var postData = Store.getData($updatePanel);

	                    if (postData.name.trim() == '' || postData.port.trim() == '' || postData.path.trim() == '') {

	                        self.closeUpdatePanel($room);

	                        return;
	                    }

	                    self.RoomService.updateRoom(postData).done(function (response) {
	                        self.closeUpdatePanel($room);
	                    }).fail(function (errorKey, msg, response) {});

	                    self.closeUpdatePanel($room);
	                });
	            }, 0);
	        },
	        openUpdatePanel: function openUpdatePanel($room) {
	            var self = this;

	            self.keepOpen = true;

	            $room.toggleClass('edit', true);
	            $room.siblings().toggleClass('disabled-room', true);
	        },
	        closeUpdatePanel: function closeUpdatePanel($room, callback) {
	            var self = this,
	                $updatePanel = $room.find('.js-update-panel');

	            self.keepOpen = false;

	            $room.toggleClass('edit', false);
	            $room.siblings().toggleClass('disabled-room', false);
	            $(document).off('click.update');

	            Store.isFunction(callback) && callback();
	        },
	        /**
	         * 跳转到项目
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        checkout: function checkout(event) {
	            var self = this,
	                $button = $(event.currentTarget),
	                port = $button.data('port');

	            if ($button.hasClass('disabled')) {
	                return;
	            }

	            window.open('http://localhost:' + port);
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(2)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	/** 
	* @fileOverview room.service.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-19
	* @update：2015-07-19
	*/
	window.Store.addService('Room', function ($, Store) {
	    /**
	     * @author XuChen 
	     * @name Room
	     * @class 测试页面
	     */
	    function Room() {};

	    Room.prototype.init = function () {};

	    /**
	     * @name getList
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 获取项目目录
	     */
	    Room.prototype.getList = function (src) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/list'
	        });
	    };

	    /**
	     * @name addRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 添加一个项目
	     * @param {String}    data.name    项目名称
	     * @param {String}    data.port    项目端口号
	     * @param {String}    data.path    静态目录
	     */
	    Room.prototype.addRoom = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/add',
	            data: data
	        });
	    };

	    /**
	     * @name updateRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 修改一个项目
	     * @param {String}    data.name    项目名称
	     * @param {String}    data.port    项目端口号
	     * @param {String}    data.path    静态目录
	     */
	    Room.prototype.updateRoom = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/update',
	            data: data
	        });
	    };

	    /**
	     * @name startRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 启动一个项目
	     * @param {String}    name    项目名称
	     */
	    Room.prototype.startRoom = function (name) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/start',
	            data: {
	                name: name
	            }
	        });
	    };

	    /**
	     * @name endRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 关闭一个项目
	     * @param {String}    name    项目名称
	     */
	    Room.prototype.endRoom = function (name) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/end',
	            data: {
	                name: name
	            }
	        });
	    };

	    /**
	     * @name updateRoom
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 修改项目信息
	     * @param {JSON}      data    项目数据
	     * @param {String}    data    项目名称
	     * @param {Number}    data    项目端口
	     */
	    Room.prototype.updateRoom = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'room/update',
	            data: data
	        });
	    };

	    return new Room();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, $) {/** 
	* @fileOverview api.list.view.js 接口列表
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-29
	* @update：2015-07-29
	*/

	'use strict';

	window.Store.addView('ApiList', function () {
	    return Backbone.View.extend({
	        el: '.content',
	        initialize: function initialize() {
	            var self = this;

	            self.ApiService = Store.getService('Api');

	            self.Dialog = Store.getPlugin('Dialog');
	            self.verifyPlugin = Store.getPlugin('Verify');

	            // 更新 API 数据的 ID
	            self.updateApiDataID = null;
	        },
	        events: {
	            'click .js-create': 'create',
	            'click .js-update': 'update',
	            'click .js-update-api-file': 'updateApiDataButton',
	            'click .js-cancel-api-data': 'cancelUpdateApiData',
	            'click .js-choose-backup-files-list li': 'selectBackup',
	            'change [name="group"]': 'changeGroup',
	            'keyup .js-add-data-textarea': 'changeApiData',
	            'change .js-add-data-textarea': 'changeApiData'
	        },
	        render: function render(view, tempData) {
	            var self = this;

	            self.tempData = tempData;

	            self.$formPanel = self.$('.js-update-form');

	            self.bindForm();

	            self.preview();
	        },
	        /**
	         * 输出 JSON 格式的数据
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        preview: function preview() {
	            var self = this,
	                method = self.tempData.method,
	                apiData = self.tempData.curApi.apiData;

	            if (method == 'preview') {

	                var node = new PrettyJSON.view.Node({
	                    el: self.$('.preview-panel'),
	                    data: apiData
	                });

	                node.expandAll();
	            }
	        },
	        /**
	         * 新建接口
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        create: function create(event) {
	            var self = this,
	                $button = $(event.currentTarget);

	            self.resetForm();
	        },
	        /**
	         * 修改接口
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        update: function update(event) {
	            var self = this,
	                $button = $(event.currentTarget);

	            self.resetForm();
	        },
	        /**
	         * 选择分组
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        changeGroup: function changeGroup(event) {
	            var self = this,
	                $select = $(event.currentTarget),
	                $groupName = self.$formPanel.find('[name="groupName"]'),
	                val = $select.val();

	            if (val != 0) {
	                $groupName.val(val).prop('disabled', true);
	            } else {
	                $groupName.val('').prop('disabled', false);
	            }
	        },
	        /**
	         * 绑定表单验证
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        bindForm: function bindForm() {
	            var self = this;

	            // 创建/更新 API 基础信息
	            self.verifyPlugin.bindVerify({
	                wrapper: self.$('.js-update-form'),
	                verifyDom: '.js-verify',
	                button: self.$('.js-save-form'),
	                success: function success(ver, formData) {
	                    var postData = $.extend({}, formData),
	                        postMedth = {};

	                    postData.room = self.tempData.roomName;

	                    console.log(postData);

	                    // 创建接口
	                    if (self.tempData.status.type == 'create') {
	                        console.log('create');
	                        postMedth = self.ApiService.createApi;
	                    }
	                    // 修改接口
	                    else {
	                            console.log('update');
	                            postMedth = self.ApiService.saveApi;
	                        }

	                    postMedth(postData).done(function () {
	                        self.updateApiItem(postData);

	                        Store.Router.navigate('api/list/' + postData.room + '?api=' + encodeURIComponent(postData.api), {
	                            trigger: true
	                        });
	                    });
	                }
	            });

	            // 添加/更新 API 接口数据
	            self.verifyPlugin.bindVerify({
	                wrapper: self.$('.js-add-api-form'),
	                verifyDom: '.js-verify',
	                button: self.$('.js-add-api-data'),
	                success: function success(ver, formData) {
	                    var postData = $.extend({}, formData),
	                        postMedth = {},
	                        isCreate = !self.updateApiDataID;

	                    postData.room = self.tempData.roomName;
	                    postData.api = encodeURIComponent(self.tempData.curApi.api);

	                    // 创建接口
	                    if (isCreate) {
	                        // console.log('create');
	                        postMedth = self.ApiService.createBackup;
	                    }
	                    // 修改接口
	                    else {
	                            // console.log('update');
	                            postData.tagID = self.updateApiDataID;
	                            postMedth = self.ApiService.saveBackup;
	                        }

	                    // console.log(postData);

	                    postMedth(postData).done(function (res) {
	                        var $addApiPanel = self.$('.add-api-panel');

	                        $addApiPanel.toggleClass('add-api-panel-show', false);

	                        self.updateApiBackupItem({
	                            file: {
	                                tagID: res.tagID,
	                                fileTag: res.tag,
	                                fileName: res.fileName
	                            }
	                        });

	                        // Store.Router.navigate(
	                        //     'api/list/demo?api=' + encodeURIComponent(postData.api),
	                        //     {
	                        //         trigger : true
	                        //     }
	                        // );
	                    });
	                }
	            });
	        },
	        /**
	         * 插入新建 Api dom
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        updateApiItem: function updateApiItem(data) {
	            var self = this,
	                tplApiGroup = ct.get('tempApiGroup', true),
	                tplApiItem = ct.get('tempApiItem', true),
	                $panel = self.$('.js-api-list-panel'),
	                $group = self.$('.js-api-group-wrapper[data-group="' + data.groupName + '"]'),
	                $oldItem = self.$('.js-api-item[data-id="' + data.api + '"]'),
	                $item = ct.compile(tplApiItem, data);

	            // 如果没有 group dom 则创建
	            if (!$group.length) {
	                $group = ct.compile(tplApiGroup, data, true);

	                $panel.append($group);
	            }

	            // 赋值当前 API list
	            var $curApiList = $group.find('.js-api-list');

	            if ($oldItem.length) {
	                $oldItem.remove();
	            }

	            $curApiList.prepend($item);
	        },
	        /**
	         * 插入新建 Api dom
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        updateApiBackupItem: function updateApiBackupItem(data) {
	            var self = this,
	                tpl = ct.get('tempApiBackupItem', true),
	                $backupList = self.$('.js-api-backup-list'),
	                $oldItem = $backupList.children('li[data-id="' + data.file.tagID + '"]'),
	                $item = ct.compile(tpl, data);

	            // 如果已存在 dom 则替换
	            if ($oldItem.length) {
	                $oldItem.after($item);

	                $oldItem.remove();
	            } else {
	                $backupList.children(':first').after($item);
	            }
	        },
	        /**
	         * 保存表单
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        saveForm: function saveForm() {
	            var self = this,
	                postData = Store.getData(self.$formPanel);

	            console.log(postData);
	            postData.room = self.tempData.roomName;

	            self.ApiService.createApi(postData).done(function () {

	                var tpl = ct.get('tempApiItem', true),
	                    $oldItem = self.$('.js-api-item[data-id="' + postData.api + '"]'),
	                    $item = ct.compile(tpl, { api: postData }, true);

	                if ($oldItem.length) {
	                    $oldItem.after($item);
	                    $oldItem.remove();
	                } else {
	                    self.$('.js-api-list[data-group="' + postData.groupName + '"]').append($item);
	                }

	                self.resetForm();
	            });
	        },
	        /**
	         * 重置表单
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        resetForm: function resetForm(data) {
	            var self = this;

	            if (!data) {
	                self.$formPanel.find('select').each(function () {
	                    $(this).get(0).selectedIndex = 0;
	                });

	                self.$formPanel.find('input, textarea').each(function () {
	                    $(this).val('').prop('disabled', false);
	                });
	                return;
	            }
	        },
	        /**
	         * 添加 API 数据的按钮
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        // addApiDataButton: function () {
	        //     var self = this,
	        //         $addApiPanel = self.$('.add-api-panel');

	        //     $addApiPanel.toggleClass('add-api-panel-show', true);

	        // },
	        /**
	         * 更新 API 数据的按钮
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        updateApiDataButton: function updateApiDataButton(event) {
	            var self = this,
	                $item = $(event.currentTarget),
	                $addApiPanel = self.$('.add-api-panel'),
	                $table = self.$('.js-add-api-form'),
	                postData = {};

	            self.updateApiDataID = $item.data('id');

	            // 创建 API 备份数据
	            if (!self.updateApiDataID) {
	                $table.find('[name=tag]').val('');
	                $table.find('[name=data]').val('');
	                self.$('.js-add-preview').empty();

	                $addApiPanel.toggleClass('add-api-panel-show', true);
	            }
	            // 更新 API 备份数据
	            else {
	                    postData.tagID = self.updateApiDataID;
	                    postData.room = self.tempData.roomName;
	                    postData.api = encodeURIComponent(self.tempData.curApi.api);

	                    self.ApiService.getBackupDetail(postData).done(function (res) {
	                        // console.log(res);

	                        $table.find('[name=tag]').val(res.fileTag);
	                        $table.find('[name=data]').val(res.apiData);

	                        try {
	                            var val = JSON.parse(res.apiData);

	                            self.addPreview = new PrettyJSON.view.Node({
	                                el: self.$('.js-add-preview'),
	                                data: val
	                            });

	                            self.addPreview.expandAll();
	                        } catch (e) {}

	                        $addApiPanel.toggleClass('add-api-panel-show', true);
	                    });
	                }
	        },
	        /**
	         * 取消更新/添加 API 数据
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        cancelUpdateApiData: function cancelUpdateApiData() {
	            var self = this,
	                $addApiPanel = self.$('.add-api-panel');

	            $addApiPanel.toggleClass('add-api-panel-show', false);
	        },
	        /**
	         * 选中一个接口备用数据
	         * @author 徐晨 ( xuchen@smartisan.com )
	         */
	        selectBackup: function selectBackup(event) {
	            var self = this,
	                $cur = $(event.currentTarget),
	                postData = {
	                tagID: $cur.data('id'),
	                room: self.tempData.roomName,
	                api: encodeURIComponent(self.tempData.curApi.api)
	            };

	            self.ApiService.selectBackup(postData).done(function (res) {
	                $cur.toggleClass('selected', true).siblings().toggleClass('selected', false);
	            });
	        },
	        changeApiData: function changeApiData(event) {
	            var self = this,
	                $textarea = $(event.currentTarget),
	                val = $textarea.val();

	            try {
	                val = JSON.parse(val);

	                self.addPreview = new PrettyJSON.view.Node({
	                    el: self.$('.js-add-preview'),
	                    data: val
	                });

	                self.addPreview.expandAll();
	            } catch (e) {}
	        }
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(2)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {'use strict';

	/** 
	* @fileOverview api.service.js 文件操作
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-07-29
	* @update：2015-07-29
	*/
	window.Store.addService('Api', function ($, Store) {
	    /**
	     * @author XuChen 
	     * @name Api
	     * @class 测试页面
	     */
	    function Api() {};

	    Api.prototype.init = function () {};

	    /**
	     * @name getList
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 获取接口列表
	     */
	    Api.prototype.getList = function (name) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/list',
	            data: {
	                name: name
	            }
	        });
	    };

	    /**
	     * @name createApi
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 保存接口
	     */
	    Api.prototype.createApi = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/create',
	            data: data
	        });
	    };

	    /**
	     * @name saveApi
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 保存接口
	     */
	    Api.prototype.saveApi = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/save',
	            data: data
	        });
	    };

	    /**
	     * @name getApiDetail
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 查找一个 api 数据
	     * @param {String}    name       项目名称
	     * @param {String}    apiName    api 名称
	     */
	    Api.prototype.getApiDetail = function (room, apiName) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/detail',
	            data: {
	                room: room,
	                api: apiName
	            }
	        });
	    };

	    /**
	     * @name createBackup
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 新建一个新的接口数据
	     * @param {JSON}      data         
	     * @param {String}    data.room    项目名称
	     * @param {String}    data.api     接口地址
	     * @param {String}    data.tag     数据别名
	     * @param {String}    data.data    数据
	     * @param {String}    data.use     是否使用当前数据[0:否, 1:是]
	     */
	    Api.prototype.createBackup = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/backup/create',
	            data: data
	        });
	    };

	    /**
	     * @name saveBackup
	     * @description 更新一个接口数据
	     * @param {JSON}      data         
	     * @param {String}    data.room      项目名称
	     * @param {String}    data.api       接口地址
	     * @param {String}    data.tagID     数据 ID
	     * @param {String}    data.tag       数据别名
	     * @param {String}    data.data      数据
	     * @param {String}    data.use       是否使用当前数据[0:否, 1:是]
	     */
	    Api.prototype.saveBackup = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/backup/update',
	            data: data
	        });
	    };

	    /**
	     * @name getBackupDetail
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 查看一个接口备用数据
	     * @param {JSON}      data         
	     * @param {String}    data.room      项目名称
	     * @param {String}    data.api       接口地址
	     * @param {String}    data.tagID     数据 ID
	     */
	    Api.prototype.getBackupDetail = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/backup/detail',
	            data: data
	        });
	    };

	    /**
	     * @name selectBackup
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @description 选中一个接口备用数据
	     * @param {JSON}      option         
	     * @param {String}    option.room         项目名称
	     * @param {String}    option.api          接口地址
	     * @param {String}    option.tagID        数据 ID
	     */
	    Api.prototype.selectBackup = function (data) {
	        var self = this;

	        return mainService.ajax({
	            url: 'api/backup/select',
	            data: data
	        });
	    };

	    return new Api();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, $, jQuery) {/** 
	* @fileOverview 静态路由配置文件
	* @author 徐晨 ( xuchen@smartisan.com )
	* @date：2015-06-02
	* @update：2015-06-02
	*/

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	window.Store.onPageReady(function () {
	    var UtilService = Store.getService('Util');
	    var StorageService = Store.getService('LocalStorage');
	    var UserService = Store.getService('User');

	    var AccountModel = Store.getModel('Account');

	    var cacheAccountView = null;
	    var LayoutView = Store.getView('Layout');

	    /**
	     * @author 徐晨 ( xuchen@smartisan.com )
	     * @name Router
	     * @constructor
	     * @extends jQuery
	     * @extends Backbone.Router
	     * @extends Store
	     */
	    var Router = Backbone.Router.extend( /** @lends Router.prototype*/{
	        routes: {
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
	        initialize: function initialize() {
	            var self = this,
	                regRoutes = self.regRoutes;

	            // 需要正则配置的路由
	            // this.route(/^category\/?(\d+)?\/?(?:page=(\d+))?(?:\&?sort=(.+))?/, 'category');

	            if (regRoutes.length) {
	                $.each(regRoutes, function (index, item) {
	                    self.route(item.url, item.medth);
	                });
	            }

	            self.initLayout = self.bindLayout();
	        },
	        home: function home() {
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

	            this.roomManage();
	        },
	        test: function test() {
	            // 首页
	            this.showView({
	                url: 'test',
	                title: 'test',
	                breadcrumb: [],
	                resolve: {},
	                init: function init(v, e) {
	                    var testView = new (Store.getView('Test'))();
	                    testView.render(v);
	                    return testView;
	                }
	            });
	        },
	        // 项目管理
	        roomManage: function roomManage() {
	            var self = this,
	                roomService = Store.getService('Room');

	            // 首页
	            this.showView({
	                url: 'room.manage',
	                title: 'room manage',
	                resolve: {
	                    rooms: function rooms() {
	                        return roomService.getList();
	                    }
	                },
	                init: function init(v, e) {
	                    var roomManageView = new (Store.getView('RoomManage'))();
	                    roomManageView.render(v);
	                    return roomManageView;
	                }
	            });
	        },
	        // 接口列表
	        apiList: function apiList(name, params) {
	            var self = this,
	                apiService = Store.getService('Api'),
	                hashParams = Store.formatUrlHash(params),
	                type = hashParams.jsonParams.type,
	                api = hashParams.jsonParams.api,
	                method = hashParams.jsonParams.method,
	                status = '';

	            if (type == 'create') {
	                status = 'create';
	            } else {
	                if (!!api) {
	                    api = api.toLowerCase();
	                    status = 'api';
	                    method = method || 'preview';
	                }
	            }

	            self.showView({
	                url: 'api.list',
	                title: 'api list',
	                resolve: {
	                    api: function api() {
	                        return apiService.getList(name);
	                    },
	                    curApi: function curApi() {
	                        var res = {};

	                        if (status == 'api') {
	                            return apiService.getApiDetail(name, api);
	                        }

	                        return res;
	                    },
	                    roomName: name,
	                    status: {
	                        type: status,
	                        api: api
	                    },
	                    method: method
	                },
	                init: function init(v, tempData) {
	                    var apiListView = new (Store.getView('ApiList'))();
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
	        bindLayout: function bindLayout() {
	            var self = this;
	            if (self.initLayout) {
	                return false;
	            }
	            self.initLayout = true;

	            // 初始化 layout 单例模式，不需要赋值
	            Store.getView('Layout');
	            // 获取本地登录状态
	            UserService.getInfo(true);

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
	        showView: function showView(view, reload) {
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

	            if (view.hashParams && !view.isHub && !reload) {

	                var baseUrl = Store.formatUrlToParams().base,
	                    hashParams = Store.formatUrlHash(view.hashParams);

	                view.hashCache = {
	                    base: baseUrl,
	                    updateParams: hashParams
	                };

	                if (Store.currentView.hashCache && Store.currentView.hashCache.base == baseUrl && Store.currentView.viewCache && typeof Store.currentView.viewCache.updateView == 'function') {
	                    var preHashParams = Store.currentView.hashCache.updateParams;

	                    Store.currentView.hashCache = view.hashCache;

	                    Store.currentView.viewCache.updateView(Store.formatHashAction(preHashParams, hashParams));
	                    return false;
	                }
	            }

	            // 移除旧的 view
	            if (Store.currentView.viewCache && typeof Store.currentView.viewCache.remove == 'function') {
	                Store.currentView.viewCache.remove();
	            }

	            Store.currentView = view;

	            Store.reloadView = function () {
	                self.showView(view, true);
	            };

	            // link page by verify userRequired
	            self.initLayout.always(function () {

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
	                    $.each(view.resolve, function (key, value) {
	                        resolve.key.push(key);

	                        var cacheResolve = typeof value == 'function' ? value() : value;

	                        if ((typeof cacheResolve === 'undefined' ? 'undefined' : _typeof(cacheResolve)) == 'object' && typeof cacheResolve.done == 'function') {
	                            resolve.value.push(cacheResolve);
	                        } else {
	                            resolve.value.push(Store.proxyDefer([cacheResolve]));
	                        }
	                    });
	                }

	                // 预加载数据 ==> 全部请求完毕
	                $.when.apply(jQuery, resolve.value).done(function () {
	                    // 未登录状态载入需要登录的页面
	                    if (view.userRequired && !UserService.isLoggedIn) {
	                        UserService.openLogin();
	                        return false;
	                    }

	                    $.each(arguments, function (index, item) {

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
	                    pageDefer.always(function ($container) {
	                        $(document).scrollTop(0);
	                        document.title = view.title + ' - Chameleon';

	                        // 预加载面包屑导航
	                        if (typeof breadcrumb != 'undefined') {
	                            self.initBreadcrumb(breadcrumb);
	                        }
	                    }).done(function (result, statusText, defer) {

	                        // 隐藏page－loading页面
	                        $pageLoading.hide();

	                        // var start = +(new Date());
	                        $layoutContainer.html(ct.compile(result, tempData));

	                        // var end = +(new Date());

	                        // console.log(end - start);

	                        view.html = result;
	                        view.$page = $layoutContainer.find('.content');

	                        Store.currentView = view;
	                        if (typeof view.init == 'function') {
	                            Store.currentView.viewCache = view.init(view, tempData);
	                        }
	                    }).fail(function (defer, status, statusText) {
	                        // self.notFound()
	                    });
	                }).fail(function (error, errorInfo) {
	                    // 非正常报错
	                    if (!error) {
	                        return false;
	                    }

	                    if (error != 10004 && error != 1000 && error != 70000) {
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
	        unbindLayout: function unbindLayout() {

	            $.each(Store.loop, function (key, value) {
	                clearInterval(Store.loop[key]);
	            });

	            $(window).off('scroll');
	            $('.breadcrumb').html('');

	            if (!Store.config.isMobile) {
	                $(window).scroll(function () {
	                    if ($(window).scrollTop() > 0) {
	                        $('#returnTop').animate({ 'bottom': '10px' }, { queue: false, duration: 200 });
	                    } else {
	                        $('#returnTop').animate({ 'bottom': '-40px' }, { queue: false, duration: 200 });
	                    }
	                });
	            }
	        },
	        /**
	         * @name Router#initBreadcrumb
	         * @event
	         * @author 徐晨 ( xuchen@smartisan.com )
	         * @description 渲染导航面包屑 <br/>
	         *              默认第一级目录为：在线商城 <br/>
	         *              最末一级目录不可点击
	         * @param  {Array}     navlist        面包屑的数据
	         * @param  {String}    navlist.nav    面包屑的名称
	         * @param  {String}    navlist.url    面包屑的跳转 URL
	         * @example
	        Router.initBreadcrumb([
	            {
	                'nav': '第二级目录',
	                'url': '#/second'
	            },
	            {
	                'nav': '第三级目录',
	                'url': '#/last'
	            }
	        ]);
	         */
	        initBreadcrumb: function initBreadcrumb(navlist) {
	            var result = '';
	            var sigma = ' > ';
	            var baseBreadcrumb = [{
	                nav: '在线商城',
	                url: '#/'
	            }];
	            navlist = baseBreadcrumb.concat(navlist);

	            // if (navlist.length > 1) {
	            for (var i = 0, l = navlist.length - 1; i < l; i++) {
	                result += '<a href="' + navlist[i].url + '">' + navlist[i].nav + '</a>';
	                result += sigma;
	            }
	            result += navlist[navlist.length - 1].nav;
	            // }
	            $('.breadcrumb').html(result);
	        }
	    });

	    Store.Router = new Router();
	    Backbone.history.start({});
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(2), __webpack_require__(2)))

/***/ }
]);