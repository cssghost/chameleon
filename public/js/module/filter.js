/*
 *@description Filter
 *@author：xu chen
 *@date：2014-4-14
 *@update：2014-4-14
 */
'use strict';
window.Store.addFilter((function($, Store) {
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
    Filter.prototype.json = function(text, param, model) {
        return JSON.stringify(model);
    }

    /**
     * encodeURIComponent
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.url = function(text) {
        return encodeURIComponent(text);
    }

    /**
     * 人民币
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.rmb = function(text, isFloat) {
        if ( text == undefined ) {
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

        var returnResult = '¥ ' + strArr.reverse().join('').replace(/\,$/gi, '')

        if (typeof isFloat == 'boolean' && isFloat || isFloat == 'true') {
            returnResult = returnResult + '.' + (strLast == '' ? '00' : strLast);
        }

        return returnResult;
    }

    /**
     * 人民币 运算
     * @type Function
     * @param {nuber}   [first]     第一运算数
     * @param {number}  [second]    第二运算数
     * @param {boolean} [isSum]     是否为加法
     */
    Filter.prototype.rmbCount = function(first, second, isSum) {
        var first = first || 0,
            second = second || 0;

        if ( isSum ) {
            return ( first * 100 + second * 100 ) / 100;
        } else {
            return ( first * 100 - second * 100 ) / 100;
        }
    }

    /**
     * 双精度 运算
     * @type Function
     * @param {number} 字符串
     */
    Filter.prototype.floatNumber = function(number, float) {
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

        return ( strPrev + '.' + (strLast == '' ? '00' : strLast) - 0 );
    }

    /**
     * 移动电话加密
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.codeTelephone = function(text) {
        var parseData = '';
        if (text) {
            text = '' + text;
            parseData = text.replace(/^(\d{3})\d{5}/g, function($0, $1) {
                return $1 + '*****';
            });
        }
        return parseData;
    }

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
        if ( transformText.length <= length * 2 ) {
            return text;
        }

        // 把双字节的字符转为 ">>"
        // 截取所需要的字符串
        // 转换成数组
        var split = transformText.substr(0, length * 2).split('>>'),
            n = 0;

        $.each(split, function (index, item) {
            // 为双字节字符的时候
            if ( item == '' ) {
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
    }

    /**
     * 获得邮箱地址
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.emailLocation = function(text) {
        var parseData = '';
        if (text) {
            text = '' + text;
            parseData = text.replace(/^.+\@/g, '');
            if (Store.config.mailUrl[parseData]) {
                parseData = Store.config.mailUrl[parseData]
            } else {
                parseData = 'http://mail.' + parseData;
            }
        }
        return parseData;
    }

    /**
     * 是否显示
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.boolShow = function(isShow) {
        var showClass = 'fn-hide';
        if (isShow) {
            showClass = ' ';
        }
        return showClass;
    }

    /**
     * 根据布尔值加载不同样式
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.boolClass = function(isShow, trueClass, falseClass) {
        var showClass = '';
        if (isShow) {
            showClass = trueClass || ' ';
        } else {
            showClass = falseClass || ' ';
        }
        return showClass;
    }

    /**
     * 根据布尔值返回不同结果
     * @type Function
     * @param {text} 字符串
     */
    Filter.prototype.boolResult = function(bool, trueResult, falseResult) {
        var result = '';
        if (bool) {
            result = trueResult || ' ';
        } else {
            result = falseResult || ' ';
        }
        return result;
    }

    /**
     * 返回未来的 xx 天 的 date
     * @type Function
     * @param {number} xx 天
     */
    Filter.prototype.nextDate = function(day) {
        var _date = new Date(),
            day = day | 0;

    　　 _date.setDate(_date.getDate() + day);

    　　 return _date;
    }

    /**
     * 输出一个有效地时间戳
     * @type Function
     * @param {Date} 时间戳
     */
    Filter.prototype.timestamp = function(timestamp) {
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
    }

    /**
     * 日期过滤
     * @type Function
     * @param {Date} 时间戳
     */
    Filter.prototype.date = function(timestamp, format) {
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
    }

    /**
     * 某一段的时间的时间戳转为真实时间, 时间戳的单位为 >>秒<<
     * @type Function
     * @param {timestamp} [timestamp] 时间戳
     * @return {String} 具体时间或者空字符串
     */
    Filter.prototype.realtime = function(timestamp) {

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
    }

    /**
     * 距离当前时间的间隔时间
     * @type Function
     * @required realtime
     * @param {timestamp} [timestamp] 时间戳
     * @return {String} 具体时间或者空字符串
     */
    Filter.prototype.remainingtime = function(timestamp, nowTime) {
        var timestamp = this.timestamp(timestamp),
            nowTime = this.timestamp(nowTime);

        if (timestamp) {

            var difference = Math.abs(nowTime - timestamp);

            return self.realtime(difference);
        }

        return ' ';
    }

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
    Filter.prototype.countdown = function(options) {
        var self = this;

        var timeout = Store.loop['countdown' + +new Date()] = setInterval(function () {

            if ( Store.isFunction(options.abort) && !options.abort() ) {
                clearInterval(timeout);
                return false;
            }

            Store.isFunction(options.format) 
                ? options.$label.text(options.format(options.time))
                : options.$label.text(options.time);

            if (options.time <= 0) {
                typeof options.callback == 'function' && options.callback();
                clearInterval(timeout);
            } else {
                options.time--;
            }
        }, 1000);

    }

    /**
     * 匹配 retina 图片
     * @param  {string}             [src] 图片路径
     * @param  {bool}               [keepPath] 保持路径
     */
    Filter.prototype.retinaImage = function(src, keepPath) {
        if (!src) {
            return '';
        }
        else {
            var isRetina = Store.config.isRetina;

            if ( isRetina ) {
                var splitSrc = src.split('/');
                var realSrc = splitSrc.pop().replace(/(\.[^.]+)$/, '@2x$1');
                var path = splitSrc.join('/');

                if ( keepPath ) {
                    return path + '/' + realSrc;
                }
                
                return path + '/retina/' + realSrc;
            } else {
                return src;
            }
        }
    }

    /**
     * 获取图片真实尺寸
     * @param  {string} size 图片路径
     * @return {string}      图片宽高
     * @example 获取宽高60px的图片
     *          "/img/logo/" ==> /img/logo/60X60@2x.png retina版
     *                       ==> /img/logo/60X60.png    普通版
     */
    Filter.prototype.realImage = function(src, size, suffix) {

        var suffix = suffix || 'jpg';

        if (!src) {
            return '';
        }
        else if (src.indexOf('.png') > -1)
            return src;
        else {
            var isRetina = Store.config.isRetina;
            var realSrc = '';
            realSrc = isRetina ? (src + size + 'X' + size + '@2x.' + suffix) : (src + size + 'X' + size + '.' + suffix);
            return realSrc;
        }
    }

    /**
     * 获取指定名称的图片
     * @param  {string} size 图片路径
     * @return {string}      图片宽高
     * @example 获取宽高60px的图片
     *          "/img/logo/" ==> /img/logo/60X60@2x.png retina版
     *                       ==> /img/logo/60X60.png    普通版
     */
    Filter.prototype.renameImage = function(src, name) {
        if (!src) {
            return '';
        }
        else if (src.indexOf('.png') > -1) {
            return src;
        }
        else {
            var isRetina = Store.config.isRetina;
            var realSrc = '';
            // realSrc = isRetina ? (src + name +'@2x.png') : (src + name + '.png');
            realSrc = src + name +'@2x.jpg';
            return realSrc;
        }
    }

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
            if ( item.stock ) {
                stock = true;
                return false;
            }
        });

        return (stock ? '' : calssName);
    }

    return Filter;

})(jQuery, window.Store));
