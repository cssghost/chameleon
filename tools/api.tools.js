/** 
* @fileOverview api.tools.js 基础 API 操作
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/ 
'use strict';
var Q = require('q');

var log = require('../tools/log.tools.js');
var type = require('./type.tools.js');

/**
 * @author 徐晨 
 * @name apiTools
 * @class 文件操作
 * @constructor
 */
function apiTools() {}

/**
 * @name apiTools#response
 * @event
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 接口返回成功时的参数
 * @param {Object}      res          res 参数
 * @param {Function}    ctrl         ctrl 方法 必须返回 promise
 * @param {Function}    successFn    成功的回调函数
 * @param {Function}    errorFn      失败的回调函数
 */
apiTools.prototype.response = function (res, ctrl, successFn, errorFn) {
    ctrl.then(
        function(data){
            if ( type.isFunction(successFn) ) {
                successFn(data);
            } else {
                log.response(res, data);
            }
        },
        function(error){
            if ( type.isFunction(errorFn) ) {
                errorFn(error);
            } else {
                log.error(res, error.code, error.msg);
            }
        }
    );    
}


module.exports = new apiTools();