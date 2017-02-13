/**
 * @layout.view.js 全局 View
 * @author xuchen(xuchen@smartisan.com)
 */
'use strict';
// 全局
window.Store.addView('Layout', function(){

    return Backbone.View.extend({
        el : '.wrapper',
        events : {
            'click .js-login' : 'doLogin',
            'click .js-register' : 'doRegister',
            'click .js-logout' : 'doLogout',
            'mouseenter .header-account-panel .account-label' : 'openMenu',
            'click .header-account-panel .account-label' : 'closeMenu',
            'mouseleave .header-account-panel .account-label' : 'closeMenu',
            'touchstart .js-m-btn' : 'mTouchDonw',
            'touchend .js-m-btn' : 'mTouchUp'
        },
        initialize: function () {
            var self = this;

            self.UserService = Store.getService('User');
            self.CartService = Store.getService('Cart');

            self.DialogPlugin = Store.getPlugin('Dialog');

            self.$accountWrapper = self.$('.header-account-panel');

            self.UtilService = Store.getService('Util');
            
        },
        render: function(view) {
            var self = this;
        },
        login: function () {
            var self = this;

            self.$accountWrapper.html(
                ct.get('tempMainLogin', true)
            );
            
        },
        logout: function () {
            var self = this;

            $.cookies.del('SCA_LOGIN');

            self.$accountWrapper.html(
                ct.get('tempMainLogout', true)
            );
            
        },
        doLogin: function () {
            var self = this;

            self.UtilService.pvEvent('首页登录');

            // 必须传入 function，调用函数有欠缺，以后处理
            self.UserService.login(function () {});
        },
        doRegister: function () {
            var self = this;

            self.UtilService.pvEvent('首页注册');

            self.UserService.register();
        },
        doLogout: function () {
            var self = this;

            self.DialogPlugin.confirm({
                title : '退出登录',
                message : '确定退出登录吗？',
                ok : function (opt) {
                    opt.close();
                    self.UserService.logout();
                }
            });

        },
        openMenu: function (event) {
            var self = this,
                $menu = $(event.currentTarget);

            $menu.toggleClass('account-label-hover', true);
        },
        closeMenu: function (event) {
            var self = this,
                $menu = $(event.currentTarget);

            $menu.toggleClass('account-label-hover', false);
            // this.login();
        },
        mTouchDonw: function (event) {
            var self = this,
                $button = $(event.currentTarget);

            $button.toggleClass('m-active', true);
        },
        mTouchUp: function (event) {
            var self = this,
                $button = $(event.currentTarget);

            $button.toggleClass('m-active', false);
        }
    });

}, true);
