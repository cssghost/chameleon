/**
* @fileOverview room.manage.model.js 每个实例的控制器
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/
'use strict';

var path = require('path');
var Q = require('q');

const guid = require('lite-guid');

var errCode = require('../../config/error.code.js');
var file = require('../../tools/file.tools.js');
var _ = require('../../tools/underscore.js');

var roomManageCtrl = require('../ctrl/room.manage.ctrl.js');

var roomConfig = require('../../config/room.config.js');
const dataConfig = require('../../config/data.config.js');

class RoomManage {
    /**
     * @author 徐晨
     * @name RoomManage
     * @class 文件操作
     * @constructor
     */
    constructor() {}

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取实例的目录
     * @param {Boolean}     sync    是否执行同步操作 [true | false]
     *                              true:  同步, 直接返回数据
     *                              false: 异步, 返回 promise
     */
    getList (sync) {

        if ( sync ) {
            var result = file.readFile(dataConfig.roomMap, {sync:true, useJson:true});

            let list = [];

            !!result && _.each(result, function (room, roomID) {
                list.push(room);
            });

            return {
                list : list,
                count : list.length
            };
        }

        return file.readFile(dataConfig.roomMap, {useJson:true}).then(function (data) {
            let list = [];

            _.each(data, function (room, roomID) {
                list.push(room);
            });

            return {
                list : list,
                count : list.length
            };
        });
    }

    /**
     * @name getRoom
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目
     * @param {String}    mark            名称或者是 GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.byName   根据名称查询
     * @param {JSON}      option.byID     根据 GUID 查询
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    getRoom (mark, option) {
        const byName = option.byName;
        const byID = option.byID;

        /**
         * 没有查询条件时返回错误
         */
        if ( ( !byName && !byID ) || !mark ) {

            if ( option.sync ) {
                return null;
            }

            return new Promise(function (resolve, reject) {
                reject(errCode.notExistRoomFilter);
            });
        }

        /**
         * 查询条件过多时返回错误
         */
        if ( byName && byID ) {

            if ( option.sync ) {
                return null;
            }

            return new Promise(function (resolve, reject) {
                reject(errCode.repeatRoomFilter);
            });
        }

        /**
         * 根据名称查询 Room
         */
        if ( byName ) {
            return this.getRoomByName(mark, option.sync);
        }

        /**
         * 根据 GUID 查询 Room
         */
        if ( byID ) {
            return this.getRoomByID(mark, option.sync);
        }

    }

    /**
     * @name getRoomByID
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 根据 Room GUID 查找一个项目
     * @param {String}    GUID   Room GUID
     * @param {Boolean}   sync   是否执行同步操作 [true | false]
     *                           true:  同步, 直接返回数据
     *                           false: 异步, 返回 promise
     */
    getRoomByID (GUID, sync) {

        if ( sync ) {
            let data = file.readFile(dataConfig.roomDataPath + GUID + '.json', {sync:true, useJson:true}) || {};

            return data;
        }

        return new Promise(function (resolve, reject) {
            file.readFile(dataConfig.roomDataPath + GUID + '.json', {useJson:true}).then(function (data = {}) {
                !!data.GUID ? resolve(data) : reject(errCode.notExistRoom);
            });
        });
    }

    /**
     * @name getRoomByName
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 根据 Room 名称查找一个项目
     * @param {String}    name   Room 名称
     * @param {Boolean}   sync   是否执行同步操作 [true | false]
     *                           true:  同步, 直接返回数据
     *                           false: 异步, 返回 promise
     */
    getRoomByName (name, sync) {

        if ( sync ) {
            let data = file.readFile(dataConfig.roomMap, {sync:true, useJson:true}) || {};

            return _.findWhere(data, { name : name });
        }

        return new Promise(function (resolve, reject) {
            file.readFile(dataConfig.roomMap, {useJson:true}).then(function (data = {}) {
                let exist = _.findWhere(data, { name : name });

                !!exist ? resolve(exist) : reject(errCode.notExistRoom);
            });
        });
    }

    /**
     * @name getRoomConfig
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的配置信息
     * @param {String}    name            名称或者是 GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    getRoomConfig (name, option = {}) {
        const _configPath = path.join(roomConfig.roomsPath, name, 'config.json');

        if ( option.sync ) {
            return file.readFile(_configPath, {sync:true, useJson:true}) || {};
        }

        return new Promise(function (resolve, reject) {
            file.readFile(_configPath, {useJson:true}).then(function (data = {}) {
                const exist = data.name == name;

                !!exist ? resolve(data) : reject(errCode.notExistRoom);
            });
        });
    }

    /**
     * @name saveRoomConfig
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的配置信息
     * @param {String}    name            名称或者是 GUID
     * @param {JSON}      configData      room config data
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    saveRoomConfig (name, configData, option = {}) {
        const _configPath = path.join(roomConfig.roomsPath, name, 'config.json');

        if ( option.sync ) {
            return file.writeFile(_configPath, configData, {sync: !0});
        }

        return new Promise(function (resolve, reject) {
            file.writeFile(_configPath, configData).then(
                result => resolve(true),
                error => reject(error)
            );
        });
    }

    /**
     * @name getRoomContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的关联数据
     * @param {String}    mark            名称或者是 GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.byName   根据名称查询
     * @param {JSON}      option.byID     根据 GUID 查询
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    getRoomContact (mark, option) {
        if ( option.sync ) {
            let data = this.getRoom(mark, option);

            if ( data.contactID ) {
                return file.readFile(dataConfig.apiContactPath + data.contactID + '.json', {sync:!0, useJson:true, mustExists: true});
            } else {
                return false;
            }
        }

        return new Promise( (resolve, reject) => {
            this.getRoom(mark, option).then(
                (roomData) => {
                    if ( !roomData.contactID ) {
                        reject(errCode.notExistRoomContactData);
                    } else {
                        return file.readFile(dataConfig.apiContactPath + roomData.contactID + '.json', {useJson:true, mustExists: true}).then(
                            (contactData) => {
                                resolve(contactData.contactAPI);
                            },
                            (error) => {
                                reject(error);
                            }
                        );
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    /**
     * @name getContactByID
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的关联数据
     * @param {GUID} GUID            Room Contact GUID
     * @param {JSON} option          条件信息
     * @param {BOOLEAN} option.sync  是否执行同步操作 [true | false]
     *                               true:  同步, 直接返回数据
     *                               false: 异步, 返回 promise
     */
    getContactByID (GUID, option = {}) {
        const contactFilePath = path.join(dataConfig.apiContactPath, GUID + '.json');
        const baseData = {
                  GUID,
                  contactAPI: {},
                  contactRoom: {}
              };

        if ( option.sync ) {
            const _fileData = file.readFile(contactFilePath, {sync:!0, useJson:true});
            return !!_fileData && _fileData.GUID == GUID ? _fileData : baseData;
        }

        return new Promise( (resolve, reject) => {
            return file.readFile(contactFilePath, {useJson:true, mustExists: true}).then(
                contactData => resolve(contactData),
                error => resolve(baseData)
            );
        });
    }

    /**
     * @name updateRoomContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 更新一个项目的关联数据
     * @param {String}    GUID            contact GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      data            关联的 API 数据
     * @param {JSON}      option.type     更新方式[extend: 合并, remove: 移除]
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    updateRoomContact (GUID, data = {}, option = {}) {

        if ( option.sync ) {
            let contactData = this.getContactByID(GUID, {sync:!0});

            switch (option.type) {
                case 'extend':
                    contactData.contactAPI = _.extend(contactData.contactAPI, data);
                break;
                case 'remove':
                    delete contactData.contactAPI[data];
                break;
            }

            return this.saveRoomContact(GUID, contactData, {sync: !0});
        }

        return new Promise( (resolve, reject) => {
            this.getContactByID(GUID).then(
                contactData => {

                    switch (option.type) {
                        case 'extend':
                            contactData.contactAPI = _.extend(contactData.contactAPI, data);
                        break;
                        case 'remove':
                            delete contactData.contactAPI[data];
                        break;
                    }

                    this.saveRoomContact(GUID, contactData).then(
                        result => resolve(contactData),
                        error => reject(error)
                    );
                },
                error => reject(error)
            );
        });
    }

    /**
     * @name saveRoomContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的关联数据
     * @param {String}    GUID            contact GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      contactData  关联的 API 数据
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    saveRoomContact (GUID, contactData = {}, option = {}) {
        const contactFilePath = path.join(dataConfig.apiContactPath, GUID + '.json');

        let baseData = {
            GUID,
            contactAPI: {},
            contactRoom: {}
        };

        const contactFileData = _.extend(baseData, contactData);

        if ( option.sync ) {
            return file.writeFile(contactFilePath, contactFileData, {sync: !0});
        }

        return new Promise( (resolve, reject) => {
            file.writeFile(contactFilePath, contactFileData).then(
                (result) => resolve(contactFileData),
                (error) => reject(error)
            );
        });
    }

    /**
     * @name saveRoomRoute
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存一个项目的配置信息
     * @param {String}    name            名称或者是 GUID
     * @param {JSON}      data            配置数据
     *                                    如果为删除时，为 key name
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     * @param {JSON}      option.type     [remove: 删除数据, merge: 合并数据, replace: 覆盖数据]
     */
    saveRoomRoute (name, data, option) {
        const _configPath = path.join(roomConfig.roomsPath, name, 'config.json');

        let roomConfigData = this.getRoomConfig(name, {sync: !0}),
            updateData = {};

        // 没有 name 则证明没有此 room
        if ( !roomConfigData.name ) {
            if ( option.sync ) {
                return false;
            }

            return new Promise(function (resolve, reject) {
                reject(errCode.notExistRoom);
            });
        }

        // format data
        if ( typeof data == 'string' ) {
            updateData = data.toLowerCase();
        } else {
            Object.keys(data).map((key) => {
                updateData[ key.toLowerCase() ] = data[key];
            });
        }

        // 处理 route 数据
        switch (option.type) {
            case 'remove':
                delete roomConfigData.route[updateData];
            break;
            case 'merge':
                roomConfigData.route = _.extend({}, roomConfigData.route, updateData);
            break;
            case 'replace':
                roomConfigData.route = _.extend({}, updateData);
            break;
            default:
                roomConfigData.route = _.extend({}, roomConfigData.route, updateData);
        }

        if ( option.sync ) {
            return file.writeFile(_configPath, roomConfigData, {sync: !0});
        }

        return new Promise(function (resolve, reject) {
            file.writeFile(_configPath, roomConfigData).then(
                (result) => {
                    resolve({
                        room: name
                    });
                },
                (error) => {
                    reject(errCode.error);
                }
            );
        });
    }

    /**
     * @name updateRouteApi
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 更新一个项目的 API url
     * @param {String}    GUID            Room GUID
     * @param {String}    api             API url
     * @param {JSON}      updateData      需要更新的 apiData
     * @param {JSON}      updateData.api            关联的 API 数据
     */
    updateRouteApi (GUID, api, updateData = {}) {

        api = api.toLowerCase();
        updateData.api = updateData.api.toLowerCase();

        console.log('do room model updateRouteApi');
        console.log('GUID:', GUID);
        console.log('api:', api);
        console.log('updateData:', updateData);


        return new Promise( (resolve, reject) => {
            this.getRoomByID(GUID).then(
                roomData => {

                    console.log('******************');
                    console.log('roomData:', roomData);

                    this.getRoomConfig(roomData.name).then(
                        roomConfigData => {

                            console.log('roomConfigData:', roomConfigData);

                            let { route } = roomConfigData,
                                curData = route[api];

                            if ( curData && !route[updateData.api] ) {

                                route[updateData.api] = curData;
                                delete route[api];

                                roomConfigData.route = route;

                                this.saveRoomConfig(roomData.name, roomConfigData).then(
                                    response => {
                                        console.log('更新 Room[' + roomData.name + ']的 API[' + api + ']变为[' + updateData.api + ']成功');
                                        console.log(roomManageCtrl.reset);
                                        // roomManageCtrl.reset(roomData.name);

                                        resolve(true);
                                    },
                                    error => {
                                        console.log(error);
                                        reject(error);
                                    }
                                );

                            } else {

                                // 不存在需要修改的 api
                                if ( !curData ) {
                                    reject(errCode.notExistApi);
                                }

                                // 已存在需要修改后的 api
                                if ( route[updateData.api] ) {
                                    reject(errCode.existApi);
                                }
                            }
                        },
                        error => {
                            console.log(error);
                            reject(error);
                        }
                    );

                },
                error => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
}

module.exports = new RoomManage();
