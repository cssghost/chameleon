/**
* @fileOverview room.router.js
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-17
* @update：2015-07-17
*/
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var file = require('../tools/file.tools.js');
var log = require('../tools/log.tools.js');
var api = require('../tools/api.tools.js');
var errCode = require('../config/error.code.js');
var roomManageCtrl = require('../atom/ctrl/room.manage.ctrl.js');


/**
 * @name list
 * @author 徐晨 ( xuchen@smartisan.com )
 */
router.post('/list', function(req, res, next) {
    api.response(
        res,
        roomManageCtrl.getList()
    );
});

/**
 * @name add
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 添加一个项目
 * @param {JSON}      option
 * @param {String}    option.name    项目名称
 * @param {String}    option.port    项目端口号
 * @param {String}    option.path    静态目录
 */
router.post('/add', function(req, res, next) {
    var name = req.body.name,
        port = req.body.port,
        _path = req.body.path;

    console.log(req.body);

    // 子项目名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '名称' + errCode.required.msg);
        return;
    }

    // 子项目端口为空
    if ( !port || port.trim() == '' ) {
        log.error(res, errCode.required.code, '端口' + errCode.required.msg);
        return;
    }

    // 子项目端口为空
    if ( !_path || _path.trim() == '' ) {
        log.error(res, errCode.required.code, '静态目录' + errCode.required.msg);
        return;
    }

    api.response(
        res,
        roomManageCtrl.addRoom(req.body)
    );
});

/**
 * @name update
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 修改一个项目
 * @param {JSON}      option
 * @param {String}    option.name    项目名称
 * @param {String}    option.port    项目端口号
 * @param {String}    option.path    静态目录
 */
router.post('/update', function(req, res, next) {
    var name = req.body.name,
        port = req.body.port,
        _path = req.body.path;

    console.log(req.body);

    // 子项目名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '名称' + errCode.required.msg);
        return;
    }

    // 子项目端口为空
    if ( !port || port.trim() == '' ) {
        log.error(res, errCode.required.code, '端口' + errCode.required.msg);
        return;
    }

    // 子项目端口为空
    if ( !_path || _path.trim() == '' ) {
        log.error(res, errCode.required.code, '静态目录' + errCode.required.msg);
        return;
    }

    api.response(
        res,
        roomManageCtrl.updateRoom(req.body)
    );
});

/**
 * @name remove
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 删除一个项目
 * @param {JSON}      option
 * @param {String}    option.name    项目名称
 * @param {Number}    option.post    项目端口
 */
router.post('/remove', function(req, res, next) {
    var name = req.body.name;


    // 子项目名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '名称' + errCode.required.msg);
        return;
    }

    api.response(
        res,
        roomManageCtrl.removeRoom(name)
    );
});

/**
 * @name get
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 查找一个项目
 * @param {String}    name    项目名称
 */
router.post('/get', function(req, res, next) {
    var name = req.body.name;

    console.log(req.body);

    // 子项目名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '名称' + errCode.required.msg);
        return;
    }

    api.response(
        res,
        roomManageCtrl.getRoom(name, {byID:!0})
    );
});

/**
 * @name clean
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 清除所有子项目
 */
router.post('/clean', function(req, res, next) {

    api.response(
        res,
        roomManageCtrl.cleanRoom(req.body)
    );
});

/**
 * @name start
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 启动一个子项目
 * @param {String}     name    项目名称
 */
router.post('/start', function(req, res, next) {
    var name = req.body.name;

    api.response(
        res,
        roomManageCtrl.start(name)
    );
});

/**
 * @name end
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 关闭一个子项目
 * @param {String}     name    项目名称
 */
router.post('/end', function(req, res, next) {
    var name = req.body.name;

    api.response(
        res,
        roomManageCtrl.end(name)
    );
});

module.exports = router;
