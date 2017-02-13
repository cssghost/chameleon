webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	module.exports = __webpack_require__(9);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description Filter
	 *@author：xu chen
	 *@date：2014-4-14
	 *@update：2014-4-14
	 */
	'use strict';

	window.Store.addFilter(function ($, Store) {
	    /**
	     * @author XuChen
	     * @name Filter
	     * @class 筛选器方法
	     */
	    function Filter() {};

	    /**
	     * to JSON
	     * @type Function
	     * @param {text} 字符串
	     */
	    Filter.prototype.json = function (text, param, model) {
	        return JSON.stringify(model);
	    };

	    /**
	     * encodeURIComponent
	     * @type Function
	     * @param {text} 字符串
	     */
	    Filter.prototype.url = function (text) {
	        return encodeURIComponent(text);
	    };

	    /**
	     * 人民币
	     * @type Function
	     * @param {text} 字符串
	     */
	    Filter.prototype.rmb = function (text, isFloat) {
	        if (text == undefined) {
	            return '';
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

	        var returnResult = '¥ ' + strArr.reverse().join('').replace(/\,$/gi, '');

	        if (typeof isFloat == 'boolean' && isFloat || isFloat == 'true') {
	            returnResult = returnResult + '.' + (strLast == '' ? '00' : strLast);
	        }

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
	    Filter.prototype.floatNumber = function (number, float) {
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

	        return strPrev + '.' + (strLast == '' ? '00' : strLast) - 0;
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
	    Filter.prototype.realtime = function (timestamp) {

	        if (timestamp || timestamp == 0) {

	            // timestamp /= 1000;

	            var day = Math.floor(timestamp / 24 / 60 / 60),
	                hourStamp = timestamp - day * 24 * 60 * 60,
	                hour = Math.floor(hourStamp / 60 / 60),
	                minStamp = hourStamp - hour * 60 * 60,
	                min = Math.floor(minStamp / 60),
	                second = minStamp - min * 60;

	            var strDay = day > 0 ? ' ' + day + ' 天' : '',
	                strHour = hour > 0 || day > 0 ? ' ' + hour + ' 小时' : '',
	                strMin = min > 0 || day > 0 || hour > 0 ? ' ' + min + ' 分钟' : '',
	                strSecond = ' ' + second + ' 秒';

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
	    Filter.prototype.remainingtime = function (timestamp, nowTime) {
	        var timestamp = this.timestamp(timestamp),
	            nowTime = this.timestamp(nowTime);

	        if (timestamp) {

	            var difference = Math.abs(nowTime - timestamp);

	            return self.realtime(difference);
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
	                var realSrc = splitSrc.pop().replace(/(\.[^.]+)$/, '@2x$1');
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
	            // realSrc = isRetina ? (src + name +'@2x.png') : (src + name + '.png');
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

	    return Filter;
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description UI
	 *@author：xu chen 
	 *@date：2014-8-14
	 *@update：2014-8-14
	*/
	'use strict';

	window.Store.addUI(function ($, Store) {
	    /**
	     * @author XuChen 
	     * @name UI
	     * @class 筛选器方法
	     */
	    function UI() {
	        var self = this;

	        self.OrderProcessService = null;
	    };

	    UI.prototype.init = function () {
	        var self = this;
	    };

	    /**
	     * ui images src
	     * @type Function
	     */
	    // UI.prototype.imagePath = function (model, path, medth, param) {
	    //     var self = this,
	    //         filterMedth, size;

	    //     filterMedth = medth ? ( ' | ' + medth ) : '';
	    //     size = param ? ( ':' + param ) : '';

	    //     filterMedth && ( path = path + filterMedth + size );

	    //     return templateManager.compile(
	    //         'src="{{' + path + '}}"',
	    //         model,
	    //         false,
	    //         true
	    //     );

	    // }

	    /**
	     * ui shopping service
	     * @type Function
	     */
	    UI.prototype.shoppingService = function (model) {
	        var self = this,
	            tpl = ct.get('uiShoppingService', true);

	        return ct.compile(tpl, {
	            postageTerm: Store.config.postageTerm
	        });
	    };

	    /**
	     * ui category nav
	     * @description 如果 type 为 false 则没有默认的选中项
	     * @type Function
	     */
	    UI.prototype.categoryNav = function (list, type) {
	        var self = this,
	            tpl = ct.get('cmCategoryNav', true),
	            type = type | 0;

	        return ct.compile(tpl, {
	            categoryList: list,
	            curCategory: type
	        });
	    };

	    /**
	     * ui choose invoice
	     * @type Function
	     */
	    UI.prototype.chooseInvoice = function (useDeliveryLabel, isCheckout) {
	        var self = this,
	            tpl = ct.get('cmChooseInvoice', true);

	        return ct.compile(tpl, {
	            isCheckout: isCheckout,
	            useWebInvoice: Store.config.useWebInvoice,
	            deliveryLabel: useDeliveryLabel
	        }, false, true);
	    };

	    /**
	     * ui captcha
	     * @type Function
	     * @param {text} ui template
	     */
	    UI.prototype.captcha = function (type) {
	        var self = this,
	            tpl = ct.get('uiCaptcha', true),
	            time = +new Date();

	        return ct.compile(tpl, {
	            captchaSrc: Store.config.captcha[type] + '&' + time,
	            type: type
	        }, false);
	    };

	    /**
	     * ui checkbox
	     * @type Function
	     * @param {text} ui template
	     */
	    UI.prototype.checkbox = function (name, value, className) {
	        var self = this,
	            className = className || 'blue-checkbox',
	            tpl = ct.get('uiCheckbox', true);

	        return ct.compile(tpl, {
	            name: name,
	            value: value,
	            className: className
	        }, false, true);
	    };

	    /**
	     * ui radio
	     * @type Function
	     * @param {text} ui template
	     */
	    UI.prototype.radio = function (name, value, className) {
	        var self = this,
	            className = className || 'blue-radio',
	            tpl = ct.get('uiRadio', true);

	        return ct.compile(tpl, {
	            name: name,
	            value: value,
	            className: className
	        }, false, true);
	    };

	    /**
	     * ui dynamicTemp
	     * @class 动态模板
	     * @type Function
	     * @param {String} [template] 模板 在 templates 中的 key 值
	     */
	    // UI.prototype.dynamicTemp = function (model, template) {
	    //     var self = this,
	    //         tpl = templateManager.templates[template];

	    //     if ( tpl ) {
	    //         return templateManager.compile(
	    //             tpl,
	    //             model
	    //         );
	    //     } else {
	    //         return ' ';       
	    //     }

	    // }

	    /**
	     * ui orderProcess
	     * @class 订单进度条
	     * @type Function
	     * @param {json} [model] model
	     * @param {json} [data] 根据 model 提取的数据
	     * @param {string} [model.processType] 进度条的名称
	     * @param {number} [model.current] 当前进度
	     */
	    UI.prototype.orderProcess = function (model) {
	        var self = this,
	            tpl = ct.get('uiOrderProcess', true),
	            processService = Store.getService('OrderProcess'),
	            processData = processService.getProcess(model),
	            curIndex = model.processCurrent - 1,
	            stepWidth = 100 / (processData.step - 1),
	            tempData = {
	            width: curIndex * stepWidth + '%',
	            data: []
	        };

	        for (var i = 0, l = processData.process.length; i < l; i++) {
	            var o = $.extend({}, processData.process[i], {
	                isDone: i <= curIndex,
	                isCurrent: curIndex == i,
	                width: stepWidth + '%',
	                position: -stepWidth / 2 + stepWidth * i + '%'
	            });
	            tempData.data.push(o);
	        }

	        return ct.compile(tpl, tempData);
	    };

	    /**
	     * ui mCommonTitle
	     * @class 移动端公共置顶标题栏
	     * @type Function
	     * @param {string} [title] 标题
	     */
	    UI.prototype.mCommonTitle = function (title) {
	        var self = this,
	            tpl = ct.get('mobileCommonTitle', true),
	            tempData = {
	            title: title
	        };

	        return ct.compile(tpl, tempData);
	    };

	    return UI;
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description UI
	 *@author：xu chen 
	 *@date：2014-6-26
	 *@update：2014-6-26
	*/
	'use strict';

	window.Store.addPlugin('UI', function ($, Store) {

	    function UI() {
	        var self = this;

	        self.ScrollbarPlugin = null;
	    }

	    UI.prototype.init = function () {
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
	    UI.prototype.chooseInvoice = function (options) {
	        var self = this,
	            $styleWrapper = options.styleWrapper,
	            $typeWrapper = options.typeWrapper,
	            styleDefault = options.styleDefault ? options.styleDefault : Store.config.useWebInvoice ? 2 : 0,
	            typeDefault = options.typeDefault || 0,
	            module = {};

	        // 选择发票抬头
	        var chooseType = self.radio({
	            wrapper: $typeWrapper,
	            name: 'invoice_type',
	            checked: typeDefault,
	            callback: function callback($radio, opt) {
	                var $textWrapper = opt.wrapper.find('.module-form-row'),
	                    $text = $textWrapper.find('input');

	                $radio.closest('.js-invoice-item').toggleClass('invoice-item-selected', true).siblings().toggleClass('invoice-item-selected', false);

	                // 选择单位抬头
	                if ($radio.data('id') == 1) {
	                    $text.toggleClass('js-verify', true);

	                    $textWrapper.show();
	                    if (Store.config.opacity) {
	                        $textWrapper.css({
	                            opacity: 0
	                        }).animate({
	                            opacity: 1
	                        }, 200, function () {
	                            $text.focus();
	                        });
	                    } else {
	                        $text.focus();
	                    }
	                }
	                // 选择个人抬头
	                else {
	                        $text.toggleClass('js-verify', false);

	                        if (Store.config.opacity) {
	                            $textWrapper.animate({
	                                opacity: 0
	                            }, 200, function () {
	                                $textWrapper.hide();
	                            });
	                        } else {
	                            $textWrapper.hide();
	                        }
	                    }
	            }
	        });

	        // 选择发票类型
	        var chooseStyle = self.radio({
	            wrapper: $styleWrapper,
	            name: 'invoice_style',
	            checked: styleDefault,
	            callback: function callback($radio, opt) {
	                var invoiceType = $radio.val(),
	                    $company = $typeWrapper.find('.js-invoice-item:last');

	                if (invoiceType == 0) {
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
	    };

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
	    UI.prototype.chooseTags = function (options) {
	        var self = this,
	            $wrapper = options.$wrapper,
	            $tagList = options.$tagList || $wrapper.find('.tag-list'),
	            $conList = options.$conList || $wrapper.find('.con-list'),
	            tagSelectClass = options.tagSelectClass || 'select-tag',
	            conSelectClass = options.conSelectClass || 'select-con';

	        if (!$wrapper.data('init-choose-tags')) {
	            $wrapper.data('init-choose-tags', true);

	            $tagList.on('click', '.tag-item', function () {
	                var $tag = $(this);

	                if (!$tag.hasClass(tagSelectClass)) {
	                    $tag.siblings().toggleClass(tagSelectClass, false);
	                    $tag.toggleClass(tagSelectClass, true);

	                    var index = $tag.index(),
	                        $con = $conList.find('.con-item').eq(index);

	                    $conList.find('.con-item').toggleClass(conSelectClass, false);
	                    $con.toggleClass(conSelectClass, true);

	                    Store.isFunction(options.tagFn) && options.tagFn($tag, $con);
	                }
	            });

	            $tagList.find('.tag-item:first').click();
	        }
	    };

	    /**
	     * captcha UI
	     * @type Function
	     * @param {jQuery dom} options.wrapper      弹出框jQuery dom
	     * @param {jQuery selector} options.box     [可选] 验证码的盒子
	     */
	    UI.prototype.captcha = function (options) {
	        var self = this,
	            $wrapper = options.wrapper,
	            boxClass = options.box || '.verifycon';

	        if (!$wrapper.data('init-captcha')) {
	            $wrapper.data('init-captcha', true);

	            // $wrapper.on('click', '[data-ui-captcha]', function () {
	            //     var $captcha = $(this),
	            //         time = +(new Date()),
	            //         url = Store.config.captcha[ $captcha.data('type') ];

	            //     $captcha.attr('src', url + time);
	            // });

	            $wrapper.on('click', boxClass, function () {
	                var $captcha = $(this).find('[data-ui-captcha]'),
	                    time = +new Date(),
	                    url = Store.config.captcha[$captcha.data('type')];

	                url = url.replace(/\&*$/gi, '');

	                $captcha.attr('src', url + '&' + time);
	            });
	        }
	    };

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
	    UI.prototype.radio = function (options) {
	        var self = this,
	            $wrapper = options.wrapper,
	            name = options.name,
	            normalClass = options.normalClass || 'blue-radio',
	            checkedClass = options.checkedClass || 'blue-radio-on';

	        if (!$wrapper.data('init-' + name)) {
	            $wrapper.data('init-' + name, true);

	            $wrapper.on('change', '[name=' + name + ']', function () {
	                var $radio = $(this);

	                if ($radio.next('.' + normalClass + '[data-radio-name=' + name + ']').hasClass(checkedClass)) {
	                    return false;
	                }

	                $wrapper.find('.' + checkedClass + '[data-radio-name=' + name + ']').removeClass(checkedClass);

	                $radio.next('.' + normalClass + '[data-radio-name=' + name + ']').toggleClass(checkedClass, true);

	                typeof options.callback == 'function' && options.callback($radio, options);
	            }).on('click', '.' + normalClass + '[data-radio-name=' + name + ']', function () {
	                var $radio = $(this).prev(':radio');

	                if ($radio.prop('checked')) {
	                    return false;
	                }

	                $wrapper.find('[name=' + name + ']:checked').prop('checked', false);

	                $radio.prop('checked', true).change();
	            });

	            if (options.checked !== undefined) {
	                $wrapper.find(':radio[name=' + name + '][data-id=' + options.checked + ']').prop('checked', true).change();
	            }
	            // 默认选中第一个
	            else {
	                    !options.notDefault && $wrapper.find(':radio[name=' + name + ']:first').prop('checked', true).change();
	                }
	        }

	        // 返回调用方法
	        return {
	            // 选中
	            on: function on(id) {

	                var $radio = $wrapper.find('[name=' + options.name + '][data-id=' + id + ']');

	                if ($radio.prop('checked')) {
	                    return false;
	                }

	                $radio.prop('checked', true).change();
	                typeof options.callback == 'function' && options.callback($radio, options);
	            },
	            // 返回选中的 id
	            choosed: function choosed() {
	                return {
	                    id: $wrapper.find('[name=' + options.name + ']:checked').data('id') + ''
	                };
	            }
	        };
	    };

	    /**
	     * checkbox UI
	     * @type Function
	     * @param {jQuery dom} options.wrapper 弹出框jQuery dom
	     * @param {string} options.name, input 的 name
	     * @param {string} options.normalClass, 模拟样式
	     * @param {string} options.checkedClass, 选中的模拟样式
	     * @param {function} options.callback 回调函数
	     */
	    UI.prototype.checkbox = function (options) {
	        var self = this,
	            $wrapper = options.wrapper,
	            name = options.name,
	            normalClass = options.normalClass || 'blue-checkbox',
	            checkedClass = options.checkedClass || 'blue-checkbox-on',
	            disableClass = options.disableClass || 'blue-checkbox-disable';

	        if (!$wrapper.data('init-' + name)) {
	            $wrapper.data('init-' + name, true);

	            $wrapper.on('change', '[name=' + name + ']', function () {
	                var $checkbox = $(this);

	                $checkbox.next('.' + normalClass).toggleClass(checkedClass, $checkbox.prop('checked'));
	                typeof options.callback == 'function' && options.callback($checkbox);
	            }).on('click', '.' + normalClass + '[data-checkbox-name=' + name + ']', function () {

	                var $checkbox = $(this).prev(':checkbox');
	                $checkbox.prop('checked', !$checkbox.prop('checked')).change();
	            });

	            if (options.checked !== undefined) {
	                var arr = options.checked.constructor === Array ? options.checked : options.checked.split(',');

	                $.each(arr, function (index, item) {
	                    $wrapper.find(':checkbox[name=' + name + '][data-id=' + item + ']').prop('checked', true).change();
	                });
	            }
	        }

	        // 返回调用方法
	        return {
	            disabled: function disabled(items) {
	                var items = items === undefined ? undefined : items.constructor === Array ? items : [items];

	                // 某一个或者多个 checkbox 禁用
	                if (items) {
	                    $.each(items, function (index, item) {
	                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']');

	                        $checkbox.next('.' + normalClass).toggleClass(normalClass, false).toggleClass(disableClass, true);
	                    });
	                }
	                // 全部禁用
	                else {
	                        $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass(normalClass, false).toggleClass(disableClass, true);
	                    }
	            },
	            // 选中
	            on: function on(items, callback) {
	                var callback = callback || (typeof items == 'function' ? items : undefined);
	                var items = items && typeof items != 'function' ? items.constructor === Array ? items : [items] : undefined;

	                // 某一个或者多个 checkbox 选中
	                if (items) {
	                    $.each(items, function (index, item) {
	                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']');

	                        if (callback) {
	                            $checkbox.prop('checked', true);
	                            $checkbox.next('.' + normalClass).toggleClass(checkedClass, true);
	                        } else {
	                            $checkbox.prop('checked', true).change();
	                        }
	                    });

	                    callback && callback();
	                }
	                // 全选
	                else {
	                        // 执行私有回调
	                        if (callback) {
	                            $wrapper.find('[name=' + options.name + ']').prop('checked', true);
	                            $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass(checkedClass, true);
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
	            off: function off(items, callback) {
	                var callback = callback || (typeof items == 'function' ? items : undefined);
	                var items = items && typeof items != 'function' ? items.constructor === Array ? items : [items] : undefined;

	                // 某一个或者多个 checkbox 取消选中
	                if (items) {
	                    $.each(items, function (index, item) {
	                        var $checkbox = $wrapper.find('[name=' + options.name + '][data-id=' + item + ']:checked');

	                        if (callback) {
	                            $checkbox.prop('checked', false);
	                            $checkbox.next('.' + normalClass).toggleClass(checkedClass, false);
	                        } else {
	                            $checkbox.prop('checked', false).change();
	                        }
	                    });

	                    callback && callback();
	                }
	                // 全部取消选中
	                else {
	                        // 执行私有回调
	                        if (callback) {
	                            $wrapper.find('[name=' + options.name + ']').prop('checked', false);
	                            $wrapper.find('.' + normalClass + '[data-checkbox-name=' + name + ']').toggleClass(checkedClass, false);
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
	            choosed: function choosed() {
	                var arr = [];

	                $wrapper.find('[name=' + options.name + ']:checked').each(function () {
	                    arr.push({
	                        id: $(this).data('id') + ''
	                    });
	                });

	                return arr;
	            }
	        };
	    };

	    /**
	     * select UI
	     * @type Function
	     * @param {jQuery dom} wrapper 包裹wrpaaer
	     * @param {object} data 数据集合
	     * @param {object} callback 回调函数集合
	     */
	    UI.prototype.select = function (options) {
	        var self = this,
	            option = $.extend({
	            wrapper: $('.wrapper'),
	            data: {},
	            callback: {}
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
	            if (!$select.data('init')) {
	                $select.data('init', true);

	                var $template = $(arrTemplate.join(''));

	                $select.after($template);

	                var $uiSelect = $select.next();

	                $select.hide();

	                $select.data('class') && $uiSelect.addClass($select.data('class'));

	                var fn = option.callback[$select.data('medth')];

	                if (typeof fn == 'function') {
	                    $uiSelect.data('callback', fn);
	                }

	                var data = option.data[$select.data('data')];

	                if (!data) {
	                    throw new Error('ui select data "' + $select.data('data') + '" is not found !!!');
	                    return false;
	                }

	                self.changeSelectData(data, $uiSelect, $select);

	                self.ScrollbarPlugin.bind($uiSelect, 25);
	            }
	        });

	        // init fn
	        if (!$wrapper.data('init')) {
	            $wrapper.data('init', true);

	            $wrapper.on('change', 'select', function () {
	                var $select = $(this),
	                    $uiSelect = $select.next();

	                // console.log($select.children('option:selected').text());

	                if (typeof $uiSelect.data('fn') == 'function') {
	                    $uiSelect.data('fn')($select, $uiSelect);
	                }
	            });

	            $wrapper.on('click', '.ui-select', function (event) {
	                var $menu = $(this).find('.ui-select-menu');
	                if (!$(event.target).hasClass('ui-select-menu')) {
	                    $menu.fadeIn(100, function () {
	                        $(document).on('click', function (e) {
	                            if (!$(e.target).hasClass('scrollbar-block')) {
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

	                $uiSelect.find('label').text($uiOption.data('label'));
	                $uiSelect.data('value', $uiOption.data('value'));

	                $select.children('option[value="' + $uiOption.data('value') + '"]').select();
	            });
	        }
	    };

	    /**
	     * changeSelectData
	     * @type Function
	     */
	    UI.prototype.changeSelectData = function (data, $uiSelect, $select) {
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
	    };

	    /**
	     * loading button UI
	     * @type Function
	     * @param {button dom} btn 应用的btn
	     */
	    UI.prototype.loadingBtn = function (btn) {

	        var $status = btn.children().length ? btn.children() : btn;

	        btn.on('click', function (event) {
	            if (btn.hasClass('js-status-loading')) {
	                event.stopPropagation();
	                return false;
	            }
	        });

	        var medth = {
	            loading: function loading() {
	                btn.toggleClass('js-status-loading', true);
	            },
	            reset: function reset() {
	                btn.toggleClass('js-status-loading', false);
	            }
	        };

	        return medth;
	    };

	    return new UI();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/*
	 *@description FileUpload
	 *@author：xu chen 
	 *@date：2014-9-19
	 *@update：2014-9-19
	*/
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	window.Store.addView('FileUpload', function () {

	    /**
	     * uploader
	     * @type Function
	     * @params {JSON} filters
	     * @params {String} filter.name
	     * @params {Function} filter.fn
	     * @params {String} filter.message
	     */
	    function FileUpload() {
	        var self = this;

	        // base config
	        self.base = {
	            $file: $('input:file'),
	            url: '/',
	            alias: 'file',
	            headers: {},
	            queue: [],
	            progress: 0,
	            autoUpload: false,
	            removeAfterUpload: false,
	            method: 'POST',
	            filters: {},
	            formData: [],
	            queueLimit: Number.MAX_VALUE,
	            withCredentials: false
	        };

	        self.queue = [];

	        self._failFilter = '';

	        self.jqxhr = null;
	    }

	    FileUpload.prototype.init = function (options) {
	        var self = this;

	        self.options = $.extend({}, self.base, options);

	        if (options.$file.length) {

	            // bind upload medth
	            options.$file.on('change', function (event) {

	                var files = self.isHTML5 ? event.target.files : event.target;

	                self.queue = [];

	                self.addQueue(files);
	            });
	        } else {
	            throw new Error('file input is not exist!!!');
	        }
	    };

	    FileUpload.prototype.isHTML5 = !!(window.File && window.FormData);
	    // FileUpload.prototype.isHTML5 = false;

	    // 添加到上传队列
	    FileUpload.prototype.addQueue = function (file) {
	        var self = this,
	            files = (typeof file === 'undefined' ? 'undefined' : _typeof(file)) == 'object' && file.length != undefined ? file : [file],
	            count = self.queue.length,
	            addFileItem = [];

	        for (var i = 0, l = files.length; i < l; i++) {

	            var item = new self._FileItem(self, files[i]);

	            if (self.isValidFile(item)) {

	                addFileItem.push(item);
	                self.queue.push(item);

	                self._onAfterAddingFile(item);
	            } else {
	                self._onAddingFailed(item, self.options.filters[self._failFilter], self);
	                break;
	            }
	        }
	    };

	    // 验证上传文件是否符合要求
	    FileUpload.prototype.isValidFile = function (file) {
	        var self = this,
	            filters = self.options.filters,
	            flag = true;

	        for (var key in filters) {
	            if (typeof filters[key].fn != 'function') {
	                self._failFilter = key;
	                break;
	            }
	            if (!filters[key].fn(file.file, self)) {
	                self._failFilter = key;
	                flag = false;
	                break;
	            }
	        }
	        return flag;
	    };

	    // 添加文件时，没有通过验证
	    FileUpload.prototype._onAddingFailed = function (fileItem, errorFilter, options) {
	        this.onAddingFailed(fileItem, errorFilter, options);
	    };

	    // 添加文件时，通过验证
	    FileUpload.prototype._onAfterAddingFile = function (fileItem) {
	        this.onAfterAddingFile(fileItem);
	    };

	    // 上传文件之前
	    FileUpload.prototype._onBeforeUploadItem = function (fileItem) {
	        fileItem._onBeforeUpload();
	        this.onBeforeUploadItem(fileItem);
	    };

	    // 上传文件中
	    // FileUpload.prototype._onProgressItem = function(fileItem, progress){};

	    // 上传单个文件完成时
	    FileUpload.prototype._onCompleteItem = function () {
	        this.onCompleteItem();
	    };

	    // 上传所有文件完成时
	    FileUpload.prototype._onCompleteAll = function () {
	        this.onCompleteAll();
	    };

	    // 外部引用 添加文件时，没有通过验证
	    FileUpload.prototype.onAddingFailed = function (file, errorFilter, options) {};
	    // 外部引用 添加文件时，通过验证
	    FileUpload.prototype.onAfterAddingFile = function (fileItem) {};

	    // 上传文件之前
	    FileUpload.prototype.onBeforeUploadItem = function () {};
	    // 上传文件中
	    FileUpload.prototype.onProgressItem = function (fileItem, progress) {};

	    FileUpload.prototype.onCancelItem = function () {};
	    FileUpload.prototype.onSuccessItem = function (response) {};
	    FileUpload.prototype.onErrorItem = function () {};
	    FileUpload.prototype.onCompleteItem = function () {};
	    FileUpload.prototype.onCompleteAll = function () {};

	    FileUpload.prototype.uploadItem = function (fileItem) {
	        var self = this;

	        if (fileItem.isUploading) {
	            return;
	        }

	        self._onBeforeUploadItem(fileItem);

	        if (self.isHTML5) {
	            self._ajaxUpload(fileItem);
	        } else {
	            self._iframeUpload(fileItem);
	        }
	    };

	    FileUpload.prototype._ajaxUpload = function (fileItem) {
	        var self = this;

	        var form = new FormData();

	        $.each(fileItem.formData, function (index, item) {
	            $.each(item, function (key, value) {
	                form.append(key, value);
	            });
	        });

	        fileItem.file.name = encodeURIComponent(fileItem.file.name);

	        form.append(fileItem.alias, fileItem._file, fileItem.file.name);
	        // console.log(fileItem);

	        self.jqxhr = $.ajax({
	            url: self.options.url,
	            data: form,
	            cache: false,
	            // contentType: 'application/x-www-form-urlencoded; charset=utf-8',
	            contentType: false,
	            processData: false,
	            type: 'POST',
	            xhr: function xhr() {
	                var req = $.ajaxSettings.xhr();
	                if (req) {
	                    req.upload.addEventListener('progress', function (ev) {
	                        //Display progress Percentage
	                        var progress = Math.round(ev.loaded * 100 / ev.total);

	                        self.onProgressItem(fileItem, progress);
	                    }, false);
	                }
	                return req;
	            }
	        }).success(function (data) {

	            if (typeof data == 'string') {
	                data = JSON.parse(data);
	            }

	            self.onSuccessItem(fileItem, data);
	        }).error(function (jqXHR, textStatus, errorThrown) {
	            self.onErrorItem();
	        }).complete(function (jqXHR, textStatus) {
	            self._onCompleteItem(fileItem, jqXHR);
	        });
	    };

	    // old brower to upload
	    FileUpload.prototype._iframeUpload = function (fileItem) {
	        var self = this;

	        var $form = $('<form />');
	        var $iframe = $('<iframe class="fn-hide" name="iframeFileUpload' + +new Date() + '">');

	        $.each(fileItem.formData, function (index, item) {
	            $.each(item, function (key, value) {
	                $form.append($('<input type="hidden" name="' + key + '" value="' + value + '" />'));
	            });
	        });

	        $form.prop({
	            action: fileItem.url,
	            method: 'POST',
	            target: $iframe.prop('name'),
	            enctype: 'multipart/form-data',
	            encoding: 'multipart/form-data' // old IE
	        });

	        $iframe.on('load', function () {
	            var html = '{"code : 1"}',
	                reg = /(\{.*\})/;
	            try {
	                // Fix for legacy IE browsers that loads internal error page
	                // when failed WS response received. In consequence iframe
	                // content access denied error is thrown becouse trying to
	                // access cross domain page. When such thing occurs notifying
	                // with empty response object. See more info at:
	                // http://stackoverflow.com/questions/151362/access-is-denied-error-on-accessing-iframe-document-object
	                // Note that if non standard 4xx or 5xx error code returned
	                // from WS then response content can be accessed without error
	                // but 'XHR' status becomes 200. In order to avoid confusion
	                // returning response via same 'success' event handler.

	                // fixed angular.contents() for iframes
	                html = $iframe[0].contentDocument.body.innerHTML;
	                // html 有可能会包含在一些标签内，所有需要通过正则吧回执捕获出来
	            } catch (e) {}

	            var match = html.match(reg);

	            if (!html || !match) {
	                return;
	            }

	            html = match[0];

	            // console.log('****************');
	            // console.log(match);
	            // console.log( html );
	            // console.log( JSON.parse(html) );
	            // console.log('****************');

	            var xhr = { response: JSON.parse(html), status: 200, dummy: true };
	            var response = xhr.response;
	            var headers = {};

	            self.onSuccessItem(fileItem, response, xhr.status, headers);
	            self._onCompleteItem(fileItem, response, xhr.status, headers);
	        });

	        fileItem.$file.after($form);
	        $form.append(fileItem.$file).append($iframe);

	        $form[0].submit();

	        // console.log(fileItem);
	        // console.log($iframe);
	    };

	    FileUpload.prototype._FileItem = function (uploader, file) {
	        var self = this;

	        !uploader.isHTML5 && (file = $(file).val());

	        $.extend(self, uploader.base, uploader.options, {
	            uploader: uploader,
	            file: new uploader._FileInfo(file, uploader),
	            isReady: false,
	            isUploading: false,
	            isUploaded: false,
	            isSuccess: false,
	            isCancel: false,
	            isError: false,
	            progress: 0,
	            index: null,
	            _file: file
	        });
	    };

	    FileUpload.prototype._FileItem.prototype = {
	        // 上传之前
	        _onBeforeUpload: function _onBeforeUpload() {
	            this.isReady = true;
	            this.isUploading = true;
	            this.isUploaded = false;
	            this.isSuccess = false;
	            this.isCancel = false;
	            this.isError = false;
	            this.progress = 0;
	        },
	        // 上传文件
	        upload: function upload() {
	            this.uploader.uploadItem(this);
	        }
	    };

	    // 整理数据
	    FileUpload.prototype._FileInfo = function (file, uploader) {
	        var self = this;

	        if (uploader.isHTML5) {
	            self.lastModifiedDate = file.lastModifiedDate;
	            self.size = file.size;
	            self.type = file.type;
	            self.name = file.name;
	        } else {
	            // console.log($(file).val());
	            self.lastModifiedDate = null;
	            // var filePath = $(file).val();
	            self.size = null;
	            self.type = 'like/' + file.slice(file.lastIndexOf('.') + 1).toLowerCase();
	            self.name = file.slice(file.lastIndexOf('/') + file.lastIndexOf('\\') + 2);
	        }
	    };

	    return FileUpload;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description Verify
	 *@author：xu chen
	 *@date：2014-4-2
	 *@update：2014-4-2
	*/
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	window.Store.addPlugin('Verify', function ($, Store) {

	    function Verify() {
	        var self = this;
	        self.domConfig = {};
	        self.verifyConfig = {};

	        self.verifyError = null;
	        self.verifyDone = null;
	        self.ajaxQueue = { length: 0 };

	        self.formData = {};
	    }

	    Verify.prototype.init = function () {
	        var self = this;

	        // dom config
	        self.domConfig = {
	            /**
	             * input包裹样式名称
	             * @type class name
	             */
	            inputWrapperCssName: 'form-item',
	            /**
	             * 错误input包裹样式名称 ==> 普通输入框
	             * @type class name
	             */
	            inputWrapperErrorCssName: 'error-item',
	            /**
	             * input包裹的jQuery dom
	             * @type jQuery Dom
	             */
	            inputWrapperDom: '.form-item',
	            /**
	             * input的jQuery dom
	             * @type jQuery Dom
	             */
	            inputDom: '.form-item input',
	            /**
	             * palceholder的jQuery dom
	             * @type jQuery Dom
	             */
	            labelDom: 'i',
	            /**
	             * 提示标志的jQuery dom
	             * @type jQuery Dom
	             */
	            tipsDom: '.verify-tips',
	            /**
	             * 成功标志的jQuery dom
	             * @type jQuery Dom
	             */
	            successDom: '.verify-success',
	            /**
	             * 错误标志的jQuery dom
	             * @type jQuery Dom
	             */
	            errorDom: '.verify-error'
	        };

	        // verify config
	        self.verifyConfig = {
	            notNull: {
	                reg: /[^\s|.]/,
	                withName: true,
	                msg: '必填'
	            },
	            required: {
	                reg: /[^\s|.]/,
	                withName: true,
	                msg: '必填'
	            },
	            linkRequired: {
	                withName: true,
	                msg: '必填'
	            },
	            number: {
	                reg: /^\d+$/,
	                msg: '只能是数字'
	            },
	            numOrEn: {
	                reg: /^[0-9a-zA-Z]+$/,
	                msg: '只能是英文或者数字'
	            },
	            errorStr: {
	                reg: /^[^\&\<\>]*$/,
	                msg: '包含非法字符'
	            },
	            maxlength: {
	                msg: '过长'
	            },
	            email: {
	                reg: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱格式错误'
	            },
	            nullOrEmail: {
	                reg: /^.{0}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱格式错误'
	            },
	            mobile: {
	                reg: /^1[3|4|5|7|8]\d{9}$/,
	                msg: '手机号格式错误'
	            },
	            username: {
	                reg: /^1[3|4|5|7|8]\d{9}$|^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
	                msg: '邮箱/手机号格式错误'
	            },
	            password: {
	                reg: /^[\w\\\[\]\:\^\-~!@#$%&*()-+={}|;'",.\/<>?]{6,16}$/,
	                msg: '密码格式错误'
	            },
	            nullOrMobile: {
	                reg: /^.{0}$|^1[3|4|5|7|8]\d{9}$/,
	                msg: '手机号码格式错误'
	            },
	            zip: {
	                reg: /^\d{6}$/,
	                msg: '邮编格式错误'
	            },
	            api: {
	                reg: /^[\da-zA-Z\/\-.?=!]+$/,
	                msg: 'API 格式错误'
	            },
	            nullOrTelephoneArea: {
	                reg: /^.{0}$|^0\d{2,3}$/,
	                msg: '格式错误'
	            },
	            nullOrTelephone: {
	                reg: /^.{0}$|^\d{6,8}$/,
	                msg: '格式错误'
	            },
	            notExist: {
	                withName: true,
	                msg: '不存在'
	            },
	            strRange: {
	                msg: "字符串非法或过长" //strRange,{1-2}
	            },
	            json: {
	                msg: "非法 JSON 格式"
	            },
	            ajax: {
	                msg: "已存在"
	            },
	            price: {
	                reg: /^\d+(\.\d{1,2})?$/,
	                msg: '格式错误'
	            },
	            max: {
	                msg: '超过最大值'
	            },
	            imei: {
	                reg: /^\d{15}$/,
	                msg: '格式错误'
	            }
	        };
	    };

	    /**
	     * 绑定input状态切换
	     * @type Function
	     */
	    Verify.prototype.bindForm = function (options) {
	        var self = this;

	        var $wrapper = options.wrapper,
	            domConfig = self.domConfig;

	        // bind input text methods 'mouseenter' and 'focus'
	        var doAnimateByFocus = function doAnimateByFocus(event) {
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
	        doAnimateByBlur = function doAnimateByBlur(event) {
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
	        bindOnceTips = function bindOnceTips(e) {
	            var target = e.target;
	            if ($(target).closest('.js-verify-item-row').length == 1) {
	                return;
	            }
	            $wrapper.find(domConfig.tipsDom).fadeOut(200);

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
	            $(this).siblings(domConfig.labelDom).hide();
	        })
	        // 绑定input的按键抬起的事件
	        .on('keyup', domConfig.inputDom, function (event) {
	            var elText = $(this),
	                val = elText.val();

	            if (event.which != 13) {}

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
	    };

	    /**
	     * 移动端使用 placeholder 方式
	     * @type Function
	     */
	    Verify.prototype.usePlaceholder = function ($wrapper) {

	        var self = this,
	            domConfig = self.domConfig;

	        if (Store.config.isMobile) {
	            $wrapper.find(domConfig.inputDom).each(function () {
	                $(this).attr('placeholder', $(this).siblings(domConfig.labelDom).text());
	            });
	        }
	    };

	    /**
	     * 绑定验证控件
	     * @type Function
	     */
	    Verify.prototype.bindVerify = function (options) {
	        var self = this;

	        var option = $.extend({
	            wrapper: $('.wrapper'),
	            verifyDom: '.js-verify',
	            button: $('.button'),
	            beforeVerify: null, // [null || function]
	            success: null, // [null || function]
	            error: null // [null || function]
	        }, options);

	        var $wrapper = option.wrapper,
	            domConfig = self.domConfig;

	        self.bindForm({
	            wrapper: $wrapper
	        });

	        $wrapper.on('blur verify', option.verifyDom, function () {
	            var $dom = $(this),
	                tagName = $dom.get(0).nodeName,
	                dataVer = $dom.data("verify"),
	                val = "";
	            val = $dom.val();

	            if (tagName == 'SELECT') {
	                val = val == '0' ? '' : val;
	            }

	            self.parseVer(dataVer, val, $dom);
	        });

	        $wrapper.on('change', 'select', function () {
	            if ($(this).val() != '0') {
	                $(this).trigger('clearError');
	            }
	        });

	        $wrapper.on('clearError', option.verifyDom, function () {
	            var $text = $(this),
	                $textWrapper = $text.closest(domConfig.inputWrapperDom);

	            $textWrapper.toggleClass(domConfig.inputWrapperErrorCssName, false);

	            if ($text.val() != '') {
	                $text.siblings(domConfig.labelDom).toggle(false);
	            }
	        });

	        $wrapper.on('reset', option.verifyDom, function () {
	            var $dom = $(this),
	                baseVal = $dom.data('val') ? $dom.data('val') : '';

	            $dom.attr('data-verifyed', false);
	            $dom.val(baseVal);

	            $dom.siblings(domConfig.labelDom).show();

	            $dom.closest(domConfig.inputWrapperDom).removeClass(domConfig.inputWrapperErrorCssName);
	        });

	        $wrapper.on('normal', option.verifyDom, function () {
	            var $dom = $(this);

	            $dom.attr('data-verifyed', false);

	            $dom.siblings(domConfig.labelDom).hide();

	            $dom.closest(domConfig.inputWrapperDom).removeClass(domConfig.inputWrapperErrorCssName);
	        });

	        if (!option.button) {
	            throw new Error('verify button is not exist');
	        }

	        option.button.on('click', function () {
	            var canVerify = true;
	            if (typeof option.beforeVerify == 'function') {
	                canVerify = option.beforeVerify(option);
	            }

	            if (canVerify == false) {
	                return false;
	            }

	            var verifyResult = self.verifyFinsh(option);

	            // 通过验证
	            if (!!verifyResult) {
	                self.formData = Store.getData($wrapper);
	                _typeof(option.success) && option.success(self, self.formData);
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
	    };

	    /**
	     * 使用验证
	     * @param {Query Dom} dom 被操作dom
	     * @param {String} [可选] class 验证钩子
	     * @param {Array}  [可选]terms 验证项
	     */
	    Verify.prototype.useVerify = function (option) {
	        var self = this,
	            className = option.className || 'js-verify';

	        option.dom.toggleClass(className, true);

	        if (option.terms && option.terms.constructor === Array) {
	            option.dom.attr('data-verify', option.terms.join('/'));
	        }
	    };

	    /**
	     * 移出验证
	     * @param {Query Dom} dom 被操作dom
	     * @param {String} [可选] class 验证钩子
	     * @param {Boolean}  [可选]terms 是否移除验证项
	     */
	    Verify.prototype.removeVerify = function (option) {
	        var self = this,
	            className = option.className || 'js-verify';

	        option.dom.toggleClass(className, false);

	        if (option.terms) {
	            option.dom.removeAttr('data-verify');
	        }
	    };

	    /**
	     * 拆分验证条件
	     * @param {String} data 全部验证信息 格式为xxx:xxx/xxx 注:/为条件分隔符
	     * @param {String} val 被验证数据
	     * @param {jQuery Object} dom 被验证jQuery Object
	     */
	    Verify.prototype.parseVer = function (data, val, dom) {
	        var self = this,
	            verData = data && data.match(/(^.*)\:(.+)/),
	            name,
	            vers,
	            result,
	            flag = false;
	        if (!!verData) {
	            name = verData[1];
	            vers = verData[2].split("/");
	            if ($.trim(val) == "") {
	                if ($.inArray("notNull", vers) != -1) {
	                    var msg = dom.attr('data-verify-msg-notnull') || "必填";
	                    self.thrown(dom, msg);
	                } else {
	                    self.verified(dom);
	                }
	            } else {
	                for (var i = 0; i < vers.length; i++) {
	                    result = self.match(val, name, vers[i], dom);
	                    if (result != "ajax" && !result) {
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
	    Verify.prototype.match = function (val, name, ver, dom) {
	        var self = this,
	            _ver = ver.match(/^([^\,]+)\,\{?([^\}]+)\}?$/),
	            // 匹配"ver,({)xxx(})" ==> [1]:ver, [2]:xxx
	        term = !!_ver ? _ver[1] : ver,
	            mapTerm = self.verifyConfig[term],
	            msg = "",
	            doTest;
	        // 验证条件存在时
	        if (!!mapTerm) {
	            msg = dom.attr('data-verify-msg-' + term.toLowerCase()) || name + mapTerm.msg;
	            // 正则验证时
	            if (!!mapTerm.reg) {
	                if (mapTerm.reg.test(val)) {
	                    self.verified(dom);
	                    return true;
	                } else {
	                    self.thrown(dom, msg);
	                    return false;
	                }
	            }
	            // 函数验证时
	            else if (!!self[term]) {
	                    if (!!_ver) {
	                        doTest = self[term](val, msg, dom, _ver[2]);
	                    } else {
	                        doTest = self[term](val, msg, dom, term);
	                    }
	                    if (!!doTest.result) {
	                        if (doTest.result == 'ajax') {
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
	                    } else {
	                        self.thrown(dom, doTest.msg);
	                    }
	                    return doTest.result;
	                }
	        } else {
	            alert(term + ': 不是有效的验证条件!!!');
	        }
	    };

	    /**
	     * 验证成功
	     * @param {jQuery Object} dom 被验证jQuery Object
	     */
	    Verify.prototype.verified = function (dom) {
	        var self = this,
	            domConfig = self.domConfig,
	            $wrapper = dom.closest(domConfig.inputWrapperDom);

	        dom.attr('data-verifyed', true);

	        $wrapper.removeClass(domConfig.inputWrapperErrorCssName);
	        dom.siblings(domConfig.errorDom).hide();
	        dom.siblings(domConfig.successDom).show();
	    };

	    /**
	     * 验证失败
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} msg 输出的错误提示
	     * @param {Boll} once 一次性提示
	     */
	    Verify.prototype.thrown = function (dom, msg, once) {
	        var self = this,
	            domConfig = self.domConfig,
	            $wrapper = dom.closest(domConfig.inputWrapperDom);

	        !once && dom.attr('data-verifyed', false);
	        !self.verifyError && (self.verifyError = dom);
	        dom.siblings(domConfig.errorDom).text(msg).show();

	        dom.siblings(domConfig.successDom).hide();

	        setTimeout(function () {
	            $wrapper.addClass(domConfig.inputWrapperErrorCssName);
	        }, 1);
	    };

	    /**
	     * 充值验证输入框
	     * @param {jQuery Object} dom 被验证jQuery Object 包裹
	     * @param {jQuery Class}  verClass 验证项的样式名
	     */
	    Verify.prototype.reset = function ($wrapper, verClass) {
	        var self = this,
	            verClass = verClass || 'js-verify';

	        $wrapper.find('.' + verClass).trigger('reset');
	    };

	    /**
	     * 判断是否最终验证成功
	     * @param {jQuery Object} dom 被验证jQuery Object
	     */
	    Verify.prototype.verifyFinsh = function (option) {
	        var self = this,
	            $verDom = option.wrapper.find(option.verifyDom + '[data-verifyed!="true"]:visible');

	        if ($verDom.length) {
	            self.verifyError = null;
	            self.verifyDone = false;
	            $verDom.each(function () {
	                $(this).trigger('verify');
	            });

	            // 再次执行验证，从新获取错误的dom
	            $verDom = option.wrapper.find(option.verifyDom + '[data-verifyed!="true"]:visible');

	            if ($verDom.length) {
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
	    Verify.prototype.strRange = function (val, msg, dom, range) {
	        var self = this,
	            strMin = range.split("-")[0],
	            strMax = range.split("-")[1],
	            _reg = new RegExp('^[\\S\\.\\s]{' + strMin + ',' + strMax + '}$'),
	            _msg = (strMin == 0 ? 1 : strMin) + '~' + strMax + '个字符';
	        if (_reg.test(val)) {
	            return { result: true, msg: _msg };
	        } else {
	            return { result: false, msg: _msg };
	        }
	    };

	    /**
	     * 验证条件：被验证数据为普通字符串且小等于{max} 例:max,{200}
	     * @param {String} val 被验证数据
	     * @param {String} msg 错误信息
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} range 范围值
	     * @return {Object} { result : true|false, msg : msg };
	     */
	    Verify.prototype.max = function (val, msg, dom, range) {
	        var self = this,
	            val = val | 0,
	            range = range | 0;

	        if (val <= range) {
	            return { result: true, msg: msg };
	        } else {
	            return { result: false, msg: msg };
	        }
	    };

	    /**
	     * 验证条件：被验证数据为 JSON 格式 例:json
	     * @param {String} val 被验证数据
	     * @param {String} msg 错误信息
	     * @param {jQuery Object} dom 被验证jQuery Object
	     * @param {String} range 范围值
	     * @return {Object} { result : true|false, msg : msg };
	     */
	    Verify.prototype.json = function (val, msg, dom, range) {
	        var self = this,
	            flag = true;

	        try {
	            JSON.parse(val);
	        } catch (e) {
	            flag = false;
	        }

	        return { result: flag, msg: msg };
	    };

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
	    Verify.prototype.ajax = function (val, msg, dom, range) {
	        var self = this,
	            ajaxID = new Date().getTime(),
	            ajaxData = {},
	            ajaxUrl = Store.config.verifyUrlMap[dom.data('ajaxType')] || '',
	            ajaxKey = dom.data('ajaxKey').split(','),
	            ajaxVal = ['base'].concat(dom.data('ajaxVal').split(','));

	        msg = dom.data('verify-msg-ajax') || msg;

	        ajaxData[ajaxKey[0]] = val;

	        for (var i = 1, l = ajaxKey.length; i < l; i++) {
	            ajaxData[ajaxKey[i]] = $('.' + ajaxVal[i]).val();
	        };

	        self.ajaxQueue[ajaxID] = mainService.ajax({
	            url: ajaxUrl,
	            data: ajaxData,
	            dataType: 'jsonp',
	            success: function success() {},
	            error: function error() {
	                return false;
	            }
	        });

	        return { result: "ajax", ajax: self.ajaxQueue[ajaxID], ajaxID: ajaxID, msg: msg };
	    };

	    return new Verify();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description Scrollbar
	 *@author：xu chen 
	 *@date：2014-4-2
	 *@update：2014-4-2
	*/
	'use strict';

	window.Store.addPlugin('Scrollbar', function ($, Store) {

	    function Scrollbar() {
	        var self = this;

	        self.def = {
	            frame: null,
	            wrapper: null,
	            container: null,
	            scrollbar: null,
	            block: null,
	            wrapperHeight: null,
	            containerHeight: null,
	            scrollbarRevise: null
	        };
	    }

	    Scrollbar.prototype.init = function () {
	        var self = this;
	    };

	    /**
	     * 全局初始化
	     * @type Function
	     */
	    Scrollbar.prototype.create = function (options) {
	        var self = this;
	        var option = $.extend({}, self.def, options),
	            elFrame = option.frame,
	            elWrapper = option.wrapper,
	            elContainer = option.container,
	            elSidebar = option.scrollbar,
	            elBlock = option.block,
	            wrapperHeight = options.wrapperHeight || elWrapper.height(),
	            containerHeight = options.containerHeight || elContainer.outerHeight(),
	            scrollbarRevise = Math.floor(option.scrollbarRevise) || 0,
	            scrollbarHeight = wrapperHeight - scrollbarRevise,
	            containerTop = 0,
	            maxMove = 0,
	            moveNum = 30,
	            scale = 1,
	            hamster;

	        // init scroll element css
	        if (elWrapper.css('position') == 'static') {
	            elWrapper.css('position', 'relative');
	        }
	        if (elContainer.css('position') == 'static') {
	            elContainer.css('position', 'absolute');
	        }

	        if (!(hamster = elFrame.data('hamster'))) {
	            hamster = Hamster(elFrame[0]);
	            elFrame.data('hamster', hamster);
	        }

	        hamster.wheel(function (event) {
	            event.preventDefault();
	            if (event.deltaY < 0) {
	                scrollbarMethods.move(moveNum);
	            } else {
	                scrollbarMethods.move(-moveNum);
	            }
	        });

	        elBlock.on("mousedown", function (event) {
	            event.preventDefault();
	            var _pos = elBlock.position().top,
	                _downY = event.pageY,
	                _moveSize = 0;
	            $(document).on("mousemove", function (e) {
	                e.preventDefault();
	                _moveSize = Math.floor(_pos + e.pageY) - _downY;
	                _moveSize = _moveSize >= 0 ? _moveSize >= maxMove ? maxMove : _moveSize : 0;
	                elBlock.css("top", _moveSize);
	                containerTop = _moveSize / wrapperHeight * containerHeight;
	                elContainer.css("top", -containerTop);
	            }).on("mouseup", function (e) {
	                e.preventDefault();
	                $(this).off("mousemove");
	            });
	        });

	        var scrollbarMethods = {
	            isRun: false,
	            reset: function reset(wrapperH, containerH) {
	                var thiz = this;
	                if (wrapperH) {
	                    wrapperHeight = Math.floor(wrapperH);
	                }
	                if (containerH) {
	                    containerHeight = Math.floor(containerH);
	                }

	                if (containerHeight > wrapperHeight) {
	                    thiz.isRun = true;
	                    elSidebar.height(scrollbarHeight);
	                    scale = wrapperHeight / containerHeight;
	                    elBlock.height(scrollbarHeight * scale);
	                    maxMove = scrollbarHeight - scrollbarHeight * scale;
	                    moveNum = maxMove * 0.20;
	                    elSidebar.show();
	                } else {
	                    thiz.isRun = false;
	                    elSidebar.hide();
	                }
	                return this;
	            },
	            move: function move(size) {
	                if (!this.isRun) {
	                    return false;
	                }
	                var _pos = elBlock.position().top,
	                    _moveSize = _pos - size;
	                _moveSize = _moveSize < 0 ? 0 : _moveSize > maxMove ? maxMove : _moveSize;
	                elBlock.css("top", _moveSize);
	                containerTop = _moveSize / scrollbarHeight * containerHeight;
	                elContainer.css("top", -containerTop);
	            },
	            scrollTop: function scrollTop() {
	                var _arguments = arguments[0];
	                if (_arguments == undefined) {
	                    return elBlock.css("top");
	                }
	                if (typeof _arguments == 'number') {
	                    var _blockMoveNum = _arguments * scale,
	                        _containerMoveMax = maxMove / scale,
	                        _containerMoveNum = _arguments > _containerMoveMax ? _containerMoveMax : _arguments;
	                    _blockMoveNum = _blockMoveNum > maxMove ? maxMove : _blockMoveNum;
	                    elBlock.animate({ "top": _blockMoveNum }, 400);
	                    elContainer.animate({ "top": -_containerMoveNum }, 400);
	                }
	            }
	        };

	        scrollbarMethods.reset();

	        return scrollbarMethods;
	    };

	    /**
	     * 绑定滚动条
	     * @type Function
	     */
	    Scrollbar.prototype.bind = function (element, wrapperHeight, containerHeight) {
	        var self = this;
	        var $wrapper = element.find('.js-scroll-wrapper'),
	            $container = $wrapper.find('.js-scroll-container'),
	            $sidebar = element.find('.js-scroll-sidebar'),
	            $block = $sidebar.find('.js-scroll-block'),
	            revise = element.data('scrollRevise');

	        // init scrollbar
	        var scrollbar = self.create({
	            frame: element,
	            wrapper: $wrapper,
	            container: $container,
	            scrollbar: $sidebar,
	            wrapperHeight: wrapperHeight,
	            containerHeight: containerHeight,
	            block: $block,
	            scrollbarRevise: revise || 20
	        });

	        element.data('ui-scroll', scrollbar);

	        return scrollbar;
	    };

	    return new Scrollbar();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery) {/*
	 *@description Dialog
	 *@author：xu chen 
	 *@date：2014-4-1
	 *@update：2015-3-20
	*/
	'use strict';

	window.Store.addPlugin('Dialog', function ($, Store) {

	    function Dialog() {
	        var self = this;

	        self.def = {
	            mark: '',
	            isLayer: true,
	            isCenter: false,
	            once: false,
	            top: false,
	            title: '标题',
	            dialogClass: '',
	            doneText: '确定',
	            cancelText: '取消',
	            template: '',
	            templateUrl: '',
	            templateData: null,
	            hasBtn: true,
	            hasCancel: true,
	            params: {},
	            content: null, // [null | function]
	            done: null, // [null | function]
	            cancel: null, // [null | function]
	            closeFn: null // [null | function]
	        };

	        self.dialogs = { length: 0 };
	        self.showList = [];

	        self.$maskLayer = $('<div class="module-dialog-layer"></div>');
	    }

	    Dialog.prototype.init = function () {
	        var self = this;
	        $('body').append(self.$maskLayer);

	        $(document).on('keydown', function (event) {
	            if (self.showList.length) {
	                var _moduleDialog = self.showList[self.showList.length - 1];
	                if (event.which == 27) {
	                    _moduleDialog.config.$close.click();
	                } else if (event.which == 13 && (_moduleDialog.config.mark == 'dialogDefaultMessage' || _moduleDialog.config.mark == 'dialogDefaultConfirm')) {
	                    _moduleDialog.config.$done.click();
	                } else if (event.which == 8 && $('input:focus').length == 0) {
	                    return false;
	                }
	            }
	        }).on('mousewheel', function () {
	            if (self.showList.length) {
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
	    Dialog.prototype.create = function (options) {
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

	        if (config.template) {
	            config.templateHtml = config.template;
	            config.baseTemplate = config.template;
	        } else {
	            config.defer = ct.get(config.templateUrl);
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
	            config: config,
	            dom: $dialog,
	            isOpen: false,
	            isVisible: false
	        };
	        self.dialogs.length++;

	        $('body').append($dialog);

	        // out methods
	        config.$ = function (selector) {
	            return config.$con.find(selector);
	        };
	        config.positionCenter = function () {
	            self._positionCenter(objDialog);
	            return config;
	        };

	        config.setCloseAction = function (callback) {
	            typeof callback == 'function' && (_closeAction = callback);
	        };

	        config.setDialog = function (callback) {
	            if (config.defer) {
	                config.defer.done(function () {
	                    $.isFunction(callback) && callback(config);
	                });
	            } else {
	                $.isFunction(callback) && callback(config);
	            }
	        };

	        config.show = function (callback) {
	            self._show(objDialog, callback);
	            return config;
	        };
	        config.hide = function (callback) {
	            self._hide(objDialog, function () {
	                typeof callback == 'function' && callback(config);
	            });
	        };

	        // 如果config.once为true 则执行_close 否则执行 _hide
	        config.close = function (closeFn) {
	            self._close(objDialog, function () {
	                typeof closeFn == 'function' && closeFn(config);
	                typeof _closeAction == 'function' && _closeAction(config);
	            });
	        };

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
	        config.change = function (opt) {
	            self._change(objDialog, opt);
	        };

	        // get template by url
	        if (config.templateUrl) {
	            // config.$con.html($.loader());
	            config.defer.done(function (result) {
	                var __dialogConHtml = result;
	                if (config.templateData) {
	                    __dialogConHtml = ct.compile(__dialogConHtml, config.templateData);
	                }
	                config.$con.html(__dialogConHtml);
	                config.baseTemplate = __dialogConHtml;

	                // bind popup init function
	                boolContent && config.content(config);
	            });
	        } else {

	            // bind popup init function
	            boolContent && config.content(config);
	        }

	        // bind close method
	        $dialog.on('click', function (event) {
	            if (!$(event.target).closest('.dialog-panel').length) {
	                if (boolClose) {
	                    config.closeFn(config);
	                } else {
	                    if (config.hasCancel && boolCancel) {
	                        config.cancel(config);
	                    } else {
	                        config.close();
	                    }
	                }
	            }
	        })
	        // bind btn close method
	        .on('click', '.dialog-close', function () {
	            if (boolClose) {
	                config.closeFn(config);
	            } else {
	                if (config.hasCancel && boolCancel) {
	                    config.cancel(config);
	                } else {
	                    config.close();
	                }
	            }
	        })
	        // bind btn done method
	        .on('click', '.js-dialog-done', function () {
	            if (config.hasBtn && boolDone) {
	                config.done(config);
	            }
	            if (!boolDone) {
	                config.close();
	            }
	            return false;
	        })
	        // bind btn cancel method
	        .on('click', '.js-dialog-cancel', function () {
	            if (boolCancel) {
	                config.cancel(config);
	            } else {
	                config.close();
	            }
	        });

	        return config;
	    };

	    /**
	     * 弹出框 ==> 对话框
	     * @type Function
	     */
	    Dialog.prototype.confirm = function (options) {
	        var self = this;
	        var option = $.extend({}, self.def, { title: '提示' }, options, {
	            mark: 'dialogDefaultConfirm',
	            isCenter: true,
	            once: true,
	            dialogClass: 'module-dialog-confirm',
	            params: { __index: 11100 },
	            done: options.ok,
	            cancel: options.cancel
	        });

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
	    };

	    /**
	     * 弹出框 ==> 提示框
	     * @type Function
	     */
	    Dialog.prototype.message = function (options) {
	        var self = this;

	        var option = $.extend({}, self.def, { message: '', title: '提示' }, options, {
	            mark: 'dialogDefaultMessage',
	            isCenter: true,
	            dialogClass: 'module-dialog-confirm',
	            params: { __index: 11100 },
	            hasCancel: false,
	            once: true,
	            done: options.ok
	        });

	        var arrTemp = [];

	        arrTemp.push('<div class="confirm-msg">');
	        arrTemp.push(options.message);
	        arrTemp.push('</div>');

	        option.template = arrTemp.join('');

	        var _messageDialog = self.create(option);

	        _messageDialog.show();

	        return _messageDialog;
	    };

	    /**
	     * 居中弹出框
	     * @type Function
	     */
	    Dialog.prototype._positionCenter = function (dialog) {
	        var self = this,
	            elDialog = dialog.dom,
	            width = elDialog.width(),
	            height = elDialog.height(),
	            scrollTop = 0;

	        if (Store.config.isIE6) {
	            $('body').css('position', 'relative');

	            var winWidth = $(document).width();
	            var docHeight = $(document).height();
	            var winHeight = $(window).height();
	            self.$maskLayer.width(winWidth).height(docHeight);

	            dialog.dom.css({
	                top: $(document).scrollTop() + winHeight / 2,
	                left: '50%',
	                "margin": "-" + dialog.dom.height() / 2 + "px 0 0 -" + dialog.dom.width() / 2 + "px"
	            });
	        } else {
	            elDialog.css({
	                "top": "50%",
	                "left": "50%",
	                "margin": "-" + height / 2 + "px 0 0 -" + width / 2 + "px"
	            });
	        }
	    };

	    /**
	     * 打开弹出框
	     * @type Function
	     */
	    Dialog.prototype._show = function (dialog, callback) {
	        var self = this;
	        if (!dialog.isOpen) {
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
	    };

	    /**
	     * 隐藏弹出框
	     * @type Function
	     */
	    Dialog.prototype._hide = function (dialog, callback) {
	        var self = this;
	        if (dialog.isVisible) {

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
	    };

	    /**
	     * 关闭弹出框
	     * @type Function
	     */
	    Dialog.prototype._close = function (dialog, callback) {
	        var self = this;

	        self._hide(dialog, function () {
	            if (dialog.config.once) {
	                dialog.dom.remove();
	                delete self.dialogs[dialog.config.mark];
	            }
	            typeof callback == 'function' && callback();
	        });
	    };

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
	    Dialog.prototype._change = function (dialog, options) {
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

	        if (Store.config.opacity) {
	            $targetPanel.css('opacity', '0').hide();
	            $targetPanel.show({ duration: 500, easing: 'easeOutQuart' }).animate({ 'opacity': '1' }, 300, function () {
	                typeof options.callback == 'function' && options.callback(dialog.config);
	            });
	            // width && $dialog.animate({width: width + 'px'},{duration:500,easing:'easeOutQuart'});
	            $animate.animate(animateStyle, { duration: 500, easing: 'easeOutQuart' });
	            // $dialog.animate({'margin-top':'-' + dialogTop + 'px'},{duration:500,easing:'easeOutQuart'});
	        } else {
	                $targetPanel.show();
	                boolanimate && $animate.css(animateStyle);
	                width && $dialog.css({ width: width + 'px' });
	                // dialogTop && $dialog.css({'margin-top':'-' + dialogTop + 'px'});
	                typeof options.callback == 'function' && options.callback(dialog.config);
	            }
	    };

	    /**
	     * 关闭所有弹出框
	     * @type Function
	     */
	    Dialog.prototype.closeAll = function () {
	        var self = this;

	        for (var i = 0, l = self.showList.length; i < l; i++) {
	            self.showList[i].config.close();
	        }
	    };

	    return new Dialog();
	}(jQuery, window.Store));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone, _, $) {'use strict';

	//     Underscore.js 1.7.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	// (function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
	//# sourceMappingURL=underscore-min.map
	// (function(t,e){if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,s){t.Backbone=e(t,s,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore");e(t,exports,i)}else{t.Backbone=e(t,{},t._,t.jQuery||t.Zepto||t.ender||t.$)}})(this,function(t,e,i,r){var s=t.Backbone;var n=[];var a=n.push;var o=n.slice;var h=n.splice;e.VERSION="1.1.2";e.$=r;e.noConflict=function(){t.Backbone=s;return this};e.emulateHTTP=false;e.emulateJSON=false;var u=e.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,r){if(!c(this,"once",t,[e,r])||!e)return this;var s=this;var n=i.once(function(){s.off(t,n);e.apply(this,arguments)});n._callback=e;return this.on(t,n,r)},off:function(t,e,r){var s,n,a,o,h,u,l,f;if(!this._events||!c(this,"off",t,[e,r]))return this;if(!t&&!e&&!r){this._events=void 0;return this}o=t?[t]:i.keys(this._events);for(h=0,u=o.length;h<u;h++){t=o[h];if(a=this._events[t]){this._events[t]=s=[];if(e||r){for(l=0,f=a.length;l<f;l++){n=a[l];if(e&&e!==n.callback&&e!==n.callback._callback||r&&r!==n.context){s.push(n)}}}if(!s.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=o.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)f(i,e);if(r)f(r,arguments);return this},stopListening:function(t,e,r){var s=this._listeningTo;if(!s)return this;var n=!e&&!r;if(!r&&typeof e==="object")r=this;if(t)(s={})[t._listenId]=t;for(var a in s){t=s[a];t.off(e,r,this);if(n||i.isEmpty(t._events))delete this._listeningTo[a]}return this}};var l=/\s+/;var c=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(l.test(i)){var n=i.split(l);for(var a=0,o=n.length;a<o;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var f=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,o);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e);return}};var d={listenTo:"on",listenToOnce:"once"};i.each(d,function(t,e){u[e]=function(e,r,s){var n=this._listeningTo||(this._listeningTo={});var a=e._listenId||(e._listenId=i.uniqueId("l"));n[a]=e;if(!s&&typeof r==="object")s=this;e[t](r,s,this);return this}});u.bind=u.on;u.unbind=u.off;i.extend(e,u);var p=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(p.prototype,u,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,r){var s,n,a,o,h,u,l,c;if(t==null)return this;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;a=r.unset;h=r.silent;o=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=i.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in n)this.id=n[this.idAttribute];for(s in n){e=n[s];if(!i.isEqual(c[s],e))o.push(s);if(!i.isEqual(l[s],e)){this.changed[s]=e}else{delete this.changed[s]}a?delete c[s]:c[s]=e}if(!h){if(o.length)this._pending=r;for(var f=0,d=o.length;f<d;f++){this.trigger("change:"+o[f],this,c[o[f]],r)}}if(u)return this;if(!h){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e,r=false;var s=this._changing?this._previousAttributes:this.attributes;for(var n in t){if(i.isEqual(s[n],e=t[n]))continue;(r||(r={}))[n]=e}return r},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var r=t.success;t.success=function(i){if(!e.set(e.parse(i,t),t))return false;if(r)r(e,i,t);e.trigger("sync",e,i,t)};q(this,t);return this.sync("read",this,t)},save:function(t,e,r){var s,n,a,o=this.attributes;if(t==null||typeof t==="object"){s=t;r=e}else{(s={})[t]=e}r=i.extend({validate:true},r);if(s&&!r.wait){if(!this.set(s,r))return false}else{if(!this._validate(s,r))return false}if(s&&r.wait){this.attributes=i.extend({},o,s)}if(r.parse===void 0)r.parse=true;var h=this;var u=r.success;r.success=function(t){h.attributes=o;var e=h.parse(t,r);if(r.wait)e=i.extend(s||{},e);if(i.isObject(e)&&!h.set(e,r)){return false}if(u)u(h,t,r);h.trigger("sync",h,t,r)};q(this,r);n=this.isNew()?"create":r.patch?"patch":"update";if(n==="patch")r.attrs=s;a=this.sync(n,this,r);if(s&&r.wait)this.attributes=o;return a},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var s=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(t.wait||e.isNew())s();if(r)r(e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};if(this.isNew()){t.success();return false}q(this,t);var n=this.sync("delete",this,t);if(!t.wait)s();return n},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||M();if(this.isNew())return t;return t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var v=["keys","values","pairs","invert","pick","omit"];i.each(v,function(t){p.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.attributes);return i[t].apply(i,e)}});var g=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var m={add:true,remove:true,merge:true};var y={add:true,remove:false};i.extend(g.prototype,u,{model:p,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,y))},remove:function(t,e){var r=!i.isArray(t);t=r?[t]:i.clone(t);e||(e={});var s,n,a,o;for(s=0,n=t.length;s<n;s++){o=t[s]=this.get(t[s]);if(!o)continue;delete this._byId[o.id];delete this._byId[o.cid];a=this.indexOf(o);this.models.splice(a,1);this.length--;if(!e.silent){e.index=a;o.trigger("remove",o,this,e)}this._removeReference(o,e)}return r?t[0]:t},set:function(t,e){e=i.defaults({},e,m);if(e.parse)t=this.parse(t,e);var r=!i.isArray(t);t=r?t?[t]:[]:i.clone(t);var s,n,a,o,h,u,l;var c=e.at;var f=this.model;var d=this.comparator&&c==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g=[],y=[],_={};var b=e.add,w=e.merge,x=e.remove;var E=!d&&b&&x?[]:false;for(s=0,n=t.length;s<n;s++){h=t[s]||{};if(h instanceof p){a=o=h}else{a=h[f.prototype.idAttribute||"id"]}if(u=this.get(a)){if(x)_[u.cid]=true;if(w){h=h===o?o.attributes:h;if(e.parse)h=u.parse(h,e);u.set(h,e);if(d&&!l&&u.hasChanged(v))l=true}t[s]=u}else if(b){o=t[s]=this._prepareModel(h,e);if(!o)continue;g.push(o);this._addReference(o,e)}o=u||o;if(E&&(o.isNew()||!_[o.id]))E.push(o);_[o.id]=true}if(x){for(s=0,n=this.length;s<n;++s){if(!_[(o=this.models[s]).cid])y.push(o)}if(y.length)this.remove(y,e)}if(g.length||E&&E.length){if(d)l=true;this.length+=g.length;if(c!=null){for(s=0,n=g.length;s<n;s++){this.models.splice(c+s,0,g[s])}}else{if(E)this.models.length=0;var k=E||g;for(s=0,n=k.length;s<n;s++){this.models.push(k[s])}}}if(l)this.sort({silent:true});if(!e.silent){for(s=0,n=g.length;s<n;s++){(o=g[s]).trigger("add",o,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return r?t[0]:t},reset:function(t,e){e||(e={});for(var r=0,s=this.models.length;r<s;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return o.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){if(i.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(i.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(i.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=t?i.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var r=this;t.success=function(i){var s=t.reset?"reset":"set";r[s](i,t);if(e)e(r,i,t);r.trigger("sync",r,i,t)};q(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var r=this;var s=e.success;e.success=function(t,i){if(e.wait)r.add(t,e);if(s)s(t,i,e)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof p)return t;e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_addReference:function(t,e){this._byId[t.cid]=t;if(t.id!=null)this._byId[t.id]=t;if(!t.collection)t.collection=this;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];i.each(_,function(t){g.prototype[t]=function(){var e=o.call(arguments);e.unshift(this.models);return i[t].apply(i,e)}});var b=["groupBy","countBy","sortBy","indexBy"];i.each(b,function(t){g.prototype[t]=function(e,r){var s=i.isFunction(e)?e:function(t){return t.get(e)};return i[t](this.models,s,r)}});var w=e.View=function(t){this.cid=i.uniqueId("view");t||(t={});i.extend(this,i.pick(t,E));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var x=/^(\S+)\s*(.*)$/;var E=["model","collection","el","id","attributes","className","tagName","events"];i.extend(w.prototype,u,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,i){if(this.$el)this.undelegateEvents();this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0];if(i!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=i.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[t[e]];if(!r)continue;var s=e.match(x);var n=s[1],a=s[2];r=i.bind(r,this);n+=".delegateEvents"+this.cid;if(a===""){this.$el.on(n,r)}else{this.$el.on(n,a,r)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");var r=e.$("<"+i.result(this,"tagName")+">").attr(t);this.setElement(r,false)}else{this.setElement(i.result(this,"el"),false)}}});e.sync=function(t,r,s){var n=T[t];i.defaults(s||(s={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:n,dataType:"json"};if(!s.url){a.url=i.result(r,"url")||M()}if(s.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(s.attrs||r.toJSON(s))}if(s.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(s.emulateHTTP&&(n==="PUT"||n==="DELETE"||n==="PATCH")){a.type="POST";if(s.emulateJSON)a.data._method=n;var o=s.beforeSend;s.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",n);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!s.emulateJSON){a.processData=false}if(a.type==="PATCH"&&k){a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var h=s.xhr=e.ajax(i.extend(a,s));r.trigger("request",r,h,s);return h};var k=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var H=/(\(\?)?:\w+/g;var A=/\*\w+/g;var I=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,u,{initialize:function(){},route:function(t,r,s){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){s=r;r=""}if(!s)s=this[r];var n=this;e.history.route(t,function(i){var a=n._extractParameters(t,i);n.execute(s,a);n.trigger.apply(n,["route:"+r].concat(a));n.trigger("route",r,a);e.history.trigger("route",n,r,a)});return this},execute:function(t,e){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(I,"\\$&").replace(S,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(A,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var N=e.History=function(){this.handlers=[];i.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var R=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/#.*$/;N.started=false;i.extend(N.prototype,u,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=decodeURI(this.location.pathname+this.location.search);var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(R,"")},start:function(t){if(N.started)throw new Error("Backbone.history has already been started");N.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var r=this.getFragment();var s=document.documentMode;var n=P.exec(navigator.userAgent.toLowerCase())&&(!s||s<=7);this.root=("/"+this.root+"/").replace(O,"/");if(n&&this._wantsHashChange){var a=e.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=a.hide().appendTo("body")[0].contentWindow;this.navigate(r)}if(this._hasPushState){e.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!n){e.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=r;var o=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){this.fragment=this.getFragment(null,true);this.location.replace(this.root+"#"+this.fragment);return true}else if(this._hasPushState&&this.atRoot()&&o.hash){this.fragment=this.getHash().replace(R,"");this.history.replaceState({},document.title,this.root+this.fragment)}}if(!this.options.silent)return this.loadUrl()},stop:function(){e.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);N.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return i.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!N.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new N;var U=function(t,e){var r=this;var s;if(t&&i.has(t,"constructor")){s=t.constructor}else{s=function(){return r.apply(this,arguments)}}i.extend(s,r,e);var n=function(){this.constructor=s};n.prototype=r.prototype;s.prototype=new n;if(t)i.extend(s.prototype,t);s.__super__=r.prototype;return s};p.extend=g.extend=$.extend=w.extend=N.extend=U;var M=function(){throw new Error('A "url" property or function must be specified')};var q=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}};return e});
	//# sourceMappingURL=backbone-min.map
	/*
	        License here,
	        I dont think too  much about licence
	        just feel free to do anything you want... :-)
	*/
	window.PrettyJSON = { view: {}, tpl: {} };PrettyJSON.util = { isObject: function isObject(v) {
	                return Object.prototype.toString.call(v) === '[object Object]';
	        }, pad: function pad(str, length) {
	                str = String(str);while (str.length < length) {
	                        str = '0' + str;
	                }return str;
	        }, dateFormat: function dateFormat(date, f) {
	                f = f.replace('YYYY', date.getFullYear());f = f.replace('YY', String(date.getFullYear()).slice(-2));f = f.replace('MM', PrettyJSON.util.pad(date.getMonth() + 1, 2));f = f.replace('DD', PrettyJSON.util.pad(date.getDate(), 2));f = f.replace('HH24', PrettyJSON.util.pad(date.getHours(), 2));f = f.replace('HH', PrettyJSON.util.pad(date.getHours() % 12, 2));f = f.replace('MI', PrettyJSON.util.pad(date.getMinutes(), 2));f = f.replace('SS', PrettyJSON.util.pad(date.getSeconds(), 2));return f;
	        } };
	PrettyJSON.tpl.Node = '' + '<span class="node-container">' + '<span class="node-top node-bracket" />' + '<span class="node-content-wrapper">' + '<ul class="node-body" />' + '</span>' + '<span class="node-down node-bracket" />' + '</span>';PrettyJSON.tpl.Leaf = '' + '<span class="leaf-container">' + '<span class="<%= type %>"> <%=data%></span><span><%= coma %></span>' + '</span>';PrettyJSON.view.Node = Backbone.View.extend({ tagName: 'span', data: null, level: 1, path: '', type: '', size: 0, isLast: true, rendered: false, events: { 'click .node-bracket': 'collapse', 'mouseover .node-container': 'mouseover', 'mouseout .node-container': 'mouseout' }, initialize: function initialize(opt) {
	                this.options = opt;this.data = this.options.data;this.level = this.options.level || this.level;this.path = this.options.path;this.isLast = _.isUndefined(this.options.isLast) ? this.isLast : this.options.isLast;this.dateFormat = this.options.dateFormat;var m = this.getMeta();this.type = m.type;this.size = m.size;this.childs = [];this.render();if (this.level == 1) this.show();
	        }, getMeta: function getMeta() {
	                var val = { size: _.size(this.data), type: _.isArray(this.data) ? 'array' : 'object' };return val;
	        }, elements: function elements() {
	                this.els = { container: $(this.el).find('.node-container'), contentWrapper: $(this.el).find('.node-content-wrapper'), top: $(this.el).find('.node-top'), ul: $(this.el).find('.node-body'), down: $(this.el).find('.node-down') };
	        }, render: function render() {
	                this.tpl = _.template(PrettyJSON.tpl.Node);$(this.el).html(this.tpl);this.elements();var b = this.getBrackets();this.els.top.html(b.top);this.els.down.html(b.bottom);this.hide();return this;
	        }, renderChilds: function renderChilds() {
	                var count = 1;_.each(this.data, function (val, key) {
	                        var isLast = count == this.size;count = count + 1;var path = this.type == 'array' ? this.path + '[' + key + ']' : this.path + '.' + key;var opt = { key: key, data: val, parent: this, path: path, level: this.level + 1, dateFormat: this.dateFormat, isLast: isLast };var child = PrettyJSON.util.isObject(val) || _.isArray(val) ? new PrettyJSON.view.Node(opt) : new PrettyJSON.view.Leaf(opt);child.on('mouseover', function (e, path) {
	                                this.trigger("mouseover", e, path);
	                        }, this);child.on('mouseout', function (e) {
	                                this.trigger("mouseout", e);
	                        }, this);var li = $('<li/>');var colom = '&nbsp;:&nbsp;';var left = $('<span />');var right = $('<span />').append(child.el);this.type == 'array' ? left.html('') : left.html(key + colom);left.append(right);li.append(left);this.els.ul.append(li);child.parent = this;this.childs.push(child);
	                }, this);
	        }, isVisible: function isVisible() {
	                return this.els.contentWrapper.is(":visible");
	        }, collapse: function collapse(e) {
	                e.stopPropagation();this.isVisible() ? this.hide() : this.show();this.trigger("collapse", e);
	        }, show: function show() {
	                if (!this.rendered) {
	                        this.renderChilds();this.rendered = true;
	                }
	                this.els.top.html(this.getBrackets().top);this.els.contentWrapper.show();this.els.down.show();
	        }, hide: function hide() {
	                var b = this.getBrackets();this.els.top.html(b.close);this.els.contentWrapper.hide();this.els.down.hide();
	        }, getBrackets: function getBrackets() {
	                var v = { top: '{', bottom: '}', close: '{ ... }' };if (this.type == 'array') {
	                        v = { top: '[', bottom: ']', close: '[ ... ]' };
	                };v.bottom = this.isLast ? v.bottom : v.bottom + ',';v.close = this.isLast ? v.close : v.close + ',';return v;
	        }, mouseover: function mouseover(e) {
	                e.stopPropagation();this.trigger("mouseover", e, this.path);
	        }, mouseout: function mouseout(e) {
	                e.stopPropagation();this.trigger("mouseout", e);
	        }, expandAll: function expandAll() {
	                _.each(this.childs, function (child) {
	                        if (child instanceof PrettyJSON.view.Node) {
	                                child.show();child.expandAll();
	                        }
	                }, this);this.show();
	        }, collapseAll: function collapseAll() {
	                _.each(this.childs, function (child) {
	                        if (child instanceof PrettyJSON.view.Node) {
	                                child.hide();child.collapseAll();
	                        }
	                }, this);if (this.level != 1) this.hide();
	        } });PrettyJSON.view.Leaf = Backbone.View.extend({ tagName: 'span', data: null, level: 0, path: '', type: 'string', isLast: true, events: { "mouseover .leaf-container": "mouseover", "mouseout .leaf-container": "mouseout" }, initialize: function initialize(opt) {
	                this.options = opt;this.data = this.options.data;this.level = this.options.level;this.path = this.options.path;this.type = this.getType();this.dateFormat = this.options.dateFormat;this.isLast = _.isUndefined(this.options.isLast) ? this.isLast : this.options.isLast;this.render();
	        }, getType: function getType() {
	                var m = 'string';var d = this.data;if (_.isNumber(d)) m = 'number';else if (_.isBoolean(d)) m = 'boolean';else if (_.isDate(d)) m = 'date';else if (_.isNull(d)) m = 'null';
	                return m;
	        }, getState: function getState() {
	                var coma = this.isLast ? '' : ',';var state = { data: this.data, level: this.level, path: this.path, type: this.type, coma: coma };return state;
	        }, render: function render() {
	                var state = this.getState();if (state.type == 'date' && this.dateFormat) {
	                        state.data = PrettyJSON.util.dateFormat(this.data, this.dateFormat);
	                }
	                if (state.type == 'null') {
	                        state.data = 'null';
	                }
	                this.tpl = _.template(PrettyJSON.tpl.Leaf);$(this.el).html(this.tpl(state));return this;
	        }, mouseover: function mouseover(e) {
	                e.stopPropagation();var path = this.path + '&nbsp;:&nbsp;<span class="' + this.type + '"><b>' + this.data + '</b></span>';this.trigger("mouseover", e, path);
	        }, mouseout: function mouseout(e) {
	                e.stopPropagation();this.trigger("mouseout", e);
	        } });
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(11), __webpack_require__(2)))

/***/ }
]);