/**
* @fileOverview api.router.js
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-29
* @update：2015-07-29
*/
'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var file = require('../tools/file.tools.js');
var log = require('../tools/log.tools.js');
var responseTools = require('../tools/api.tools.js');
var errCode = require('../config/error.code.js');
var roomManageCtrl = require('../atom/ctrl/room.manage.ctrl.js');
var apiManageCtrl = require('../atom/ctrl/api.manage.ctrl.js');

/**
 * @name list
 * @author 徐晨 ( xuchen@smartisan.com )
 * @param {JSON}     req.body        获取列表的参数
 * @param {String}   req.body.room   需要获取列表的 room GUID
 */
router.post('/list', function(req, res, next) {

    responseTools.response(
        res,
        apiManageCtrl.getList(req.body)
    );
});

/**
 * @name groups
 * @author 徐晨 ( xuchen@smartisan.com )
 * @param {String}    name    项目名称
 */
router.post('/groups', function(req, res, next) {
    var name = req.body.name;

    responseTools.response(
        res,
        apiManageCtrl.getGroups(name)
    );
});

/**
 * @name create
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 新建一个接口
 * @param {JSON}      option
 * @param {String}    option.room        项目名称
 * @param {String}    option.group       新建分组的标识
 * @param {String}    option.groupName   分组名称
 * @param {String}    option.name        接口名称
 * @param {String}    option.api         接口地址
 * @param {String}    option.method      通信类型
 * @param {String}    option.dataType    数据类型
 */
router.post('/create', function(req, res, next) {

    console.log('**********************************************');
    console.log('调用 api/create 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var room = req.body.room,
        group = req.body.group,
        groupName = req.body.groupName,
        name = req.body.name,
        api = req.body.api,
        method = req.body.method,
        dataType = req.body.dataType,
        apiData = req.body.apiData;

    // 项目名称为空
    if ( !room || room.trim() == '' ) {
        log.error(res, errCode.required.code, '项目名称' + errCode.required.msg);
        return;
    }

    // 分组名称为空
    if ( group == 0 && (!groupName || groupName.trim() == '') ) {
        log.error(res, errCode.required.code, '分组名称' + errCode.required.msg);
        return;
    }

    // 接口名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '接口名称' + errCode.required.msg);
        return;
    }

    // 接口地址为空
    if ( !api || api.trim() == '' ) {
        log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
        return;
    }

    // 接口数据为空
    if ( !apiData || apiData.trim() == '' ) {
        log.error(res, errCode.required.code, '接口数据' + errCode.required.msg);
        return;
    }

    // 接口数据通信类型
    if ( !method || method.trim() == '' ) {
        log.error(res, errCode.required.code, '通信类型' + errCode.required.msg);
        return;
    }

    if ( dataType == 'json' ) {
        try {
            JSON.parse(apiData);
        }
        catch (e) {
            log.error(res, errCode.errorJSONData.code, errCode.errorJSONData.msg);
            return;
        }
    }

    responseTools.response(
        res,
        apiManageCtrl.createApi(req.body)
    );
});

/**
 * @name update/api
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 更新 api rul
 * @param {JSON} body
 * @param {GUID} body.GUID     API GUID
 * @param {String} body.api    接口地址
 */
