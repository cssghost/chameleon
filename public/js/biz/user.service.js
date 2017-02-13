/*
 *@description User
 *@author：xu chen 
 *@date：2014-3-31
 *@update：2014-3-31
*/
window.Store.addService('User', (function( $, Store ){
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
    
    User.prototype.init = function() {
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
    User.prototype.getInfo = function(useCookie, useSession){
        var self = this;

        if ( useCookie ) {
            var tracknick = $.cookies.get('SCA_LOGIN');

            if ( !!tracknick ) {
                self.isLoggedIn = true;

                self.LayoutView.login();

                return Store.proxyDefer({
                    nickname : 'smartisan'
                });

            } else {
                self.isLoggedIn = false;

                self.LayoutView.logout();

                return Store.proxyDeferError(10004, '请登录');

            }

        }

        var data = {
            s : ( useSession | 0 )
        };

        /**
         * @param {Number} [s] 是否调用 session 中的数据，[0:否, 1:是]
         */
        return mainService.ajax({
                url: 'Account/Info',
                data : data,
                success: function (result){

                    self.info = result;
                    self.isLoggedIn = true;

                    result.avatar_url = result.avatar_url ? result.avatar_url : Store.config.defaultAvatar;

                    self.LayoutView.login();

                    var model = self.parseInfo(result);

                    self.AccountModel.set(model);

                    return model;
                },
                error: function (error){
                    self.LayoutView.logout();

                    self.isLoggedIn = false;


                    // if (Store.currentView.userRequired) {
                    //     return error;
                    // } else {
                    return false;
                    // }
                }
            });
    }

    User.prototype.parseInfo = function (info) {
        var data = $.extend({}, info);

        data.email_active = data.email_active | 0;
        data.cellphone_active = data.cellphone_active | 0;
        data.secques_active = data.secques_active | 0;

        data.verifyedEmail = data.email && data.email_active;
        data.unVerifyEmail = data.email && !data.email_active;

        return data;
    }

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
    User.prototype.sendMobileCaptcha = function(mobile, verify){
        // console.log('Used method : UserService => testEmail');
        var self = this,
            _parseData = {};

        _parseData['[cellphone]'] = escape(mobile);
        _parseData['[captcha]'] = escape(verify);

        return mainService.ajax({
                    type : 'get',
                    dataType : 'jsonp',
                    url: 'cellphone/?m=post',
                    data: _parseData,
                    success: function (result){
                        self.isLoggedIn = true;
                        return result;
                    }
                });
    }

    /**
     * 获取优惠券信息
     * @type Function
     */
    User.prototype.getCashCardList = function(){
        var self = this;

        return mainService.ajax({
                url: 'CashCard/getList'
            });
    }

    /**
     * 获取优惠券到天猫
     * @type Function
     */
    User.prototype.exportGiftcard = function(data){
        var self = this;

        return mainService.ajax({
                url: 'cashCard/exchangeTaobao',
                data : data,
                error: function () {
                    return false;
                }
            });
    }

    /**
     * 验证邮箱是否已被使用方法
     * @type Function
     * @param {String} 邮箱地址
     */
    User.prototype.sendEmail = function(){
        var self = this;

        return mainService.ajax({
                    type: 'post',
                    url: 'Account/sendEmail'
                });
    }

    /**
     * 判断用户是否已登录，如果包含已登录时的回调
     * 则在用户未登录的情况下，自动弹出登陆框
     * 否则只做页面的状态处理
     * @type Function
     */
    User.prototype.login = function(callback){
        var self = this;

        Store.currentView.loginProxy = callback;
        
        // 首先获取用户信息，如果未登录则进行登录
        return mainService.ajax({
            url: 'Account/IsLogin',
            success: function (result){

                self.isLoggedIn = true;

                self.LayoutView.login();

                Store.currentView.loginProxy = null;
                typeof callback == 'function' && callback();

                return result;
            },
            error: function (error){
                self.LayoutView.logout();

                self.isLoggedIn = false;

                if ( typeof callback == 'function' ) {
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
    User.prototype.openLogin = function(){
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
    User.prototype.register = function(){
        var self = this;
        
        // 首先获取用户信息，如果未登录则进行登录
        self.openRegister();
    };

    /**
     * 打开用户注册窗口
     * @type Function
     */
    User.prototype.openRegister = function(){
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
    User.prototype.openModifyAvatar = function(){
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
    User.prototype.logout = function() {
        var self = this;

        // 首先获取用户信息，如果未登录则进行登录
        self.openLogout();
    };

    /**
     * 打开用户登录窗口
     * @type Function
     */
    User.prototype.openLogout = function() {
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
    User.prototype.messageHandler = function(event) {
        var self = this;
        var originalEvent = event.originalEvent;

        var userRequired = Store.currentView.userRequired;
        var pageReload = Store.currentView.pageReload;

        if (originalEvent.origin != IframeDialog.config.origin ) {
            return;
        }

        if (originalEvent.data == 'isLoggedIn') {
            // 登录成功，重新获取信息
            self.getInfo(true);
            IframeDialog.close();
            self.LayoutView.login();


            // 如果有登录后的后续操作
            if ( typeof Store.currentView.loginProxy == 'function' ) {
                Store.currentView.loginProxy();
                Store.currentView.loginProxy = null;
                return false;
            }
            // 同步云端购物车
            self.CartService.syncList();

            // 刷新页面
            if ( pageReload || userRequired ) {
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
            if ( userRequired ) {
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
            if ( typeof Store.currentView.loginProxy == 'function' ) {
                Store.currentView.loginProxy();
                return false;
            }

            // 刷新页面
            if ( pageReload || userRequired ) {
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

            if ( Store.currentView.isOpenAvatarDialog ) {
                Store.currentView.isOpenAvatarDialog = false;
                return;
            }

            // 如果页面必须登录，返回首页
            if ( userRequired ) {
                window.location.href = '#/';
            }
        }
    };

    /**
     * 用户退出
     * @type Function
     */
    User.prototype.staticLogout = function() {
        var self = this;

        self.LayoutView.logout();
        self.isLoggedIn = false;
    };

    /**
     * 是否已经登录
     * @type Function
     */
    User.prototype.staticIsLogout = function() {
        var self = this;

        return self.isLoggedIn;
    };
    
    return( new User() );
    
})( jQuery, window.Store ));
