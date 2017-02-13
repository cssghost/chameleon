/*
 *@description Verify
 *@author：xu chen
 *@date：2014-4-2
 *@update：2014-4-2
*/
'use strict';

window.Store.addPlugin('Verify', (function( $, Store ){

    function Verify() {
        var self = this;
        self.domConfig = {};
        self.verifyConfig = {};

        self.verifyError = null;
        self.verifyDone = null;
        self.ajaxQueue = {length : 0};

        self.formData = {};
    }

    Verify.prototype.init = function(){
        var self = this;

        // dom config
        self.domConfig = {
            /**
             * input包裹样式名称
             * @type class name
             */
            inputWrapperCssName : 'form-item',
            /**
             * 错误input包裹样式名称 ==> 普通输入框
             * @type class name
             */
            inputWrapperErrorCssName : 'error-item',
            /**
             * input包裹的jQuery dom
             * @type jQuery Dom
             */
            inputWrapperDom : '.form-item',
            /**
             * input的jQuery dom
             * @type jQuery Dom
             */
            inputDom : '.form-item input',
            /**
             * palceholder的jQuery dom
             * @type jQuery Dom
             */
            labelDom : 'i',
            /**
             * 提示标志的jQuery dom
             * @type jQuery Dom
             */
            tipsDom : '.verify-tips',
            /**
             * 成功标志的jQuery dom
             * @type jQuery Dom
             */
            successDom : '.verify-success',
            /**
             * 错误标志的jQuery dom
             * @type jQuery Dom
             */
            errorDom : '.verify-error'
        };

        // verify config
        self.verifyConfig = {
            notNull : {
                reg : /[^\s|.]/,
                withName : true,
                msg : '必填'
            },
            required : {
                reg : /[^\s|.]/,
                withName : true,
                msg : '必填'
            },
            linkRequired : {
                withName : true,
                msg : '必填'
            },
            number : {
                reg : /^\d+$/,
                msg : '只能是数字'
            },
            numOrEn : {
                reg : /^[0-9a-zA-Z]+$/,
                msg : '只能是英文或者数字'
            },
            errorStr : {
                reg : /^[^\&\<\>]*$/,
                msg : '包含非法字符'
            },
            maxlength : {
                msg : '过长'
            },
            email : {
                reg : /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                msg : '邮箱格式错误'
            },
            nullOrEmail : {
                reg : /^.{0}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                msg : '邮箱格式错误'
            },
            mobile : {
                reg : /^1[3|4|5|7|8]\d{9}$/,
                msg : '手机号格式错误'
            },
            username : {
                reg : /^1[3|4|5|7|8]\d{9}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
                msg : '邮箱/手机号格式错误'
            },
            password : {
                reg : /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
                msg : '密码格式错误'
            },
            nullOrMobile : {
                reg : /^.{0}$|^1[3|4|5|7|8]\d{9}$/,
                msg : '手机号码格式错误'
            },
            zip : {
                reg : /^\d{6}$/,
                msg : '邮编格式错误'
            },
            api : {
                reg : /^[\da-zA-Z\/\-.?=!]+$/,
                msg : 'API 格式错误'
            },
            nullOrTelephoneArea : {
                reg : /^.{0}$|^0\d{2,3}$/,
                msg : '格式错误'
            },
            nullOrTelephone : {
                reg : /^.{0}$|^\d{6,8}$/,
                msg : '格式错误'
            },
            notExist : {
                withName : true,
                msg : '不存在'
            },
            strRange : {
                msg : "字符串非法或过长"  //strRange,{1-2}
            },
            json : {
                msg : "非法 JSON 格式"
            },
            ajax : {
                msg : "已存在"
            },
            price : {
                reg : /^\d+(\.\d{1,2})?$/,
                msg : '格式错误'
            },
            max : {
                msg : '超过最大值'
            },
            imei : {
                reg : /^\d{15}$/,
                msg : '格式错误'
            }
        };

    };

    /**
     * 绑定input状态切换
     * @type Function
     */
    Verify.prototype.bindForm = function(options){
        var self = this;

        var $wrapper = options.wrapper,
            domConfig = self.domConfig;


        // bind input text methods 'mouseenter' and 'focus'
        var doAnimateByFocus = function (event) {
                // var $text = $(this),
                //     $textWrapper = $text.closest( domConfig.inputWrapperDom );

                // $textWrapper.addClass( domConfig.inputWrapperFocusCssName );

                // if ( event.type == 'focusin' ) {

                //     $textWrapper.find('input').trigger('clearError');

                //     // 验证码操作

                //     var $otherTips = $textWrapper.next( domConfig.tipsDom );

                //     $textWrapper.addClass('module-form-item-shadow');

                //     $wrapper.find( domConfig.tipsDom ).not($otherTips).fadeOut();
                //     $otherTips.fadeIn(200, function () {
                //         $(document).off('click', bindOnceTips);
                //         $(document).on('click', bindOnceTips);
                //     });
                // }
            },
            // bind input text methods 'mouseleave' and 'blur'
            doAnimateByBlur = function (event) {
                // var $text = $(this),
                //     $textWrapper = $text.closest( domConfig.inputWrapperDom );

                // $textWrapper.toggleClass( domConfig.inputWrapperFocusCssName, ($text.val() != '') );

                // $(this).siblings( domConfig.labelDom ).toggle($text.val() == '');

                // if ( event.type == 'focusout' ) {
                //     // 验证码操作
                //     $textWrapper.removeClass('module-form-item-shadow');
                //     // $textWrapper.siblings( domConfig.tipsDom ).fadeOut(200);
                // }
            },
            // bind one click to fade out tips
            bindOnceTips = function (e) {
                var target = e.target;
                if ($(target).closest('.js-verify-item-row').length == 1) {
                    return;
                }
                $wrapper.find( domConfig.tipsDom ).fadeOut(200);

                $(document).off('click', bindOnceTips);
            };

        // 绑定input获得焦点事件
        $wrapper.on('click', domConfig.inputWrapperDom, function () {
            $(this).find('input').focus();
        })
        // 绑定input的鼠标进入和获得焦点事件
        // .on('mouseenter focus', domConfig.inputDom, doAnimateByFocus)
        // 绑定input的鼠标离开和失去焦点事件
        // .on('mouseleave blur', domConfig.inputDom, doAnimateByBlur)
        // 绑定input的按键按下的事件
        .on('keydown', domConfig.inputDom, function () {
            $(this).siblings( domConfig.labelDom ).hide();
        })
        // 绑定input的按键抬起的事件
        .on('keyup', domConfig.inputDom, function (event) {
            var elText = $(this),
                val = elText.val();

            if ( event.which != 13 ) {

                // elText.closest( domConfig.inputWrapperDom ).removeClass( domConfig.inputSmallErrorCssName + ' invalid ' + domConfig.inputWrapperErrorCssName );

                // if ( Store.config.isNormalIE ) {
                //     elText.siblings( domConfig.errorDom ).css('opacity', 0).animate({'opacity' : '1'}, 300);
                // } else {
                //     if ( Store.config.opacity ) {
                //             setTimeout(function () {
                //                 elText.siblings( domConfig.errorDom ).hide();
                //             }, 200);

                //     } else {
                //         elText.siblings( domConfig.errorDom ).hide();
                //     }
                // }

            }

            // if ( !val ) {
            //     elText.siblings( domConfig.labelDom ).show();
            // }
            elText.attr('data-verifyed', false);
        });

        // if ( Store.config.isMobile && Store.config.isUC ) {
        //     $wrapper.off('mouseenter focus', domConfig.inputDom, doAnimateByFocus)
        //         // 绑定input的鼠标离开和失去焦点事件
        //         .off('mouseleave blur', domConfig.inputDom, doAnimateByBlur)
        // }

        // 移动端使用 placeholder
        // self.usePlaceholder($wrapper);

    }

    /**
     * 移动端使用 placeholder 方式
     * @type Function
     */
    Verify.prototype.usePlaceholder = function($wrapper){

        var self = this,
            domConfig = self.domConfig;

        if ( Store.config.isMobile ) {
            $wrapper.find(domConfig.inputDom).each(function () {
                $(this).attr(
                    'placeholder',
                    $(this).siblings(domConfig.labelDom).text()
                );
            });
        }
    }

    /**
     * 绑定验证控件
     * @type Function
     */
    Verify.prototype.bindVerify = function(options){
        var self = this;

        var option = $.extend({
            wrapper : $('.wrapper'),
            verifyDom : '.js-verify',
            button : $('.button'),
            beforeVerify : null, // [null || function]
            success : null, // [null || function]
            error : null // [null || function]
        }, options);

        var $wrapper = option.wrapper,
            domConfig = self.domConfig;

        self.bindForm({
            wrapper : $wrapper
        });

        $wrapper.on('blur verify', option.verifyDom, function () {
            var $dom = $(this),
                tagName = $dom.get(0).nodeName,
                dataVer = $dom.data("verify"),
                val = "";
            val = $dom.val();

            if ( tagName == 'SELECT' ) {
                val = val == '0' ? '' : val;
            }

            self.parseVer(dataVer, val, $dom);
        });

        $wrapper.on('change', 'select', function () {
            if ( $(this).val() != '0' ) {
                $(this).trigger('clearError');
            }
        });

        $wrapper.on('clearError', option.verifyDom, function () {
            var $text = $(this),
                $textWrapper = $text.closest( domConfig.inputWrapperDom );

            $textWrapper.toggleClass( domConfig.inputWrapperErrorCssName, false );

            if ( $text.val() != '' ) {
                $text.siblings( domConfig.labelDom ).toggle(false);
            }


        });

        $wrapper.on('reset', option.verifyDom, function () {
            var $dom = $(this),
                baseVal = $dom.data('val') ? $dom.data('val') : '';

            $dom.attr('data-verifyed', false);
            $dom.val(baseVal);

            $dom.siblings( domConfig.labelDom ).show();

            $dom.closest( domConfig.inputWrapperDom ).removeClass( domConfig.inputWrapperErrorCssName );
        });

        $wrapper.on('normal', option.verifyDom, function () {
            var $dom = $(this);

            $dom.attr('data-verifyed', false);

            $dom.siblings( domConfig.labelDom ).hide();

            $dom.closest( domConfig.inputWrapperDom ).removeClass( domConfig.inputWrapperErrorCssName );
        });

        if ( !option.button ) {
            throw new Error('verify button is not exist');
        }

        option.button.on('click', function () {
            var canVerify = true;
            if ( typeof option.beforeVerify == 'function' ) {
                canVerify = option.beforeVerify(option);
            }

            if ( canVerify == false ) {
                return false;
            }

            var verifyResult = self.verifyFinsh(option);

            // 通过验证
            if ( !!verifyResult ) {
                self.formData = Store.getData( $wrapper );
                typeof option.success && option.success(self, self.formData);
            }
            // 未通过验证
            else {
                typeof option.error == 'function' && option.error(self.verifyError, self);
            }
        });

        self.verifyAllItems = function () {
            return self.verifyFinsh(option);
        };

        return self;

    }

    /**
     * 使用验证
     * @param {Query Dom} dom 被操作dom
     * @param {String} [可选] class 验证钩子
     * @param {Array}  [可选]terms 验证项
     */
    Verify.prototype.useVerify = function(option){
        var self = this,
            className = option.className || 'js-verify';

        option.dom.toggleClass(className, true);

        if ( option.terms && option.terms.constructor === Array ) {
            option.dom.attr('data-verify', option.terms.join('/'));
        }
    }

    /**
     * 移出验证
     * @param {Query Dom} dom 被操作dom
     * @param {String} [可选] class 验证钩子
     * @param {Boolean}  [可选]terms 是否移除验证项
     */
    Verify.prototype.removeVerify = function(option){
        var self = this,
            className = option.className || 'js-verify';

        option.dom.toggleClass(className, false);

        if ( option.terms ) {
            option.dom.removeAttr('data-verify');
        }
    }

    /**
     * 拆分验证条件
     * @param {String} data 全部验证信息 格式为xxx:xxx/xxx 注:/为条件分隔符
     * @param {String} val 被验证数据
     * @param {jQuery Object} dom 被验证jQuery Object
     */
    Verify.prototype.parseVer = function(data, val, dom){
        var self = this,
            verData = data && data.match(/(^.*)\:(.+)/),
            name, vers, result, flag = false;
        if ( !!verData ) {
            name = verData[1];
            vers = verData[2].split("/");
            if ( $.trim(val) == "" ) {
                if( $.inArray("notNull", vers) != -1 ){
                    var msg = dom.attr('data-verify-msg-notnull') || "必填";
                    self.thrown(dom, msg);
                }else{
                    self.verified(dom);
                }
            }else{
                for(var i = 0; i < vers.length; i++){
                    result = self.match(val, name, vers[i], dom);
                    if ( result != "ajax" && !result ){
                        break;
                    }
                }
            }
        }
    };

    /**
     * 验证单条条件
     * @param {String} val 被验证数据
     * @param {String} name 验证信息名称
     * @param {String} ver 单条验证信息
     * @param {jQuery Object} dom 被验证jQuery Object
     */
    Verify.prototype.match = function(val, name, ver, dom){
        var self = this,
            _ver = ver.match(/^([^\,]+)\,\{?([^\}]+)\}?$/), // 匹配"ver,({)xxx(})" ==> [1]:ver, [2]:xxx
            term = !!_ver ? _ver[1] : ver,
            mapTerm = self.verifyConfig[term],
            msg = "", doTest;
        // 验证条件存在时
        if ( !!mapTerm) {
            msg = dom.attr('data-verify-msg-' + term.toLowerCase()) || name + mapTerm.msg;
            // 正则验证时
            if ( !!mapTerm.reg ) {
                if ( mapTerm.reg.test(val) ) {
                    self.verified(dom);
                    return true;
                }else{
                    self.thrown(dom, msg);
                    return false;
                }
            }
            // 函数验证时
            else if ( !!self[term] ) {
                if ( !!_ver ) {
                    doTest = self[term](val, msg, dom, _ver[2]);
                }else{
                    doTest = self[term](val, msg, dom, term);
                }
                if ( !!doTest.result ) {
                    if ( doTest.result == 'ajax' ) {
                        doTest.ajax.done(function () {
                            self.verified(dom);
                            delete self.ajaxQueue[doTest.ajaxID];
                        }).fail(function () {
                            self.thrown(dom, doTest.msg);
                            delete self.ajaxQueue[doTest.ajaxID];
                        });
                    } else {
                        self.verified(dom);
                    }
                }else{
                    self.thrown(dom, doTest.msg);
                }
                return doTest.result;
            }
        }
        else{
            alert( term + ': 不是有效的验证条件!!!');
        }
    };

    /**
     * 验证成功
     * @param {jQuery Object} dom 被验证jQuery Object
     */
    Verify.prototype.verified = function(dom){
        var self = this,
            domConfig = self.domConfig,
            $wrapper = dom.closest(domConfig.inputWrapperDom);

        dom.attr('data-verifyed', true);

        $wrapper.removeClass( domConfig.inputWrapperErrorCssName );
        dom.siblings( domConfig.errorDom ).hide();
        dom.siblings( domConfig.successDom ).show();
    };

    /**
     * 验证失败
     * @param {jQuery Object} dom 被验证jQuery Object
     * @param {String} msg 输出的错误提示
     * @param {Boll} once 一次性提示
     */
    Verify.prototype.thrown = function(dom, msg, once){
        var self = this,
            domConfig = self.domConfig,
            $wrapper = dom.closest(domConfig.inputWrapperDom);

        !once && dom.attr('data-verifyed', false);
        !self.verifyError && ( self.verifyError = dom );
        dom.siblings( domConfig.errorDom ).text( msg ).show();

        dom.siblings( domConfig.successDom ).hide();

        setTimeout(function () {
            $wrapper.addClass( domConfig.inputWrapperErrorCssName );
        }, 1);
    };

    /**
     * 充值验证输入框
     * @param {jQuery Object} dom 被验证jQuery Object 包裹
     * @param {jQuery Class}  verClass 验证项的样式名
     */
    Verify.prototype.reset = function( $wrapper, verClass){
        var self = this,
            verClass = verClass || 'js-verify';

        $wrapper.find('.' + verClass).trigger('reset');

    };

    /**
     * 判断是否最终验证成功
     * @param {jQuery Object} dom 被验证jQuery Object
     */
    Verify.prototype.verifyFinsh = function(option){
        var self = this,
            $verDom = option.wrapper.find(option.verifyDom + '[data-verifyed!="true"]:visible');

        if ( $verDom.length ) {
            self.verifyError = null;
            self.verifyDone = false;
            $verDom.each(function () {
                $(this).trigger('verify');
            });

            // 再次执行验证，从新获取错误的dom
            $verDom = option.wrapper.find(option.verifyDom + '[data-verifyed!="true"]:visible');

            if ( $verDom.length ) {
                return false;
            }
        }

        self.verifyDone = true;
        return true;

    };

    /**
     * 验证条件：被验证数据为普通字符串且在{n-m}字数范围中 例:strRange,{100-200}
     * @param {String} val 被验证数据
     * @param {String} msg 错误信息
     * @param {jQuery Object} dom 被验证jQuery Object
     * @param {String} range 范围值
     * @return {Object} { result : true|false, msg : msg };
     */
    Verify.prototype.strRange = function(val, msg, dom, range){
        var self = this,
            strMin = range.split("-")[0],
            strMax = range.split("-")[1],
            _reg = new RegExp('^[\\S\\.\\s]{' + strMin + ',' + strMax + '}$'),
            _msg = (strMin == 0 ? 1 : strMin) + '~' + strMax + '个字符';
        if( _reg.test(val) ) {
            return { result : true, msg : _msg };
        } else {
            return { result : false, msg : _msg };
        }
    }

    /**
     * 验证条件：被验证数据为普通字符串且小等于{max} 例:max,{200}
     * @param {String} val 被验证数据
     * @param {String} msg 错误信息
     * @param {jQuery Object} dom 被验证jQuery Object
     * @param {String} range 范围值
     * @return {Object} { result : true|false, msg : msg };
     */
    Verify.prototype.max = function(val, msg, dom, range){
        var self = this,
            val = val | 0,
            range = range | 0;

        if( val <= range ) {
            return { result : true, msg : msg };
        } else {
            return { result : false, msg : msg };
        }
    }

    /**
     * 验证条件：被验证数据为 JSON 格式 例:json
     * @param {String} val 被验证数据
     * @param {String} msg 错误信息
     * @param {jQuery Object} dom 被验证jQuery Object
     * @param {String} range 范围值
     * @return {Object} { result : true|false, msg : msg };
     */
    Verify.prototype.json = function(val, msg, dom, range){
        var self = this,
            flag = true;

        try {
            JSON.parse(val);
        }
        catch (e) {
            flag = false;
        }

        return { result : flag, msg : msg };
    }

    /**
     * 验证条件：是否存在 例:ajax
     * @event
     * @param {String} val 被验证数据
     * @param {String} msg 错误信息
     * @param {jQuery Object} dom 被验证jQuery Object
     * @param {String} url 隐藏参数 ajax url 为dom的data-ajax-type属性的值
     * @param {String} label 隐藏参数 ajax key 为dom的data-ajax-key属性的值
     * @return {Object} { result : "ajax", ajax : defer, msg : msg };
     */
    Verify.prototype.ajax = function(val, msg, dom, range){
        var self = this,
            ajaxID = ( new Date() ).getTime(),
            ajaxData = {},
            ajaxUrl = Store.config.verifyUrlMap[dom.data('ajaxType')] || '',
            ajaxKey = dom.data('ajaxKey').split(','),
            ajaxVal = ['base'].concat(dom.data('ajaxVal').split(','));

        msg = dom.data('verify-msg-ajax') || msg;

        ajaxData[ ajaxKey[0] ] = val;

        for (var i = 1, l = ajaxKey.length; i < l; i++) {
            ajaxData[ ajaxKey[i] ] = $('.' + ajaxVal[i]).val();
        };

        self.ajaxQueue[ajaxID] = mainService.ajax({
            url : ajaxUrl,
            data : ajaxData,
            dataType : 'jsonp',
            success : function () {

            },
            error : function () {
                return false;
            }
        });

        return { result : "ajax", ajax : self.ajaxQueue[ajaxID], ajaxID : ajaxID, msg : msg };

    }

    return( new Verify() );

})( jQuery, window.Store ));
