/**
* @fileOverview room.manage.ctrl.js 每个实例的控制器
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2015-07-19
* @update：2015-07-19
*/
'use strict';

var path = require('path');
var Q = require('q');
var fs = require('fs');
var child_process = require('child_process');
var spawn = child_process.spawn;

const guid = require('lite-guid');

var _ = require('../../tools/underscore.js');
var errCode = require('../../config/error.code.js');
var file = require('../../tools/file.tools.js');

var roomCtrl = require('../ctrl/room.ctrl.js');
var roomModel = require('../model/room.manage.model.js');

var roomConfig = require('../../config/room.config.js');
var roomBaseFile = path.join(__dirname, '../../ghost/room.js');

var ghostPath = path.join(__dirname, '../../ghost/');
// var roomPath = path.join(__dirname, '../../rooms/');

var Room = {
    run : {}
};

class RoomManage {
    /**
     * @author 徐晨
     * @name RoomManage
     * @class Room 管理 Ctrl
     * @constructor
     */
    constructor() {
        this.init();
    }

    /**
     * @name init
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取项目目录
     *              只删除有数据没有相应项目文件夹的数据
     *              不删除有文件夹没有数据的文件夹
     */
    init () {
        var data = roomModel.getList(true),
            list = data.list || [];

        list = list.filter(function (room) {
            return fs.existsSync(roomConfig.roomsPath + room.name);
        });

        console.log('==============================================');

        if ( list.length ) {
            console.log('同步子项目的服务文件');
            list.forEach(function (room) {
                // 同步基础 room.js 文件
                roomCtrl.syncRoomSystem(room.name);
            });
            console.log('==============================================');
            console.log('已存在的服务');
            list.forEach(function (room) {
                console.log('name: ' + room.name + ', port: ' + room.port);
            });
            console.log('==============================================');
        }
        console.log('默认使用 npm start 启动主项目 chameleon');
        console.log('访问地址为：http://localhost:3188/');
        console.log('==============================================');

    }

    /**
     * @name getList
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 获取项目目录
     */
    getList () {
        var self = this;

        return roomModel.getList().then(function (data) {
            let list = [];

            data.list.forEach(function (item) {
                let running = roomCtrl.run[item.name],
                    temp = {
                        GUID : item.GUID,
                        name : item.name,
                        port : item.port,
                        path : item.path
                    };

                if ( !!running ) {
                    temp.isRun = true;
                    temp.pid = running.option.pid
                } else {
                    temp.isRun = false;
                }

                list.push(temp);
            });

            data.list = list;
            return data;
        });
    }

    /**
     * @name isExist
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目是否存在
     * @param {String}    name    项目名称
     */
    isExist (name) {
        return !!this.getRoom(name, {sync: sync});
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
        if ( option.sync ) {
            return roomModel.getRoom(mark, option);
        }

        return new Promise((resolve, reject) => {
            roomModel.getRoom(mark, option).then(
                result => {
                    this.getRoomContact(mark, option).then(
                        contactData => {
                            result.contactData = contactData;
                            resolve(result);
                        },
                        error => reject(error)
                    );
                },
                error => reject(error)
            )
        });
    }

    /**
     * @name getRoomConfig
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 查找一个项目的配置数据
     * @param {String}    name    项目名称
     * @param {Boolean}   sync    是否执行同步操作 [true | false]
     *                            true:  同步, 直接返回数据
     *                            false: 异步, 返回 promise
     */
    getRoomConfig (name, sync) {
        return roomModel.getRoomConfig(name, {sync: sync});
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
        return roomModel.getRoomContact(mark, option);
    }

    /**
     * @name appendRoomContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 修改一个项目的关联数据
     * @param {GUID} GUID            Contact GUID
     * @param {JSON} data            关联的 API 数据
     * @param {JSON} option          条件信息
     * @param {JSON} option.sync     是否执行同步操作 [true | false]
     *                               true:  同步, 直接返回数据
     *                               false: 异步, 返回 promise
     */
    appendRoomContact (GUID, data, option = {}) {
        option.type = 'extend';

        return roomModel.updateRoomContact(GUID, data, option);
    }

