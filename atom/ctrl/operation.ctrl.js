/**
* @fileOverview operation.ctrl.js 每个实例的控制器
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-12
* @update：2016-07-12
*/
'use strict';

const path = require('path');
const guid = require('lite-guid');
const dataConfig = require('../../config/data.config.js');
const _ = require('../../tools/underscore.js');
// var errCode = require('../../config/error.code.js');
const file = require('../../tools/file.tools.js');

// var child_process = require('child_process');
// var spawn = child_process.spawn;
// var exec = child_process.exec;
// var fork = child_process.fork;

// var roomModel = require('../model/room.manage.model.js');

// var roomPath = path.join(__dirname, '../../rooms/');

function OperationCtrl () {
    this.init();
}

/**
 * @name init
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 初始化
 */
OperationCtrl.prototype.init = function () {
    var self = this;

    console.log('init operation ctrl');
    // this.backupV2();
}

/**
 * @name backup
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 备份 V2 版本的数据
 */
OperationCtrl.prototype.backupV2 = function (useCopy) {
    let self = this;

    let apiDataPath = path.join(__dirname, '../../');
    let backupPath = path.join(__dirname, '../../tempData/backup/V2/');
    let promiseList = [];

    // 预先清空 V3 数据
    file.deleteFolder(dataConfig.V3Path);

    if ( useCopy ) {
        // 备份 API 目录
        promiseList.push(
            file.copyFolder(apiDataPath + 'api', backupPath + 'api').then(function (result) {
                file.cleanFolder(apiDataPath + 'api');
            })
        );

        // 备份 数据 目录
        promiseList.push(
            file.copyFolder(apiDataPath + 'data', backupPath + 'data').then(function (result) {
                file.cleanFolder(apiDataPath + 'data');
            })
        );

        // 备份 Room 目录
        promiseList.push(
            file.copyFolder(apiDataPath + 'rooms', backupPath + 'rooms')
        );
    } else {
        file.cleanFolder(apiDataPath + 'api');
        file.cleanFolder(apiDataPath + 'data');
    }


    Promise.all(promiseList).then(
        function (result) {
            self.upgradeV2Room();

            console.log('备份 V2 数据成功');
        },
        function (error) {
            console.log(error);
        }
    );
}

/**
 * @name upgrade V2 room
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 升级 V2 版本的 Room
 */
OperationCtrl.prototype.upgradeV2Room = function () {
    let self = this,
        roomMap = file.readFile(dataConfig.roomMap, {useJson:!0, sync:!0}) || {};

    // 提取旧版本的 room list
    file.readFile(dataConfig.backupRoomList, {useJson:!0}).done(function (result) {
        const roomList = result.list;
        let cacheRooms = {};

        // 整理出已存在的 room
        _.each(roomMap, function(room, guid) {
            cacheRooms[room.name] = room;
        });

        // 导出 room map
        roomList.forEach(function (item) {
            if ( !cacheRooms[item.name] ) {
                const roomID = guid.create();

                // 追加 room map
                roomMap[roomID] = _.extend({
                    GUID: roomID
                }, item);

                // 整理出单个 room data
                const roomData = _.extend({
                    GUID: roomID,
                    groupID: null,
                    contactID: guid.create()
                }, item);

                // 保存 room 数据
                file.writeFile(dataConfig.roomDataPath + roomID + '.json', roomData, {
                    sync: !0
                });
            }
        });

        // 保存 room map
        file.writeFile(dataConfig.roomMap, roomMap)
            .then(
                function () {
                    console.log('成功导出 room map');
                    self.upgradeV2API();
                },
                function (error) {
                    console.log(error);
                }
            );
    });
}

/**
 * @name upgrade V2 API
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 升级 V2 版本的 API
 */
OperationCtrl.prototype.upgradeV2API = function () {
    let self = this;

    // 获取 roomMap
    file.readFile(dataConfig.roomMap, {useJson:!0}).done(function (roomMap) {
        _.each(roomMap, function (room, guid) {
            // 当前 room 下的所有 api map
            const backupApiMap = file.readFile(dataConfig.backupDataPath + room.name + '/api.' + room.name + '.json', {sync:!0, useJson:!0}) || {};

            _.each(backupApiMap.map, function (apiData, apiUrl) {
                self.createApiGroup(room, apiData);
            });
        });
    });
}

/**
 * @name create API Group
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Group Data
 * @param {JSON}     room         Room Data
 * @param {GUID}     room.GUID    Room GUID
 * @param {String}   room.name    Room Name
 * @param {JSON}     apiData      API Data
 *                               [group: 分组名称, name: API 名称, api: API Url]
 */
