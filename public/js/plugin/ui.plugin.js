/*
 *@description UI
 *@author：xu chen 
 *@date：2014-6-26
 *@update：2014-6-26
*/
'use strict';

window.Store.addPlugin('UI', (function( $, Store ){

    function UI() {
        var self = this;

        self.ScrollbarPlugin = null;
    }

    UI.prototype.init = function(){
        var self = this;

        self.ScrollbarPlugin = Store.getPlugin('Scrollbar');
    };

    /**
     * choose invoice UI
     * @type Function
     * @param {jQuery dom} options.styleWrapper        发票类型jQuery dom
     * @param {jQuery dom} options.typeWrapper         发票抬头jQuery dom
     * @param {Number String} options.styleDefault     [可选]发票类型默认值
     * @param {Number String} options.typeDefault      [可选]发票抬头默认值
     */
    UI.prototype.chooseInvoice = function(options){
        var self = this,
            $styleWrapper = options.styleWrapper,
            $typeWrapper = options.typeWrapper,
            styleDefault = options.styleDefault
                         ? options.styleDefault
                         : Store.config.useWebInvoice ? 2 : 0,
            typeDefault = options.typeDefault || 0,
            module = {};

        // 选择发票抬头
        var chooseType = self.radio({
            wrapper : $typeWrapper,
            name : 'invoice_type',
            checked : typeDefault,
            callback : function ($radio, opt) {
                var $textWrapper = opt.wrapper.find('.module-form-row'),
                    $text = $textWrapper.find('input');

                $radio.closest('.js-invoice-item').toggleClass('invoice-item-selected', true)
                    .siblings().toggleClass('invoice-item-selected', false);

                // 选择单位抬头
                if ( $radio.data('id') == 1 ) {
                    $text.toggleClass('js-verify', true);

                    $textWrapper.show();
                    if ( Store.config.opacity ) {
                        $textWrapper.css({
                                opacity: 0
                            })
                            .animate(
                                {
                                    opacity : 1
                                },
                                200,
                                function () {
                                    $text.focus();
                                }
                            );
                    } else {
                        $text.focus();
                    }
                }
                // 选择个人抬头
                else {
                    $text.toggleClass('js-verify', false);

                    if ( Store.config.opacity ) {
                        $textWrapper.animate(
                                {
                                    opacity : 0
                                },
                                200,
                                function () {
                                    $textWrapper.hide();
                                }
                            );
                    } else {
                        $textWrapper.hide();
                    }
                }
            }
        });

        // 选择发票类型
        var chooseStyle = self.radio({
            wrapper : $styleWrapper,
            name : 'invoice_style',
            checked : styleDefault,
            callback : function ($radio, opt) {
                var invoiceType = $radio.val(),
                    $company = $typeWrapper.find('.js-invoice-item:last');

                if ( invoiceType == 0 ) {
                    chooseType.on(typeDefault);
                    $company.show();
                } else {
                    chooseType.on(0);
                    $company.hide();
                }
            }
        });

        module.chooseStyle = chooseStyle;
        module.chooseType = chooseType;

        return module;
    }

    /**
     * chooseTags UI
     * @type Function
     * @param {JSON}      options                 参数集合
     * @param {jQuery}    options.$wrapper        大包裹
     * @param {jQuery}    options.$tagList        选项卡包裹
     * @param {jQuery}    options.$conList        内容包裹
     * @param {String}    options.tagSelectClass  选项卡选中的样式
     * @param {String}    options.conSelectClass  内容区选中的样式
     * @param {Function}  options.tagFn           点击选项卡的回调
     */
    UI.prototype.chooseTags = function(options){
        var self = this,
            $wrapper = options.$wrapper,
            $tagList = options.$tagList || $wrapper.find('.tag-list'),
            $conList = options.$conList || $wrapper.find('.con-list'),
            tagSelectClass = options.tagSelectClass || 'select-tag',
            conSelectClass = options.conSelectClass || 'select-con';

        if ( !$wrapper.data('init-choose-tags') ) {
            $wrapper.data('init-choose-tags', true);

            $tagList.on('click', '.tag-item', function () {
                var $tag = $(this);

                if ( !$tag.hasClass( tagSelectClass ) ) {
                    $tag.siblings().toggleClass( tagSelectClass, false );
                    $tag.toggleClass( tagSelectClass, true );

                    var index = $tag.index(),
                        $con = $conList.find('.con-item').eq(index);

                    $conList.find('.con-item').toggleClass( conSelectClass, false );
                    $con.toggleClass( conSelectClass, true );

                    Store.isFunction( options.tagFn ) && options.tagFn($tag, $con);
                }
            });

            $tagList.find('.tag-item:first').click();
        }

    }

    /**
     * captcha UI
     * @type Function
     * @param {jQuery dom} options.wrapper      弹出框jQuery dom
     * @param {jQuery selector} options.box     [可选] 验证码的盒子
     */
    UI.prototype.captcha = function(options){
        var self = this,
            $wrapper = options.wrapper,
            boxClass = options.box || '.verifycon';

        if ( !$wrapper.data('init-captcha') ) {
            $wrapper.data('init-captcha', true);

            // $wrapper.on('click', '[data-ui-captcha]', function () {
            //     var $captcha = $(this),
            //         time = +(new Date()),
            //         url = Store.config.captcha[ $captcha.data('type') ];

            //     $captcha.attr('src', url + time);
            // });

            $wrapper.on('click', boxClass, function () {
                var $captcha = $(this).find('[data-ui-captcha]'),
                    time = +(new Date()),
                    url = Store.config.captcha[ $captcha.data('type') ];

                url = url.replace(/\&*$/gi, '');

                $captcha.attr('src', url + '&' + time);
            });

        }

    }

    /**
     * radio UI
     * @type Function
     * @param {JSON}      options.wrapper             配置信息
     * @param {jQuery}    options.wrapper             弹出框jQuery dom
     * @param {String}    options.name                input 的 name
     * @param {String}    options.normalClass         模拟样式
     * @param {String}    options.checkedClass        选中的模拟样式
     * @param {String}    options.checked       [可选] 参数为需要选中的 id,默认为第一个选项
     * @param {Boolean}   options.notDefault          不使用第一个值为默认项
     * @param {Function}  options.callback            回调函数
     */
    UI.prototype.radio = function(options){
        var self = this,
            $wrapper = options.wrapper,
            name = options.name,
            normalClass = options.normalClass || 'blue-radio',
            checkedClass = options.checkedClass || 'blue-radio-on';

        if ( !$wrapper.data('init-' + name) ) {
            $wrapper.data('init-' + name, true);

            $wrapper.on('change', '[name=' + name + ']', function () {
                var $radio = $(this);

                if ( $radio.next('.' + normalClass + '[data-radio-name=' + name + ']').hasClass( checkedClass ) ) {
                    return false;
                }

                $wrapper.find('.' + checkedClass + '[data-radio-name=' + name + ']').removeClass(checkedClass);

                $radio.next('.' + normalClass + '[data-radio-name=' + name + ']').toggleClass( checkedClass, true );

                typeof options.callback == 'function' && options.callback($radio, options);
            }).on('click', '.' + normalClass + '[data-radio-name=' + name + ']', function () {
                var $radio = $(this).prev(':radio');

                if ( $radio.prop('checked') ) {
                    return false;
                }

                $wrapper.find('[name=' + name + ']:checked').prop('checked', false);

                $radio.prop('checked', true).change();
            });

            if ( options.checked !== undefined ) {
                $wrapper.find(':radio[name=' + name + '][data-id=' + options.checked + ']').prop('checked', true ).change();
            }
            // 默认选中第一个
            else {
                !options.notDefault && $wrapper.find(':radio[name=' + name + ']:first').prop('checked', true ).change();
            }
        }

        // 返回调用方法
        return {
            // 选中
            on : function (id) {

                var $radio = $wrapper.find('[name=' + options.name + '][data-id=' + id + ']');

                if ( $radio.prop('checked') ) {
                    return false;
                }

                $radio.prop('checked', true ).change();
                typeof options.callback == 'function' && options.callback($radio, options);
            },
            // 返回选中的 id
            choosed : function () {
                return {
                    id : $wrapper.find('[name=' + options.name + ']:checked').data('id') + ''
                };
            }
        }
    }

    /**
     * checkbox UI
     * @type Function
     * @param {jQuery dom} options.wrapper 弹出框jQuery dom
     * @param {string} options.name, input 的 name
     * @param {string} options.normalClass, 模拟样式
     * @param {string} options.checkedClass, 选中的模拟样式
     * @param {function} options.callback 回调函数
     */
    UI.prototype.checkbox = function(options){
        var self = this,
            $wrapper = options.wrapper,
            name = options.name,
            normalClass = options.normalClass || 'blue-checkbox',
            checkedClass = options.checkedClass || 'blue-checkbox-on',
            disableClass = options.disableClass || 'blue-checkbox-disable';

        if ( !$wrapper.data('init-' + name) ) {
            $wrapper.data('init-' + name, true);

            $wrapper.on('change', '[name=' + name + ']', function () {
                var $checkbox = $(this);

                $checkbox.next('.' + normalClass).toggleClass( checkedClass, $checkbox.prop('checked') );
                typeof options.callback == 'function' && options.callback($checkbox);

            }).on('click', '.' + normalClass + '[data-checkbox-name=' + name + ']', function () {

                var $checkbox = $(this).prev(':checkbox');
                $checkbox.prop('checked', !$checkbox.prop('checked') ).change();
            });

            if ( options.checked !== undefined ) {
                var arr = options.checked.constructor === Array ? options.checked : options.checked.split(',');

                $.each(arr, function (index, item) {
                    $wrapper.find(':checkbox[name=' + name + '][data-id=' + item + ']').prop('checked', true ).change();
                });
                
                
            }
        }

        // 返回调用方法
        return {
            disabled : function (items) {
                var items = items === undefined
                          ? undefined
                          : items.constructor === Array ? items : [items];

                // 某一个或者多个 checkbox 禁用
                if ( items ) {
                    $.each(items, function (index, item) {
                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']');
                        
                        $checkbox.next('.' + normalClass).toggleClass( normalClass, false).toggleClass( disableClass, true); 
                    });
                }
                // 全部禁用
                else {
                    $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass( normalClass, false).toggleClass( disableClass, true );
                }
            },
            // 选中
            on : function (items, callback) {
                var callback = callback || ( typeof items == 'function' ? items : undefined );
                var items = items && typeof items != 'function'
                            ? ( items.constructor === Array ? items : [items] )
                            : undefined;

                // 某一个或者多个 checkbox 选中
                if ( items ) {
                    $.each(items, function (index, item) {
                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']');
                        
                        if ( callback ) {
                            $checkbox.prop('checked', true);
                            $checkbox.next('.' + normalClass).toggleClass( checkedClass, true);
                        } else {
                            $checkbox.prop('checked', true).change();
                        } 
                    });

                    callback && callback();
                }
                // 全选
                else {
                    // 执行私有回调
                    if ( callback ) {
                        $wrapper.find('[name=' + options.name + ']').prop('checked', true);
                        $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass( checkedClass, true );
                        callback && callback();
                    }
                    // 执行默认回调
                    else {
                        $wrapper.find('[name=' + options.name + ']').each(function () {
                            $(this).prop('checked', true).change();
                        });
                    }
                }
            },
            // 反选
            off : function (items, callback) {
                var callback = callback || ( typeof items == 'function' ? items : undefined );
                var items = items && typeof items != 'function'
                            ? ( items.constructor === Array ? items : [items] )
                            : undefined;

                // 某一个或者多个 checkbox 取消选中
                if ( items ) {
                    $.each(items, function (index, item) {
                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']:checked');
                        
                        if ( callback ) {
                            $checkbox.prop('checked', false);
                            $checkbox.next('.' + normalClass).toggleClass( checkedClass, false);
                        } else {
                            $checkbox.prop('checked', false).change();
                        } 
                    });

                    callback && callback();
                }
                // 全部取消选中
                else {
                    // 执行私有回调
                    if ( callback ) {
                        $wrapper.find('[name=' + options.name + ']').prop('checked', false);
                        $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass( checkedClass, false );
                        callback && callback();
                    }
                    // 执行默认回调
                    else {
                        $wrapper.find('[name=' + options.name + ']:checked').each(function () {
                            $(this).prop('checked', false).change();
                        });
                    }
                }
            },
            // 返回选中的 id 集合
            choosed : function () {
                var arr = [];

                $wrapper.find('[name=' + options.name + ']:checked').each(function () {
                    arr.push({
                        id : $(this).data('id') + ''
                    });
                });

                return arr;
            }
        }
    }

    /**
     * select UI
     * @type Function
     * @param {jQuery dom} wrapper 包裹wrpaaer
     * @param {object} data 数据集合
     * @param {object} callback 回调函数集合
     */
    UI.prototype.select = function(options){
        var self = this,
            option = $.extend({
                wrapper : $('.wrapper'),
                data : {},
                callback : {}
            }, options),
            $wrapper = option.wrapper;

        // init plugin
        var arrTemplate = [];

        arrTemplate.push('<div class="ui-select">');
            arrTemplate.push('<label>请选择</label>');
            arrTemplate.push('<img src="img/i.gif" class="ui-select-icon" />');
            arrTemplate.push('<div class="ui-select-menu js-scroll-wrapper">');
                arrTemplate.push('<ul class="js-scroll-container"></ul>');
                arrTemplate.push('<div class="scrollbar js-scroll-sidebar">');
                    arrTemplate.push('<div class="scrollbar-block js-scroll-block"></div>');
                arrTemplate.push('</div>');
            arrTemplate.push('</div>');
        arrTemplate.push('</div>');


        // bind UI
        $wrapper.find('select').each(function () {
            var $select = $(this);
            if ( !$select.data('init') ) {
                $select.data('init', true);

                var $template = $(arrTemplate.join(''));

                $select.after( $template );

                var $uiSelect = $select.next();

                $select.hide();

                $select.data('class') && $uiSelect.addClass( $select.data('class') );

                var fn = option.callback[ $select.data('medth') ];

                if ( typeof fn == 'function' ) {
                    $uiSelect.data('callback', fn);
                }

                var data = option.data[ $select.data('data') ];

                if ( !data ) {
                    throw new Error('ui select data "' + $select.data('data') + '" is not found !!!');
                    return false;
                }

                self.changeSelectData(data, $uiSelect, $select);

                self.ScrollbarPlugin.bind($uiSelect, 25);
            }
        });

        // init fn
        if ( !$wrapper.data('init') ) {
            $wrapper.data('init', true);

            $wrapper.on('change', 'select', function () {
                var $select = $(this),
                    $uiSelect = $select.next();

                // console.log($select.children('option:selected').text());

                if ( typeof $uiSelect.data('fn') == 'function' ) {
                    $uiSelect.data('fn')($select, $uiSelect);
                }

            });

            $wrapper.on('click', '.ui-select', function (event) {
                var $menu = $(this).find('.ui-select-menu');
                if ( !$(event.target).hasClass('ui-select-menu') ) {
                    $menu.fadeIn(100, function() {
                        $(document).on('click', function (e) {
                            if ( !$(e.target).hasClass('scrollbar-block') ) {
                                $menu.fadeOut(200);
                                $(document).off('click');
                            }
                        });
                    });
                }
            });

            $wrapper.on('click', '.js-ui-select-option', function () {
                var $uiOption = $(this),
                    $uiSelect = $uiOption.closest('.ui-select'),
                    $select = $uiSelect.prev('select');

                $uiSelect.find('label').text( $uiOption.data('label') );
                $uiSelect.data('value', $uiOption.data('value') );

                $select.children('option[value="' + $uiOption.data('value') + '"]').select();
            });
        }
    }

    /**
     * changeSelectData
     * @type Function
     */
    UI.prototype.changeSelectData = function(data, $uiSelect, $select){
        var self = this;

        var labelName = $select.data('labelName') || 'label',
            valueName = $select.data('valueName') || 'value',
            arrData = ['<li class="js-ui-select-option" data-value="0" data-label="请选择">请选择</li>'],
            arrOption = ['<option value="0">请选择</option>'];

        $.each(data, function (index, item) {
            arrData.push('<li class="js-ui-select-option" data-value="' + item[valueName] + '" data-label="' + item[labelName] + '">' + item[labelName] + '</li>');
            arrOption.push('<option value="' + item[valueName] + '>' + item[labelName] + '</option>');
        });

        $uiSelect.find('ul').html(arrData.join(''));
        $select.html(arrOption.join(''));
    }

    /**
     * loading button UI
     * @type Function
     * @param {button dom} btn 应用的btn
     */
    UI.prototype.loadingBtn = function (btn) {

        var $status = btn.children().length
                    ? btn.children()
                    : btn;

        btn.on('click', function (event) {
            if ( btn.hasClass('js-status-loading') ) {
                event.stopPropagation();
                return false;
            }
        });

        var medth = {
            loading : function () {
                btn.toggleClass('js-status-loading', true);
            },
            reset : function () {
                btn.toggleClass('js-status-loading', false);
            }
        };

        return medth;
    }

    return( new UI() );
    
})( jQuery, window.Store ));