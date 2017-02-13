/*
 *@description Dialog
 *@author：xu chen 
 *@date：2014-4-1
 *@update：2015-3-20
*/
'use strict';

window.Store.addPlugin('Dialog', (function( $, Store ){

    function Dialog() {
        var self = this;

        self.def = {
            mark : '',
            isLayer : true,
            isCenter : false,
            once : false,
            top : false,
            title : '标题',
            dialogClass : '',
            doneText : '确定',
            cancelText : '取消',
            template : '',
            templateUrl : '',
            templateData : null,
            hasBtn : true,
            hasCancel : true,
            params : {},
            content : null, // [null | function]
            done : null, // [null | function]
            cancel : null, // [null | function]
            closeFn : null // [null | function]
        };

        self.dialogs = { length : 0};
        self.showList = [];

        self.$maskLayer = $('<div class="module-dialog-layer"></div>');
    }

    Dialog.prototype.init = function(){
        var self = this;
        $('body').append(self.$maskLayer);

        $(document).on('keydown', function (event) {
            if ( self.showList.length ) {
                var _moduleDialog = self.showList[self.showList.length - 1];
                if ( event.which == 27  ) {
                    _moduleDialog.config.$close.click();
                } else if ( event.which == 13 && ( _moduleDialog.config.mark == 'dialogDefaultMessage' || _moduleDialog.config.mark == 'dialogDefaultConfirm' ) ) {
                    _moduleDialog.config.$done.click();
                } else if ( event.which == 8 && $('input:focus').length == 0 ) {
                    return false;
                }
            }
        }).on('mousewheel', function () {
            if ( self.showList.length ) {
                return false;
            }
        });

        // self.$maskLayer.on('click', function () {
        //     self.closeAll();
        // });

    };

    /**
     * 全局初始化
     * @type Function
     */
    Dialog.prototype.create = function(options){
        var self = this;

        var option = $.extend({}, self.def, options);

        var config = option,
            boolContent = typeof option.content == "function" ? true : false,
            boolDone = typeof option.done == "function" ? true : false,
            boolCancel = typeof option.cancel == "function" ? true : false,
            boolClose = typeof option.closeFn == "function" ? true : false;

        config.__index = 10000;

        $.extend(config, config.params);

        config.hideBtn = option.hasBtn ? '' : 'fn-hide';
        config.hideCancelBtn = option.hasCancel ? '' : 'fn-hide';
        config.baseTemplate = '';
        config.defer = null;

        if ( config.template ) {
            config.templateHtml = config.template;
            config.baseTemplate = config.template;
        } else {
            config.defer = ct.get( config.templateUrl );
        }

        var htmlDialog = ct.get('tempDialog', true);

        var $dialog = $(ct.compile(htmlDialog, config));

        // 关闭时追加函数
        var _closeAction = null;
        var _addAction = null;

        config.$dialog = $dialog;
        config.$title = $dialog.find('.js-dialog-title');
        config.$con = $dialog.find('.js-dialog-container');
        config.$done = $dialog.find('.js-dialog-done');
        config.$close = $dialog.find('.dialog-close');
        config.$cancel = $dialog.find('.js-dialog-cancel');


        var objDialog = self.dialogs[config.mark] = {
            config : config,
            dom : $dialog,
            isOpen : false,
            isVisible : false
        };
        self.dialogs.length++;

        $('body').append($dialog);

        // out methods
        config.$ = function (selector) {
            return config.$con.find(selector);
        }
        config.positionCenter = function() {
            self._positionCenter(objDialog);
            return config;
        }

        config.setCloseAction = function (callback) {
            typeof callback == 'function' && ( _closeAction = callback );
        }

        config.setDialog = function(callback){
            if ( config.defer ) {
                config.defer.done(function () {
                    $.isFunction(callback) && callback(config);
                });
            } else {
                $.isFunction(callback) && callback(config);
            }
        }

        config.show = function(callback){
            self._show(objDialog, callback);
            return config;
        }
        config.hide = function(callback){
            self._hide(objDialog, function () {
                typeof callback == 'function' && callback(config);
            });
        }

        // 如果config.once为true 则执行_close 否则执行 _hide
        config.close = function(closeFn){
            self._close(objDialog, function () {
                typeof closeFn == 'function' && closeFn(config);
                typeof _closeAction == 'function' && _closeAction(config);
            });
        }

        /**
         * 切换弹出框的内容区域
         * @type Function
         * @param {Selector String} opt.curPanel 当前显示部分jQuery dom
         * @param {Selector String} opt.targetPanel 目标显示部分jQuery dom
         * @param {String} opt.width 内容区变化宽度度
         * @param {String} opt.height 内容区变化高度
         * @param {String} opt.dialogTop 弹出框变化位置
         * @param {Function} opt.callback 回调函数
         */
        config.change = function(opt){
            self._change(objDialog, opt);
        }

        // get template by url
        if (config.templateUrl) {
            // config.$con.html($.loader());
            config.defer.done(function (result) {
                var __dialogConHtml = result;
                if ( config.templateData ) {
                    __dialogConHtml = ct.compile( __dialogConHtml, config.templateData );
                }
                config.$con.html(__dialogConHtml);
                config.baseTemplate = __dialogConHtml;

                // bind popup init function
                boolContent && config.content( config );
            });

        } else {

            // bind popup init function
            boolContent && config.content( config );
        }

        // bind close method
        $dialog.on('click', function (event) {
            if ( !$(event.target).closest('.dialog-panel').length ) {
                if ( boolClose ) {
                    config.closeFn(config);
                } else {
                    if ( config.hasCancel && boolCancel ) {
                        config.cancel(config);
                    } else{
                        config.close();
                    }
                }
            }
        })
        // bind btn close method
        .on('click', '.dialog-close', function () {
            if ( boolClose ) {
                config.closeFn(config);
            } else {
                if ( config.hasCancel && boolCancel ) {
                    config.cancel(config);
                } else{
                    config.close();
                }
            }
            
        })
        // bind btn done method
        .on('click', '.js-dialog-done', function () {
            if ( config.hasBtn && boolDone ) {
                config.done(config);
            }
            if ( !boolDone ) {
                config.close();
            }
            return false;
        })
        // bind btn cancel method
        .on('click', '.js-dialog-cancel', function () {
            if ( boolCancel ) {
                config.cancel(config);
            }else{
                config.close();
            }
        });

        return config;
    }

    /**
     * 弹出框 ==> 对话框
     * @type Function
     */
    Dialog.prototype.confirm = function(options){
        var self = this;
        var option = $.extend(
                {},
                self.def,
                { title : '提示' },
                options,
                {
                    mark : 'dialogDefaultConfirm',
                    isCenter : true,
                    once : true,
                    dialogClass : 'module-dialog-confirm',
                    params : { __index : 11100 },
                    done : options.ok,
                    cancel : options.cancel
                }
            );

        var arrTemp = [];

        options.messageClass && (option.dialogClass = option.dialogClass + ' ' + options.messageClass);

        arrTemp.push('<div class="confirm-msg">');
        !options.notWarning && arrTemp.push('<div class="warning"></div>');
        arrTemp.push(options.message);
        arrTemp.push('</div>');

        option.template = arrTemp.join('');

        var _confirmDialog = self.create(option);

        _confirmDialog.show();

        return _confirmDialog; 
    }

    /**
     * 弹出框 ==> 提示框
     * @type Function
     */
    Dialog.prototype.message = function(options){
        var self = this;

        var option = $.extend(
                {},
                self.def,
                { message : '', title : '提示' },
                options,
                {
                    mark : 'dialogDefaultMessage',
                    isCenter : true,
                    dialogClass : 'module-dialog-confirm',
                    params : { __index : 11100 },
                    hasCancel : false,
                    once : true,
                    done : options.ok
                }
            );

        var arrTemp = [];

        arrTemp.push('<div class="confirm-msg">');
        arrTemp.push(options.message);
        arrTemp.push('</div>');

        option.template = arrTemp.join('');

        var _messageDialog = self.create(option);

        _messageDialog.show();

        return _messageDialog;
    }

    /**
     * 居中弹出框
     * @type Function
     */
    Dialog.prototype._positionCenter = function(dialog){
        var self = this,
            elDialog = dialog.dom,
            width = elDialog.width(),
            height = elDialog.height(),
            scrollTop = 0;

        if ( Store.config.isIE6 ) {
            $('body').css('position', 'relative');

            var winWidth = $(document).width();
            var docHeight = $(document).height();
            var winHeight = $(window).height();
            self.$maskLayer.width(winWidth).height(docHeight);
            
            dialog.dom.css({
                top : $(document).scrollTop() + winHeight / 2,
                left : '50%',
                "margin" : "-" + dialog.dom.height() / 2 + "px 0 0 -" + dialog.dom.width() / 2 + "px" 
            });
        } else {
            elDialog.css({
                "top" : "50%",
                "left" : "50%",
                "margin" : "-" + height / 2 + "px 0 0 -" + width / 2 + "px" 
            });
        }

    }

    /**
     * 打开弹出框
     * @type Function
     */
    Dialog.prototype._show = function(dialog, callback){
        var self = this;
        if ( !dialog.isOpen ) {
            self.closeAll();
            dialog.isOpen = true;
            self.showList.push(dialog);

            dialog.dom.show();

            // 配合 只设定高度就能够垂直居中的 css 方法
            // var height = 0;

            // dialog.dom.children().each(function(){
            //     height = height + $(this).outerHeight(true)
            // });
            // dialog.dom.height(height);


            // dialog.config.isCenter && self._positionCenter(dialog);
            // dialog.config.isLayer && self.$maskLayer.show();
            dialog.config.isLayer && self.$maskLayer.fadeIn(150);
            

            // if ( Store.config.opacity ) {
            //     dialog.config.isLayer && self.$maskLayer.css('opacity', 0).animate({"opacity":"0.618"},200);
            //     dialog.dom.css('opacity', 0).animate({"opacity": 1},200, function () {
            //         dialog.isVisible = true;
            //         typeof callback == 'function' && callback(dialog.config);
            //     });
            // } else {
            //     dialog.isVisible = true;
            // }

            setTimeout(function () {
                dialog.dom.toggleClass('module-dialog-show', true);
            }, 0);

            dialog.isVisible = true;
            typeof callback == 'function' && callback(dialog.config);
        }
    }

    /**
     * 隐藏弹出框
     * @type Function
     */
    Dialog.prototype._hide = function(dialog, callback){
        var self = this;
        if ( dialog.isVisible ) {

            self.showList.pop();
            // !self.showList.length && self.$maskLayer.hide();
            !self.showList.length && self.$maskLayer.fadeOut(100);

            dialog.isOpen = false;

            dialog.dom.toggleClass('module-dialog-show', false);

            dialog.isVisible = false;

            setTimeout(function () {
                dialog.dom.hide();
                $.isFunction(callback) && callback();
            }, 200);

            // if ( Store.config.opacity ) {
            //     dialog.dom.animate({"opacity":"0"},200).hide(0, function(){
            //         dialog.isVisible = false;
            //         $.isFunction(callback) && callback();
            //     });
            // } else {
            //     dialog.dom.hide();
            //     dialog.isVisible = false;
            //     $.isFunction(callback) && callback();
            // }

        }
        
    }

    /**
     * 关闭弹出框
     * @type Function
     */
    Dialog.prototype._close = function(dialog, callback){
        var self = this;

        self._hide(dialog, function () {
            if ( dialog.config.once ) {
                dialog.dom.remove();
                delete self.dialogs[dialog.config.mark];
            }
            typeof callback == 'function' && callback();
        });
    }

    /**
     * 切换弹出框的内容区域
     * @type Function
     * @param {Selector String} options.curPanel 当前显示部分jQuery dom
     * @param {Selector String} options.targetPanel 目标显示部分jQuery dom
     * @param {String} options.width 内容区变化宽度度
     * @param {String} options.height 内容区变化高度
     * @param {String} options.dialogTop 弹出框变化位置
     * @param {Function} options.callback 回调函数
     */
    Dialog.prototype._change = function(dialog, options){
        var self = this,
            $dialog = dialog.dom,
            $curPanel = $dialog.find(options.curPanel),
            $targetPanel = $dialog.find(options.targetPanel),
            $animate = $dialog.find('.animate-layer'),
            width = options.width,
            height = options.height,
            // dialogTop = options.dialogTop,
            boolanimate = width || height,
            animateStyle = {};

        dialog.config.$title.text(options.title);

        height && (animateStyle.height = height + 'px');
        width && (animateStyle.width = width + 'px');

        $curPanel.hide();

        if ( Store.config.opacity ) {
            $targetPanel.css('opacity', '0').hide();
            $targetPanel.show({duration:500,easing:'easeOutQuart'}).animate({'opacity':'1'},300, function () {
                typeof options.callback == 'function' && options.callback(dialog.config);
            });
            // width && $dialog.animate({width: width + 'px'},{duration:500,easing:'easeOutQuart'});
            $animate.animate(animateStyle,{duration:500,easing:'easeOutQuart'});
            // $dialog.animate({'margin-top':'-' + dialogTop + 'px'},{duration:500,easing:'easeOutQuart'});
        } else {
            $targetPanel.show();
            boolanimate && $animate.css(animateStyle);
            width && $dialog.css({width: width + 'px'});
            // dialogTop && $dialog.css({'margin-top':'-' + dialogTop + 'px'});
            typeof options.callback == 'function' && options.callback(dialog.config);
        }
        
    }

    /**
     * 关闭所有弹出框
     * @type Function
     */
    Dialog.prototype.closeAll = function () {
        var self = this;

        for (var i = 0, l = self.showList.length; i < l; i++) {
            self.showList[i].config.close();
        }
    }


    return( new Dialog() );
    
})( jQuery, window.Store ));