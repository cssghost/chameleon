/** 
* @fileOverview log.tools.js 文件操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 
'use strict';
var type = require('./type.tools.js');

/**
 * @author 徐晨 
 * @name LogTools
 * @class 文件操作
 * @constructor
 */
function LogTools() {}

/**
 * @name LogTools#response
 * @event
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 接口返回成功时的参数
 * @param {Object}    opt    res 参数
 * @param {JSON}      data     返回的数据
 */
LogTools.prototype.response = function (opt, data) {

    if ( type.isString(data) ) {
        try {
            data = JSON.parse(data);
        } catch (e) {

        }
    }

    opt.send({
        code : 0,
        data : data
    });
}

/**
 * @name LogTools#error
 * @event
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 接口返回错误时的参数
 * @param {Object}      opt    res 参数
 * @param {Number}      code   错误码
 * @returns {String}    msg    错误信息
 */
LogTools.prototype.error = function (opt, code, msg) {
    var msg = msg || 'error';
    var res = {
        code : 1,
        errInfo : {}
    };

    res.errInfo[code] = msg;
    
    opt.send(res);
}


module.exports = new LogTools();