router.post('/update/api', function(req, res, next) {

    console.log('**********************************************');
    console.log('调用 api/update/api 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    const GUID = req.body.GUID,
          api = req.body.api;

    // API GUID 为空
    if ( !GUID || GUID.trim() == '' ) {
        log.error(res, errCode.required.code, ' API GUID ' + errCode.required.msg);
        return;
    }

    // 接口地址为空
    if ( !api || api.trim() == '' ) {
        log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.updateApiUrl(req.body)
    );
});

/**
 * @name update/group
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 更新 api group
 * @param {JSON}     body
 * @param {GUID}     body.GUID     API GUID
 * @param {String}   body.group       新建分组的标识
 * @param {String}   body.groupName   分组名称
 */
router.post('/update/group', function(req, res, next) {

    console.log('**********************************************');
    console.log('调用 api/update/group 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    const GUID = req.body.GUID,
          group = req.body.group,
          groupName = req.body.groupName;

    // API GUID 为空
    if ( !GUID || GUID.trim() == '' ) {
        log.error(res, errCode.required.code, ' API GUID ' + errCode.required.msg);
        return;
    }

    // 分组名称为空
    if ( group == 0 && (!groupName || groupName.trim() == '') ) {
        log.error(res, errCode.required.code, '分组名称' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.updateApiGroup(req.body)
    );
});

/**
 * @name save
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 保存一个接口
 * @param {JSON}      option
 * @param {String}    option.room        项目名称
 * @param {String}    option.group       新建分组的标识
 * @param {String}    option.groupName   分组名称
 * @param {String}    option.name        接口名称
 * @param {String}    option.api         接口地址
 * @param {String}    option.method      通信类型
 * @param {String}    option.dataType    数据类型
 */
router.post('/save', function(req, res, next) {

    console.log('**********************************************');
    console.log('调用 api/save 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var room = req.body.room,
        group = req.body.group,
        groupName = req.body.groupName,
        name = req.body.name,
        api = req.body.api,
        method = req.body.method,
        dataType = req.body.dataType || 'json',
        apiData = req.body.apiData;

    // 项目名称为空
    if ( !room || room.trim() == '' ) {
        log.error(res, errCode.required.code, '项目名称' + errCode.required.msg);
        return;
    }

    // 分组名称为空
    if ( group == 0 && (!groupName || groupName.trim() == '') ) {
        log.error(res, errCode.required.code, '分组名称' + errCode.required.msg);
        return;
    }

    // 接口名称为空
    if ( !name || name.trim() == '' ) {
        log.error(res, errCode.required.code, '接口名称' + errCode.required.msg);
        return;
    }

    // 接口地址为空
    if ( !api || api.trim() == '' ) {
        log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
        return;
    }

    // 接口数据通信类型
    if ( !method || method.trim() == '' ) {
        log.error(res, errCode.required.code, '通信类型' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.saveApi(req.body)
    );
});

/**
 * @name get data
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 查找一个 api 数据
 * @param {String}    name       项目名称
 * @param {String}    apiName    api 名称
 */
router.post('/data', function(req, res, next) {
    const GUID = req.body.id;
    // req.body.api = decodeURIComponent(req.body.api);

    // var room = req.body.room,
    //     api = req.body.api;

    console.log('**********************************************');
    console.log('调用 api/data 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    // if ( !roomManageCtrl.isExist(room) ) {
    //     log.error(res, errCode.notExistRoom.code, errCode.notExistRoom.msg);
    //     return;
    // }

    // // 项目名称为空
    // if ( !room || room.trim() == '' ) {
    //     log.error(res, errCode.required.code, '项目名称' + errCode.required.msg);
    //     return;
    // }

    // // 接口地址为空
    // if ( !api || api.trim() == '' ) {
    //     log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
    //     return;
    // }

    // 接口地址为空
    if ( !GUID || GUID.trim() == '' ) {
        log.error(res, errCode.required.code, 'API GUID' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.getData(GUID)
    );
});

/**
 * @name create
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 新建一个新的接口数据
 * @param {JSON}      option
 * @param {String}    option.apiID    API Data GUID
 * @param {String}    option.tag     数据别名
 * @param {String}    option.data    数据
 */
router.post('/backup/create', function(req, res, next) {

    console.log('**********************************************');
    console.log('调用 api/backup/create 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var apiID = req.body.apiID,
        tag = req.body.tag,
        data = req.body.data;

    // 接口地址为空
    if ( !apiID || apiID.trim() == '' ) {
        log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
        return;
    }

    // 数据别名为空
    if ( !tag || tag.trim() == '' ) {
        log.error(res, errCode.required.code, '数据别名' + errCode.required.msg);
        return;
    }

    // 接口数据为空
    if ( !data || data.trim() == '' ) {
        log.error(res, errCode.required.code, '接口数据' + errCode.required.msg);
        return;
    }

    try {
        JSON.parse(data);
    }
    catch (e) {
        log.error(res, errCode.errorJSONData.code, errCode.errorJSONData.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.createBackup(req.body)
    );
});

/**
 * @name update
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 更新一个接口数据
 * @param {JSON}      option
 * @param {String}    option.apiID   API Data GUID
 * @param {String}    option.tagID   数据 ID
 * @param {String}    option.tag     数据别名
 * @param {String}    option.data    数据
 */
router.post('/backup/update', function(req, res, next) {
    console.log('**********************************************');
    console.log('调用 api/backup/create 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var apiID = req.body.apiID,
        tag = req.body.tag,
        tagID = req.body.tagID,
        data = req.body.data;

    // 接口地址为空
    if ( !apiID || apiID.trim() == '' ) {
        log.error(res, errCode.required.code, '接口地址' + errCode.required.msg);
        return;
    }

    // 数据 ID为空
    if ( !tagID || tagID.trim() == '' ) {
        log.error(res, errCode.required.code, '数据 ID' + errCode.required.msg);
        return;
    }

    // 数据别名为空
    if ( !tag || tag.trim() == '' ) {
        log.error(res, errCode.required.code, '数据别名' + errCode.required.msg);
        return;
    }

    // 接口数据为空
    if ( !data || data.trim() == '' ) {
        log.error(res, errCode.required.code, '接口数据' + errCode.required.msg);
        return;
    }

    try {
        JSON.parse(data);
    }
    catch (e) {
        log.error(res, errCode.errorJSONData.code, errCode.errorJSONData.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.updateBackup(req.body)
    );
});

/**
 * @name detail
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 查看一个接口备用数据
 * @param {JSON}      option
 * @param {String}    option.id        API Detail GUID
 */
router.post('/detail', function(req, res, next) {
    const GUID = req.body.id;

    console.log('**********************************************');
    console.log('调用 api/detail 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    // 数据 ID为空
    if ( !GUID || GUID.trim() == '' ) {
        log.error(res, errCode.required.code, '数据 ID' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.getDetail(GUID)
    );
});

/**
 * @name backup/select
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 选中一个接口备用数据
 * @param {JSON}      option
 * @param {String}    option.apiID     API GUID
 * @param {String}    option.tagID     API choosed detail GUID
 */
router.post('/backup/select', function(req, res, next) {
    req.body.apiID = decodeURIComponent(req.body.apiID);

    console.log('**********************************************');
    console.log('调用 api/backup/select 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var apiID = req.body.apiID,
        tagID = req.body.tagID;

    // 接口地址为空
    if ( !apiID || apiID.trim() == '' ) {
        log.error(res, errCode.required.code, 'API GUID' + errCode.required.msg);
        return;
    }

    // 数据 ID为空
    if ( !tagID || tagID.trim() == '' ) {
        log.error(res, errCode.required.code, '数据 ID' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.selectBackup(req.body)
    );
});

/**
 * @name backup/remove
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 删除一个接口备用数据
 * @param {JSON}      option
 * @param {String}    option.apiID     API GUID
 * @param {String}    option.tagID     API choosed detail GUID
 */
router.post('/backup/remove', function(req, res, next) {
    req.body.apiID = decodeURIComponent(req.body.apiID);

    console.log('**********************************************');
    console.log('调用 api/backup/remove 接口');
    console.log('参数为：');
    console.log(req.body);
    console.log('**********************************************');

    var apiID = req.body.apiID,
        tagID = req.body.tagID;

    // 接口地址为空
    if ( !apiID || apiID.trim() == '' ) {
        log.error(res, errCode.required.code, 'API GUID' + errCode.required.msg);
        return;
    }

    // 数据 ID为空
    if ( !tagID || tagID.trim() == '' ) {
        log.error(res, errCode.required.code, '数据 ID' + errCode.required.msg);
        return;
    }

    responseTools.response(
        res,
        apiManageCtrl.removeBackup(apiID, tagID)
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
    // var name = req.body.name;


    // // 子项目名称为空
    // if ( !name || name.trim() == '' ) {
    //     log.error(res, errCode.required.code, '名称' + errCode.required.msg);
    //     return;
    // }

    // responseTools.response(
    //     res,
    //     roomManageCtrl.removeRoom(name)
    // );
});

/**
 * @name clean
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 清除所有子项目
 */
router.post('/clean', function(req, res, next) {

    // responseTools.response(
    //     res,
    //     roomManageCtrl.cleanRoom(req.body)
    // );
});


module.exports = router;
