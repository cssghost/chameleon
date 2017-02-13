/** 
* @fileOverview type.tools.js 检测数据类型
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/ 
'use strict';

var type = {};
var isType = function (arg, type) {
    return Object.prototype.toString.call(arg) === '[object ' + type + ']';
}

// is String
type.isString = function (arg) {
    return isType(arg, 'String');
}

// is Array
type.isArray = function (arg) {
    return isType(arg, 'Array');
}

// is function
type.isFunction = function (arg) {
    return isType(arg, 'Function');
}

// is boolean
type.isBoolean = function (arg) {
    return isType(arg, 'Boolean');
}

// is object
type.isObject = function (arg) {
    return isType(arg, 'Object');
}


module.exports = type;