OperationCtrl.prototype.createApiGroup = function (room, apiData) {
    let self = this,
        apiGroupMap = file.readFile(dataConfig.apiGroupMap, {useJson:!0, sync:!0}) || {},
        cacheGroup = {},
        groupData = {};

        _.each(apiGroupMap, function(group, guid) {
            cacheGroup[group.name] = guid;
        });

        if ( !cacheGroup[apiData.group] ) {
            const groupID = guid.create();

            groupData = {
                GUID: groupID,
                name: apiData.group,
                apiList: {}
            };
        } else {
            groupData = apiGroupMap[ cacheGroup[apiData.group] ];
        }

        let api = self.createApi(room, groupData.GUID, apiData);

        if ( !!api ) {
            groupData.apiList[api.GUID] = api.name;

            self.createApiMap(room, api);
        }

        apiGroupMap[groupData.GUID] = groupData;

        if ( !file.writeFile(dataConfig.apiGroupMap, apiGroupMap, {sync:!0}) ) {
            console.log(groupData.name + '导出失败');
        }
}

/**
 * @name create API
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Data
 * @param {JSON}      room            Room Data
 * @param {GUID}      room.GUID       Room GUID
 * @param {String}    room.name       Room Name
 * @param {GUID}      groupID         Group GUID
 * @param {JSON}      apiData         API Data
 * @param {JSON}      apiData.group   API Group GUID
 * @param {JSON}      apiData.name    API Name
 * @param {JSON}      apiData.api     API Url
 */
OperationCtrl.prototype.createApi = function (room, groupID, apiData) {
    let self = this,
        apiKey = apiData.api.toLowerCase(),
        backupApiFileName = apiKey.replace(/[^\da-zA-Z]/gi, '-') + '.json',
        backupApiFilePath = dataConfig.backupApiPath + room.name + '/' + path.join.apply(null, apiKey.split(/[^\da-zA-Z]/gi)) + '/',
        response = {
            GUID: guid.create(),
            docID: guid.create(),
            contactID: guid.create(),
            groupID: groupID,
            name: apiData.name,
            api: apiData.api,
            dataList: []
        };

    // 单个 API Detail
    const backupApiData = file.readFile(dataConfig.backupDataPath + room.name + '/detail/' + backupApiFileName, {sync:!0, useJson:!0}) || {};

    // 追加更多 API 信息
    if ( !!backupApiData ) {
        response.method = backupApiData.method;
        response.dataType = backupApiData.dataType;

        // 遍历所有 API 的备选数据
        _.each(backupApiData.backup, function (item) {

            // 创建 API 的具体文件与数据
            const apiDetail = self.createApiDetail(response.GUID, backupApiFilePath, item);

            if ( !!apiDetail ) {
                response.dataList.push(apiDetail);
            }
        });

        response.dataList.length && ( response.usedID = response.dataList[0].GUID );

    } else {
        console.log(room.name + ': ' + apiData.name + '读取旧数据失败');
    }

    if ( file.writeFile(dataConfig.apiListPath + response.GUID + '.json', response, {sync:!0}) ) {
        // 创建 API 文件成功，则创建相关 contact 数据
        self.createApiContactForAPI(room, response);
        self.createApiContactForRoom(room, response);

        // 更新 room config （更新要调取的 API file name）
        self.updateRoomConfig(room, response);
    } else {
        console.log(room.name + ': ' + apiData.name + '数据生成失败');
    }

    return response;
}

/**
 * @name create API Detail
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Detail Data
 * @param {GUID}      apiID              API GUID
 * @param {String}    apiPath            API File Path
 * @param {JSON}      apiData            API Data
 * @param {GUID}      apiData.tagID      API Data GUID
 * @param {JSON}      apiData.fileTag    API Data Name
 * @param {JSON}      apiData.fileName   API Data File Name
 */
OperationCtrl.prototype.createApiDetail = function (apiID = guid.create(), apiPath, apiData) {
    let self = this,
        response = {
            GUID: guid.create(),
            apiID: apiID,
            dataName: apiData.fileTag
        };

    file.copyFile(apiPath + apiData.fileName, dataConfig.apiFilePath + response.GUID + '.json').then(
        function () {
            // console.log(apiData.fileName + ' API File 生成成功');
        },
        function (error) {
            console.log('****************************************************');
            console.log('备份文件：' + apiPath + apiData.fileName + '导出的 API File 生成失败');
            console.log('****************************************************');
        }
    );

    return response;
}

/**
 * @name create API Contact For API
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Data Contact
 * @param {JSON}      room                Room Data
 * @param {GUID}      room.GUID           Room GUID
 * @param {String}    room.name           Room Name
 * @param {JSON}      apiData             API Data
 * @param {GUID}      apiData.GUID        API GUID
 * @param {GUID}      apiData.docID       API Doc GUID
 * @param {GUID}      apiData.contactID   API Contact GUID
 * @param {GUID}      apiData.groupID     API Group GUID
 * @param {String}    apiData.name        API Name
 * @param {String}    apiData.method      API Method
 * @param {String}    apiData.api         API Url
 * @param {Arrat}     apiData.dataList    API Data List
 */
OperationCtrl.prototype.createApiContactForAPI = function (room, apiData) {
    let self = this,
        contactData = {
            GUID: apiData.contactID,
            contactAPI: {},
            contactRoom: {}
        };

    contactData.contactRoom[room.GUID] = room.name;

    if ( file.writeFile(dataConfig.apiContactPath + contactData.GUID + '.json', contactData, {sync:!0}) ) {
        // console.log(room.name + ': ' + apiData.name + 'Contact 数据生成成功');
    } else {
        console.log(room.name + ': ' + apiData.name + 'Contact 数据生成失败');
    }
}