    /**
     * @name removeRoomContact
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 移除一个项目的关联数据
     * @param {String}    GUID            contact GUID
     * @param {JSON}      apiID           关联的 API GUID
     * @param {JSON}      option          条件信息
     * @param {JSON}      option.sync     是否执行同步操作 [true | false]
     *                                    true:  同步, 直接返回数据
     *                                    false: 异步, 返回 promise
     */
    removeRoomContact (GUID, apiID, option = {}) {
        option.type = 'remove';

        return roomModel.updateRoomContact(GUID, apiID, option);
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
    updateRouteApi (GUID, api, updateData) {
        console.log('do room ctrl updateRouteApi');
        console.log('GUID:', GUID);
        console.log('api:', api);
        console.log('updateData:', updateData);
        return roomModel.updateRouteApi(GUID, api, updateData);
    }

    /**
     * @name saveRoomRoute
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 保存一个项目的配置数据
     * @param {String}    name    项目名称
     * @param {JSON}      data    配置数据
     * @param {Boolean}   sync    是否执行同步操作 [true | false]
     *                            true:  同步, 直接返回数据
     *                            false: 异步, 返回 promise
     */
    saveRoomRoute (name, data, sync) {
        return roomModel.saveRoomRoute(name, data, {sync: sync});
    }

    /**
     * @name removeRoomRoute
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 删除一个项目的 API
     * @param {String}    name      项目名称
     * @param {String}    apiName   配置数据
     * @param {Boolean}   sync      是否执行同步操作 [true | false]
     *                              true:  同步, 直接返回数据
     *                              false: 异步, 返回 promise
     */
    removeRoomRoute (name, apiName, sync) {
        return roomModel.saveRoomRoute(name, apiName, {sync: sync, type: remove});
    }

    /**
     * @name start
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 启动子项目
     */
    start (name) {
        return roomCtrl.start(name);
    }

    /**
     * @name end
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 关闭子项目
     */
    end (name) {
        return roomCtrl.end(name);
    }

    /**
     * @name reset
     * @author 徐晨 ( xuchen@smartisan.com )
     * @description 重启子项目
     */
    reset (name) {
        console.log('do room ctrl reset');
        console.log('name:', name);

        return roomCtrl.reset(name);
    }
}

module.exports = new RoomManage();

// function RoomManage () {
//     var self = this;
//
//     // 执行服务的初始化
//     self.init();
// }
//
// /**
//  * @name init
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 获取项目目录
//  *              只删除有数据没有相应项目文件夹的数据
//  *              不删除有文件夹没有数据的文件夹
//  */
// RoomManage.prototype.init = function () {
//     var data = roomModel.getList(true),
//         list = data.list || [];
//
//     list = list.filter(function (room) {
//         return fs.existsSync(roomPath + room.name);
//     });
//
//     // file.writeFile(
//     //     roomConfig.roomDataPath.rooms,
//     //     {
//     //         list : list
//     //     },
//     //     {
//     //         sync : true
//     //     }
//     // );
//
//     console.log('==============================================');
//
//     if ( list.length ) {
//         console.log('同步子项目的服务文件');
//         list.forEach(function (room) {
//             // 同步基础 room.js 文件
//             roomCtrl.syncRoomSystem(room.name);
//         });
//         console.log('==============================================');
//         console.log('已存在的服务');
//         list.forEach(function (room) {
//             console.log('name: ' + room.name + ', port: ' + room.port);
//         });
//         console.log('==============================================');
//     }
//     console.log('默认使用 npm start 启动主项目 chameleon');
//     console.log('访问地址为：http://localhost:3188/');
//     console.log('==============================================');
//
// }
//
// /**
//  * @name getList
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 获取项目目录
//  */
// RoomManage.prototype.getList = function () {
//     var self = this;
//
//     return roomModel.getList().then(function (data) {
//         var list = [];
//
//         data.list.forEach(function (item) {
//             var running = roomCtrl.run[item.name],
//                 temp = {
//                     GUID : item.GUID,
//                     name : item.name,
//                     port : item.port,
//                     path : item.path
//                 };
//
//             if ( !!running ) {
//                 temp.isRun = true;
//                 temp.pid = running.option.pid
//             } else {
//                 temp.isRun = false;
//             }
//
//             list.push(temp);
//         });
//
//         data.list = list;
//         return data;
//     });
// }
//
// /**
//  * @name addRoom
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 添加一个项目, 如果出现已存在的异常，只能手动删除 room 相关文件
//  * @param {JSON}      option
//  * @param {String}    option.name    项目名称
//  * @param {String}    option.port    项目端口号
//  * @param {String}    option.path    静态目录
//  */
// RoomManage.prototype.addRoom = function (option) {
//     var self = this,
//         deferred = Q.defer(),
//         outPath = roomPath + option.name;
//
//     self.createRoomFile(option).then(
//         function (opt) {
//             roomModel.addRoom(opt).then(
//                 function () {
//                     deferred.resolve(true);
//                 },
//                 function (error) {
//                     deferred.reject(error);
//                 }
//             );
//         }, function (error) {
//             deferred.reject(error);
//         }
//     );
//
//     return deferred.promise;
// }
//
// /**
//  * @name updateRoom
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 修改一个项目
//  * @param {JSON}      option
//  * @param {String}    option.name    项目名称
//  * @param {String}    option.port    项目端口号
//  * @param {String}    option.path    静态目录
//  */
// RoomManage.prototype.updateRoom = function (option) {
//     var self = this,
//         deferred = Q.defer(),
//         outPath = roomPath + option.name;
//
//     // console.log(outPath);
//
//     var _configData = file.readFile(outPath + '/config.json', {sync:true, useJson:true}) || {};
//
//     // deferred.resolve(true);
//
//     // 修改配置文件
//     var _updateConfig = _.extend({}, _configData);
//
//     option.port && (_updateConfig.port = option.port);
//     option.path && (_updateConfig.staticPath = path.join(__dirname, '../../../' + option.path));
//     option.path && (_updateConfig.path = option.path);
//     option.route && (_updateConfig.route = option.route);
//
//     // console.log(_configData);
//
//     file.writeFile(outPath + '/config.json', _updateConfig).then(
//         function () {
//             roomModel.updateRoom(_updateConfig).then(
//                 function () {
//                     roomCtrl.reset(option.name);
//                     deferred.resolve(true);
//                 },
//                 function (error) {
//                     deferred.reject(error);
//                 }
//             );
//         },
//         function (error) {
//             deferred.reject(error);
//         }
//     );
//
//     return deferred.promise;
// }
//
// /**
//  * @name getRoom
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 查找一个项目
//  * @param {String}    name    项目名称
//  * @param {Boolean}   sync    是否执行同步操作 [true | false]
//  *                            true:  同步, 直接返回数据
//  *                            false: 异步, 返回 promise
//  */
// RoomManage.prototype.getRoom = function (name, sync) {
//     return roomModel.getRoom(name, sync);
// }
//
// /**
//  * @name isExist
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 查找一个项目是否存在
//  * @param {String}    name    项目名称
//  */
// RoomManage.prototype.isExist = function (name) {
//     return !!this.getRoom(name, true);
// }
//
// /**
//  * @name removeRoom
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 删除一个项目, 如果出现已存在的异常，只能手动删除 room 相关文件
//  * @param {String}    name    项目名称
//  */
// RoomManage.prototype.removeRoom = function (name) {
//     var self = this;
//
//     // 删除子项目的目录
//     file.deleteFolder(roomPath + name);
//
//     return roomModel.removeRoom(name);
// }
//
// /**
//  * @name createRoomFile
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 创建子项目文件夹
//  *              复制 ghost 文件夹下的 room.js 文件
//  *              生成专有的配置文件
//  * @param {JSON}      option
//  * @param {String}    option.name    项目名称
//  * @param {String}    option.port    项目端口号
//  * @param {String}    option.path    静态目录
//  */
// RoomManage.prototype.createRoomFile = function (option) {
//     var deferred = Q.defer(),
//         outPath = roomPath + option.name;
//
//     var exists = fs.existsSync(outPath);
//
//     // 如果已存在直接返回错误的提示
//     if ( exists ) {
//         deferred.reject(errCode.exist);
//     } else {
//         file.copyFile(roomBaseFile, outPath + '/' + option.name + '.js').then(
//             function () {
//                 // 读取已存在的接口信息
//                 var apiDataPath = path.join(__dirname, '../../data/' + option.name + '/api.' + option.name + '.json');
//                 var apiData = file.readFile(apiDataPath, {sync:true, useJson:true}) || {route:{}};
//
//                 // 生成配置文件
//                 var newConfig = _.extend({}, roomConfig.server, {
//                     name : option.name,
//                     port : option.port,
//                     staticPath : path.join(__dirname, '../../../' + option.path),
//                     path : option.path,
//                     apiPath : path.join(__dirname, '../../api/' + option.name),
//                     route : apiData.route
//                 });
//
//                 file.writeFile(outPath + '/config.json', newConfig).then(
//                     function () {
//                         deferred.resolve(newConfig);
//                     },
//                     function (error) {
//                         deferred.reject(error);
//                     }
//                 );
//             },
//             function (error) {
//                 deferred.reject(error);
//             }
//         );
//     }
//
//     return deferred.promise;
// }
//
// /**
//  * @name cleanRoom
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 清除所有子项目
//  *              清空 rooms 目录
//  *              重置 /data/manage.list.json 文件
//  */
// RoomManage.prototype.cleanRoom = function (option) {
//     var self = this,
//         deferred = Q.defer();
//
//     file.cleanFolder(roomPath);
//
//     return roomModel.cleanRoom();
// }
//
// /**
//  * @name start
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 启动子项目
//  */
// RoomManage.prototype.start = function (name) {
//     return roomCtrl.start(name);
// }
//
// /**
//  * @name end
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 关闭子项目
//  */
// RoomManage.prototype.end = function (name) {
//     return roomCtrl.end(name);
// }
//
// /**
//  * @name reset
//  * @author 徐晨 ( xuchen@smartisan.com )
//  * @description 重启子项目
//  */
// RoomManage.prototype.reset = function (name) {
//     return roomCtrl.reset(name);
// }
//
// module.exports = new RoomManage();