/**
 * @name create API Contact For Room
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Data Contact
 * @param {JSON}      room                Room Data
 * @param {GUID}      room.GUID           Room GUID
 * @param {String}    room.name           Room Name
 * @param {JSON}      apiData             API Data
 * @param {GUID}      apiData.GUID        API GUID
 * @param {GUID}      apiData.docID       API Doc GUID
 * @param {GUID}      apiData.contactID   API Contact GUID
 * @param {GUID}      apiData.groupID     API Group GUID
 * @param {String}    apiData.name        API Name
 * @param {String}    apiData.method      API Method
 * @param {String}    apiData.api         API Url
 * @param {Arrat}     apiData.dataList    API Data List
 */
OperationCtrl.prototype.createApiContactForRoom = function (room, apiData) {
    let self = this,
        roomData = file.readFile(dataConfig.roomDataPath + room.GUID + '.json', {useJson:!0, sync:!0});

    if ( !!roomData.contactID ) {
        let contactData = file.readFile(dataConfig.apiContactPath + roomData.contactID + '.json', {useJson:!0, sync:!0});

        contactData = _.extend({
            contactAPI: {},
            contactRoom: {}
        }, contactData);

        contactData.GUID = roomData.contactID;
        contactData.contactAPI[apiData.GUID] = apiData.name;

        if ( file.writeFile(dataConfig.apiContactPath + contactData.GUID + '.json', contactData, {sync:!0}) ) {
            // console.log(room.name + ': ' + apiData.name + 'Contact 数据生成成功');
        } else {
            console.log(room.name + ': ' + room.name + 'Contact 数据生成失败');
        }
    } else {
        console.log(room.name + ': ' + room.name + 'Contact 数据生成失败');
    }
}

/**
 * @name create API Map
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 建立 API Data Map
 * @param {JSON}      room                Room Data
 * @param {GUID}      room.GUID           Room GUID
 * @param {String}    room.name           Room Name
 * @param {JSON}      apiData             API Data
 * @param {GUID}      apiData.GUID        API GUID
 * @param {GUID}      apiData.docID       API Doc GUID
 * @param {GUID}      apiData.contactID   API Contact GUID
 * @param {GUID}      apiData.groupID     API Group GUID
 * @param {String}    apiData.name        API Name
 * @param {String}    apiData.method      API Method
 * @param {String}    apiData.api         API Url
 * @param {Arrat}     apiData.dataList    API Data List
 */
OperationCtrl.prototype.createApiMap = function (room, apiData) {
    let self = this,
        apiMap = file.readFile(dataConfig.apiMap, {useJson:!0, sync:!0}) || {};

    apiMap[apiData.GUID] = {
        GUID: apiData.GUID,
        name: apiData.name,
        api: apiData.api,
        method: apiData.method
    };

    if ( file.writeFile(dataConfig.apiMap, apiMap, {sync:!0}) ) {
        // console.log('API List 数据生成成功');
    } else {
        console.log('API List 数据生成失败');
    }
}

/**
 * @name update room config
 * @author 徐晨 ( xuchen@smartisan.com )
 * @description 更新 room config
 * @param {JSON}      room                Room Data
 * @param {GUID}      room.GUID           Room GUID
 * @param {String}    room.name           Room Name
 * @param {JSON}      apiData             API Data
 * @param {GUID}      apiData.GUID        API GUID
 * @param {GUID}      apiData.docID       API Doc GUID
 * @param {GUID}      apiData.contactID   API Contact GUID
 * @param {GUID}      apiData.groupID     API Group GUID
 * @param {String}    apiData.name        API Name
 * @param {String}    apiData.method      API Method
 * @param {String}    apiData.api         API Url
 * @param {Arrat}     apiData.dataList    API Data List
 */
OperationCtrl.prototype.updateRoomConfig = function (room, apiData) {
    let self = this,
        roomConfig = file.readFile(dataConfig.roomConfigPath + room.name + '/config.json', {useJson:!0, sync:!0}) || {},
        apiKey = apiData.api.replace(/^\/+|\/+$/, '').toLowerCase();

    /**
     * 检查是否缺少一下参数
     * roomConfig                  room 配置数据
     * roomConfig.route            room 的路由数据
     * roomConfig.route[apiKey]    需要更新的 API 数据
     * apiData.usedID              当前使用的 API GUID
     */
    if ( !roomConfig || !roomConfig.route || !roomConfig.route[apiKey] || !apiData.usedID ) {
        console.log('未找到需要更新 room:' + room.name);
        return;
    }

    roomConfig.route[apiKey].api = apiData.usedID + '.json';

    if ( file.writeFile(dataConfig.roomConfigPath + room.name + '/config.json', roomConfig, {sync:!0}) ) {
        // console.log('API List 数据生成成功');
    } else {
        console.log('room:' + room.name + '中 API ' + apiData.api + '更新失败');
    }
}

module.exports = new OperationCtrl();
